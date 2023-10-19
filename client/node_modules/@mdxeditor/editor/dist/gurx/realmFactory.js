import { uuidv4 } from "../utils/uuid4.js";
import { realm } from "./realm.js";
function system(constructor, dependencies = []) {
  return {
    constructor,
    dependencies,
    id: uuidv4()
  };
}
function realmFactory(...specs) {
  const singletons = /* @__PURE__ */ new Map();
  const r = realm();
  const _init = ({ id, constructor, dependencies }) => {
    if (singletons.has(id)) {
      return singletons.get(id);
    }
    const system2 = constructor(r, dependencies.map((t) => _init(specs.find((spec) => spec.id === t.id))));
    r.label(system2);
    singletons.set(id, system2);
    return system2;
  };
  specs.forEach(_init);
  return r;
}
function getRealmFactory(...specs) {
  return () => realmFactory(...specs);
}
export {
  getRealmFactory,
  realmFactory,
  system
};
