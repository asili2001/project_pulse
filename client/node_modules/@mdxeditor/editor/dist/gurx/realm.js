var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { tap } from "../utils/fp.js";
import { uuidv4 } from "../utils/uuid4.js";
function defaultComparator(current, next) {
  return current === next;
}
class SetMap {
  constructor() {
    __publicField(this, "map", /* @__PURE__ */ new Map());
  }
  getOrCreate(key) {
    let record = this.map.get(key);
    if (!record) {
      record = /* @__PURE__ */ new Set();
      this.map.set(key, record);
    }
    return record;
  }
  get(key) {
    return this.map.get(key);
  }
  use(key, cb) {
    const set = this.get(key);
    if (set !== void 0) {
      cb(set);
    }
  }
  delete(key) {
    return this.map.delete(key);
  }
}
class RefCount {
  constructor(map = /* @__PURE__ */ new Map()) {
    __publicField(this, "map");
    this.map = map;
  }
  clone() {
    return new RefCount(new Map(this.map));
  }
  increment(key) {
    const counter = this.map.get(key) ?? 0;
    this.map.set(key, counter + 1);
  }
  decrement(key, ifZero) {
    let counter = this.map.get(key);
    if (counter !== void 0) {
      counter -= 1;
      this.map.set(key, counter);
      if (counter === 0) {
        ifZero();
      }
    }
  }
}
const NO_VALUE = Symbol("NO_VALUE");
function realm() {
  const subscriptions = new SetMap();
  const singletonSubscriptions = /* @__PURE__ */ new Map();
  const graph = new SetMap();
  const state = /* @__PURE__ */ new Map();
  const distinctNodes = /* @__PURE__ */ new Map();
  const labels = {};
  function node(value = NO_VALUE, distinct = false) {
    const key = uuidv4();
    if (value !== NO_VALUE) {
      state.set(key, value);
    }
    if (distinct !== false) {
      distinctNodes.set(key, distinct === true ? defaultComparator : distinct);
    }
    return { key, toString: () => key };
  }
  function subSingle({ key }, subscription) {
    const nodeSubscriptions = subscriptions.getOrCreate(key);
    nodeSubscriptions.add(subscription);
    return () => nodeSubscriptions.delete(subscription);
  }
  function singletonSub({ key }, subscription) {
    if (!subscription) {
      singletonSubscriptions.delete(key);
    } else {
      singletonSubscriptions.set(key, subscription);
    }
    return () => singletonSubscriptions.delete(key);
  }
  function singletonSubKey(key, subscription) {
    return singletonSub(labels[key], subscription);
  }
  function resetSingletonSubs() {
    singletonSubscriptions.clear();
  }
  function subMultiple(sources, cb) {
    const sink = node();
    connect({
      map: (done) => (...args) => {
        done(args);
      },
      sink,
      sources
    });
    return subSingle(sink, cb);
  }
  function sub(...args) {
    const [subscription] = args.slice(-1);
    const nodes = args.slice(0, -1);
    if (nodes.length === 1) {
      return subSingle(nodes[0], subscription);
    } else {
      return subMultiple(nodes, subscription);
    }
  }
  function calculateExecutionMap(keys) {
    const participatingNodeKeys = [];
    const visitedNodes = /* @__PURE__ */ new Set();
    const pendingPulls = new SetMap();
    const refCount = new RefCount();
    const projections = new SetMap();
    function visit(key, insertIndex = 0) {
      refCount.increment(key);
      if (visitedNodes.has(key)) {
        return;
      }
      pendingPulls.use(key, (pulls) => {
        insertIndex = Math.max(...Array.from(pulls).map((key2) => participatingNodeKeys.indexOf(key2))) + 1;
      });
      graph.use(key, (sinkProjections) => {
        sinkProjections.forEach((projection) => {
          if (projection.sources.has(key)) {
            projections.getOrCreate(projection.sink).add(projection);
            visit(projection.sink, insertIndex);
          } else {
            pendingPulls.getOrCreate(projection.sink).add(key);
          }
        });
      });
      visitedNodes.add(key);
      participatingNodeKeys.splice(insertIndex, 0, key);
    }
    keys.forEach((key) => visit(key));
    return { participatingNodeKeys, pendingPulls, projections, refCount };
  }
  const executionMaps = /* @__PURE__ */ new Map();
  function pubIn(values) {
    var _a;
    const keys = Object.keys(values);
    const executionMapKey = keys.join(",");
    if (!executionMaps.has(executionMapKey)) {
      executionMaps.set(executionMapKey, calculateExecutionMap(keys));
    }
    const map2 = executionMaps.get(executionMapKey);
    const refCount = map2.refCount.clone();
    const participatingNodeKeys = map2.participatingNodeKeys.slice();
    const transientState = new Map(state);
    function nodeWillNotEmit(key) {
      graph.use(key, (projections) => {
        projections.forEach(({ sources, sink }) => {
          if (sources.has(key)) {
            refCount.decrement(sink, () => {
              participatingNodeKeys.splice(participatingNodeKeys.indexOf(sink), 1);
              nodeWillNotEmit(sink);
            });
          }
        });
      });
    }
    let nodeKey;
    while (nodeKey = participatingNodeKeys.shift()) {
      let resolved = false;
      const done = (value) => {
        if (distinctNodes.has(nodeKey) && distinctNodes.get(nodeKey)(state.get(nodeKey), value)) {
          resolved = false;
          return;
        }
        resolved = true;
        transientState.set(nodeKey, value);
        if (state.has(nodeKey)) {
          state.set(nodeKey, value);
        }
      };
      if (Object.prototype.hasOwnProperty.call(values, nodeKey)) {
        done(values[nodeKey]);
      } else {
        map2.projections.use(nodeKey, (nodeProjections) => {
          nodeProjections.forEach((projection) => {
            const args = [...Array.from(projection.sources), ...Array.from(projection.pulls)].map((id) => transientState.get(id));
            projection.map(done)(...args);
          });
        });
      }
      if (resolved) {
        const value = transientState.get(nodeKey);
        subscriptions.use(nodeKey, (nodeSubscriptions) => {
          nodeSubscriptions.forEach((subscription) => subscription(value));
        });
        (_a = singletonSubscriptions.get(nodeKey)) == null ? void 0 : _a(value);
      } else {
        nodeWillNotEmit(nodeKey);
      }
    }
  }
  function nodesToKeySet(nodes) {
    return new Set(nodes.map((s) => s.key));
  }
  function connect({ sources, pulls = [], map: map2, sink: { key: sink } }) {
    const dependency = {
      map: map2,
      pulls: nodesToKeySet(pulls),
      sink,
      sources: nodesToKeySet(sources)
    };
    [...sources, ...pulls].forEach(({ key: sourceKey }) => {
      graph.getOrCreate(sourceKey).add(dependency);
    });
    executionMaps.clear();
  }
  function debug() {
    Object.entries(labels).forEach(([name, value]) => {
      state.get(value.key);
    });
  }
  function pub(...args) {
    const map2 = {};
    for (let index = 0; index < args.length; index += 2) {
      const node2 = args[index];
      map2[node2.key] = args[index + 1];
    }
    pubIn(map2);
  }
  function label(newLabels) {
    Object.assign(labels, newLabels);
  }
  function pipe(source, ...operators) {
    for (const operator of operators) {
      source = operator(source);
    }
    return source;
  }
  function spread(source, initialValues) {
    return initialValues.map((initialValue, index) => {
      return tap(node(initialValue, true), (sink) => {
        connect({
          map: (done) => (sourceValue) => {
            done(sourceValue[index]);
          },
          sink,
          sources: [source]
        });
      });
    });
  }
  function link(source, sink) {
    connect({ map: (done) => (value) => done(value), sink, sources: [source] });
  }
  function derive(source, initial) {
    return tap(node(initial, true), (sink) => {
      connect({ map: (done) => (value) => done(value), sink, sources: [source] });
    });
  }
  function map(mapFunction) {
    return (source) => {
      const sink = node();
      connect({
        map: (done) => (value) => {
          done(mapFunction(value));
        },
        sink,
        sources: [source]
      });
      return sink;
    };
  }
  function mapTo(value) {
    return (source) => {
      const sink = node();
      connect({ map: (done) => () => done(value), sink, sources: [source] });
      return sink;
    };
  }
  function filter(predicate) {
    return (source) => {
      const sink = node();
      connect({ map: (done) => (value) => predicate(value) && done(value), sink, sources: [source] });
      return sink;
    };
  }
  function once() {
    return (source) => {
      const sink = node();
      let passed = false;
      connect({
        map: (done) => (value) => {
          if (!passed) {
            passed = true;
            done(value);
          }
        },
        sink,
        sources: [source]
      });
      return sink;
    };
  }
  function scan(accumulator, seed) {
    return (source) => {
      const sink = node();
      connect({ map: (done) => (value) => done(seed = accumulator(seed, value)), sink, sources: [source] });
      return sink;
    };
  }
  function throttleTime(delay) {
    return (source) => {
      const sink = node();
      let currentValue;
      let timeout;
      sub(source, (value) => {
        currentValue = value;
        if (timeout) {
          return;
        }
        timeout = setTimeout(() => {
          timeout = void 0;
          pub(sink, currentValue);
        }, delay);
      });
      return sink;
    };
  }
  function delayWithMicrotask() {
    return (source) => {
      const sink = node();
      sub(source, (value) => queueMicrotask(() => pub(sink, value)));
      return sink;
    };
  }
  function debounceTime(delay) {
    return (source) => {
      const sink = node();
      let currentValue;
      let timeout;
      sub(source, (value) => {
        currentValue = value;
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          pub(sink, currentValue);
        }, delay);
      });
      return sink;
    };
  }
  function onNext(bufNode) {
    return (source) => {
      const sink = node();
      let pendingValue = NO_VALUE;
      sub(source, (value) => pendingValue = value);
      connect({
        map: (done) => (value) => {
          if (pendingValue !== NO_VALUE) {
            done([pendingValue, value]);
            pendingValue = NO_VALUE;
          }
        },
        sink,
        sources: [bufNode]
      });
      return sink;
    };
  }
  function passOnlyAfterNodeHasEmittedBefore(starterNode, durationNode) {
    return (source) => {
      const sink = node();
      let startTime = 0;
      sub(starterNode, () => startTime = Date.now());
      connect({
        map: (done) => (value) => {
          if (Date.now() < startTime + state.get(durationNode.key)) {
            done(value);
          }
        },
        sink,
        sources: [source]
      });
      return sink;
    };
  }
  function withLatestFrom(...nodes) {
    return (source) => {
      const sink = node();
      connect({
        map: (done) => (...args) => done(args),
        pulls: nodes,
        sink,
        sources: [source]
      });
      return sink;
    };
  }
  function combine(...nodes) {
    const sink = node();
    connect({
      map: (done) => (...args) => done(args),
      sink,
      sources: nodes
    });
    return sink;
  }
  function subKey(key, subscription) {
    return sub(labels[key], subscription);
  }
  function subKeys(keys, subscription) {
    const nodes = keys.map((key) => labels[key]);
    return sub(...nodes.concat(subscription));
  }
  function pubKey(key, value) {
    pubKeys({ [key]: value });
  }
  function pubKeys(values) {
    const valuesWithInternalKeys = Object.entries(values).reduce(
      (acc, [key, value]) => tap(acc, (acc2) => {
        const label2 = labels[key];
        if (!label2) {
          throw new Error(`No label for key ${key}. Do you miss a plugin?`);
        }
        acc2[label2.key] = value;
        return value;
      }),
      {}
    );
    pubIn(valuesWithInternalKeys);
  }
  function getKeyValue(key) {
    return state.get(labels[key].key);
  }
  function getValue(node2) {
    return state.get(node2.key);
  }
  function getKeyValues(keys) {
    return keys.map((key) => {
      const label2 = labels[key];
      if (!label2) {
        throw new Error(`No label for key ${key}. Do you miss a plugin?`);
      }
      return state.get(label2.key);
    });
  }
  return {
    combine,
    connect,
    debug,
    derive,
    getKeyValue,
    getValue,
    getKeyValues,
    label,
    labels,
    link,
    node,
    o: {
      delayWithMicrotask,
      debounceTime,
      filter,
      map,
      mapTo,
      onNext,
      scan,
      throttleTime,
      withLatestFrom,
      once,
      passOnlyAfterNodeHasEmittedBefore
    },
    pipe,
    pub,
    pubIn,
    pubKey,
    pubKeys,
    resetSingletonSubs,
    singletonSub,
    singletonSubKey,
    spread,
    sub,
    subKey,
    subKeys
  };
}
export {
  RefCount,
  defaultComparator,
  realm
};
