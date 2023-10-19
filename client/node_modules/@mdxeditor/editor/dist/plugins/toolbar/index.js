import React__default from "react";
import { coreSystem, corePluginHooks } from "../core/index.js";
import { Root } from "./primitives/toolbar.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const toolbarSystem = system(
  (r) => {
    const toolbarContents = r.node(() => null);
    return {
      toolbarContents
    };
  },
  [coreSystem]
);
const DEFAULT_TOOLBAR_CONTENTS = () => {
  return "This is an empty toolbar. Pass `{toolbarContents: () => { return <>toolbar components</> }}` to the toolbarPlugin to customize it.";
};
const [
  /** @internal */
  toolbarPlugin,
  /** @internal */
  toolbarPluginHooks
] = realmPlugin({
  id: "toolbar",
  systemSpec: toolbarSystem,
  init: (realm, params) => {
    realm.pubKey("toolbarContents", (params == null ? void 0 : params.toolbarContents) ?? DEFAULT_TOOLBAR_CONTENTS);
    realm.pubKey("addTopAreaChild", ToolbarWrapper);
  }
});
const ToolbarWrapper = () => {
  const [toolbarContents] = toolbarPluginHooks.useEmitterValues("toolbarContents");
  const [readOnly] = corePluginHooks.useEmitterValues("readOnly");
  return /* @__PURE__ */ React__default.createElement(Root, { readOnly }, toolbarContents());
};
export {
  toolbarPlugin,
  toolbarPluginHooks,
  toolbarSystem
};
