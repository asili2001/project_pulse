import React__default from "react";
import { corePluginHooks } from "../../core/index.js";
import styles from "../../../styles/ui.module.css.js";
import { sandpackPluginHooks } from "../../sandpack/index.js";
import { ButtonWithTooltip } from "../primitives/toolbar.js";
import DeleteIcon from "../../../icons/delete.svg.js";
const ShowSandpackInfo = () => {
  const [editorInFocus, theEditor] = corePluginHooks.useEmitterValues("editorInFocus", "activeEditor");
  const sandpackNode = editorInFocus.rootNode;
  const [sandpackConfig] = sandpackPluginHooks.useEmitterValues("sandpackConfig");
  const preset = sandpackConfig.presets.find((preset2) => preset2.meta === sandpackNode.getMeta());
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.selectWithLabel }, /* @__PURE__ */ React__default.createElement(
    ButtonWithTooltip,
    {
      title: "Delete this code block",
      onClick: () => {
        theEditor == null ? void 0 : theEditor.update(() => {
          if (sandpackNode.getNextSibling()) {
            sandpackNode.selectNext();
          } else {
            sandpackNode.selectPrevious();
          }
          sandpackNode.remove();
        });
      }
    },
    /* @__PURE__ */ React__default.createElement(DeleteIcon, null)
  ), /* @__PURE__ */ React__default.createElement("label", null, "Sandpack preset: ", preset.name));
};
export {
  ShowSandpackInfo
};
