import React__default, { useEffect } from "react";
import { tap, always } from "../utils/fp.js";
import { realmFactory } from "./realmFactory.js";
function omit(keys, obj) {
  const result = {};
  const index = {};
  let idx = 0;
  const len = keys.length;
  while (idx < len) {
    index[keys[idx]] = 1;
    idx += 1;
  }
  for (const prop in obj) {
    if (!Object.prototype.hasOwnProperty.call(index, prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
}
const useIsomorphicLayoutEffect = typeof document !== "undefined" ? React__default.useLayoutEffect : React__default.useEffect;
const GurxContext = React__default.createContext(void 0);
function realmFactoryToComponent(realmFactory2, map, Root) {
  const requiredPropNames = Object.keys(map.required || {});
  const optionalPropNames = Object.keys(map.optional || {});
  const methodNames = Object.keys(map.methods || {});
  const eventNames = Object.keys(map.events || {});
  const Context = GurxContext;
  function applyPropsToRealm(realm, props) {
    const toBePublished = {};
    for (const requiredPropName of requiredPropNames) {
      const nodeName = map.required[requiredPropName];
      toBePublished[nodeName] = props[requiredPropName];
    }
    for (const optionalPropName of optionalPropNames) {
      const value = props[optionalPropName];
      if (value !== void 0) {
        const nodeName = map.optional[optionalPropName];
        toBePublished[nodeName] = value;
      }
    }
    realm.pubKeys(toBePublished);
  }
  function buildMethods(realm) {
    return methodNames.reduce((acc, methodName) => {
      const nodeName = map.methods[methodName];
      acc[methodName] = (value) => {
        realm.pubKey(nodeName, value);
      };
      return acc;
    }, {});
  }
  const Component = React__default.forwardRef((props, ref) => {
    const realm = React__default.useMemo(() => {
      return tap(realmFactory2(), (realm2) => applyPropsToRealm(realm2, props));
    }, []);
    useIsomorphicLayoutEffect(() => {
      applyPropsToRealm(realm, props);
      realm.resetSingletonSubs();
      for (const eventName of eventNames) {
        if (eventName in props) {
          realm.singletonSubKey(map.events[eventName], props[eventName]);
        }
      }
      return () => {
        realm.resetSingletonSubs();
      };
    }, [props]);
    React__default.useImperativeHandle(ref, always(buildMethods(realm)));
    const children = props.children;
    return React__default.createElement(
      Context.Provider,
      { value: realm },
      Root ? React__default.createElement(
        Root,
        omit([...requiredPropNames, ...optionalPropNames, ...eventNames], props),
        children
      ) : children
    );
  });
  Component.displayName = "Gurx Component";
  return {
    Component,
    ...sysHooks()
  };
}
function sysHooks() {
  const Context = GurxContext;
  const usePublisher = (key) => {
    const realm = React__default.useContext(Context);
    return React__default.useCallback(
      (value) => {
        realm.pubKey(key, value);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [key, realm]
    );
  };
  const useEmitterValues = (...keys) => {
    const realm = React__default.useContext(Context);
    const [values, setValues] = React__default.useState(() => realm.getKeyValues(keys));
    useEffect(
      () => realm == null ? void 0 : realm.subKeys(keys, (newValues) => {
        const setter = () => {
          if (keys.length === 1) {
            newValues = [newValues];
          }
          for (let i = 0; i < keys.length; i++) {
            if (newValues[i] !== values[i]) {
              setValues(newValues);
            }
          }
        };
        setter();
      }),
      [keys, realm, values]
    );
    return values;
  };
  const usePubKeys = () => {
    return React__default.useContext(Context).pubKeys;
  };
  const useEmitter = (key, callback) => {
    const realm = React__default.useContext(Context);
    useIsomorphicLayoutEffect(() => realm.subKey(key, callback), [callback]);
  };
  const useRealmContext = () => {
    return React__default.useContext(Context);
  };
  return {
    useRealmContext,
    useEmitter,
    useEmitterValues,
    usePubKeys,
    usePublisher
  };
}
const UsedPluginsContext = React__default.createContext(/* @__PURE__ */ new Set());
function realmPlugin(params) {
  const plugin = (pluginParams) => {
    return {
      systemSpec: params.systemSpec,
      pluginParams,
      applyParamsToSystem: params.applyParamsToSystem,
      init: params.init,
      id: params.id,
      dependencies: params.dependencies
    };
  };
  return [plugin, sysHooks()];
}
const RealmPluginInitializer = function({
  plugins,
  children
}) {
  const validPlugins = React__default.useMemo(() => {
    const availablePlugins = plugins.map((plugin) => plugin.id);
    const validPlugins2 = plugins.filter((plugin) => {
      if (plugin.dependencies) {
        if (plugin.dependencies.some((dep) => !availablePlugins.includes(dep))) {
          console.warn("MDXEditor plugin", plugin.id, "has some missing dependencies", plugin.dependencies, ", skipping");
          return false;
        }
      }
      return true;
    });
    return validPlugins2;
  }, [plugins]);
  const realm = React__default.useMemo(() => {
    const specs = validPlugins.map((plugin) => plugin.systemSpec);
    const pluginIds = validPlugins.map((plugin) => plugin.id);
    const realm2 = realmFactory(...specs);
    validPlugins.forEach((plugin) => {
      var _a, _b;
      (_a = plugin.init) == null ? void 0 : _a.call(plugin, realm2, plugin.pluginParams, pluginIds);
      (_b = plugin.applyParamsToSystem) == null ? void 0 : _b.call(plugin, realm2, plugin.pluginParams);
    });
    return realm2;
  }, []);
  React__default.useEffect(() => {
    validPlugins.forEach((plugin) => {
      var _a;
      (_a = plugin.applyParamsToSystem) == null ? void 0 : _a.call(plugin, realm, plugin.pluginParams);
    });
  }, [realm, validPlugins]);
  const Context = GurxContext;
  return React__default.createElement(
    Context.Provider,
    { value: realm },
    React__default.createElement(UsedPluginsContext.Provider, { value: new Set(plugins.map((plugin) => plugin.id)) }, children)
  );
};
function useHasPlugin(id) {
  const usedPlugins = React__default.useContext(UsedPluginsContext);
  return usedPlugins.has(id);
}
const RequirePlugin = ({ id, children }) => {
  return useHasPlugin(id) ? React__default.createElement(React__default.Fragment, {}, children) : null;
};
export {
  RealmPluginInitializer,
  RequirePlugin,
  realmFactoryToComponent,
  realmPlugin,
  sysHooks,
  useHasPlugin
};
