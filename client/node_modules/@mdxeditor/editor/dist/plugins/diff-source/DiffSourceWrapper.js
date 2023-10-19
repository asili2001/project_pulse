import React__default from "react";
import { diffSourcePluginHooks } from "./index.js";
import { DiffViewer } from "./DiffViewer.js";
import { SourceEditor } from "./SourceEditor.js";
const DiffSourceWrapper = ({ children }) => {
  const [viewMode] = diffSourcePluginHooks.useEmitterValues("viewMode");
  return /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("div", { style: { display: viewMode === "rich-text" ? "block" : "none" } }, children), viewMode === "diff" ? /* @__PURE__ */ React__default.createElement(DiffViewer, null) : null, viewMode === "source" ? /* @__PURE__ */ React__default.createElement(SourceEditor, null) : null);
};
export {
  DiffSourceWrapper
};
