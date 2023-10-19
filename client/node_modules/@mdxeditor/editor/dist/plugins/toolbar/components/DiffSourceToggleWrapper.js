import React__default from "react";
import { diffSourcePluginHooks } from "../../diff-source/index.js";
import { SingleChoiceToggleGroup } from "../primitives/toolbar.js";
import RichTextIcon from "../../../icons/rich_text.svg.js";
import DiffIcon from "../../../icons/difference.svg.js";
import SourceIcon from "../../../icons/markdown.svg.js";
import styles from "../../../styles/ui.module.css.js";
const DiffSourceToggleWrapper = ({ children }) => {
  const [viewMode] = diffSourcePluginHooks.useEmitterValues("viewMode");
  const changeViewMode = diffSourcePluginHooks.usePublisher("viewMode");
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, viewMode === "rich-text" ? children : viewMode === "diff" ? /* @__PURE__ */ React__default.createElement("span", { className: styles.toolbarTitleMode }, "Diff mode") : /* @__PURE__ */ React__default.createElement("span", { className: styles.toolbarTitleMode }, "Source mode"), /* @__PURE__ */ React__default.createElement("div", { style: { marginLeft: "auto", pointerEvents: "auto", opacity: 1 } }, /* @__PURE__ */ React__default.createElement(
    SingleChoiceToggleGroup,
    {
      className: styles.diffSourceToggle,
      value: viewMode,
      items: [
        { title: "Rich text", contents: /* @__PURE__ */ React__default.createElement(RichTextIcon, null), value: "rich-text" },
        { title: "Diff mode", contents: /* @__PURE__ */ React__default.createElement(DiffIcon, null), value: "diff" },
        { title: "Source", contents: /* @__PURE__ */ React__default.createElement(SourceIcon, null), value: "source" }
      ],
      onChange: (value) => changeViewMode(value || "rich-text")
    }
  )));
};
export {
  DiffSourceToggleWrapper
};
