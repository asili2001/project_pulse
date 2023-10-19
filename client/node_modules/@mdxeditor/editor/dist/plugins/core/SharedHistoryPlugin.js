import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin.js";
import React__default from "react";
import { corePluginHooks } from "./index.js";
const SharedHistoryPlugin = () => {
  const [historyState] = corePluginHooks.useEmitterValues("historyState");
  return /* @__PURE__ */ React__default.createElement(HistoryPlugin, { externalHistoryState: historyState });
};
export {
  SharedHistoryPlugin
};
