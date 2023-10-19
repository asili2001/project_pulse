import React__default from "react";
import { corePluginHooks } from "../../core/index.js";
import { Select } from "../primitives/select.js";
import { codeMirrorHooks } from "../../codemirror/index.js";
import styles from "../../../styles/ui.module.css.js";
const ChangeCodeMirrorLanguage = () => {
  const [editorInFocus, theEditor] = corePluginHooks.useEmitterValues("editorInFocus", "activeEditor");
  const codeBlockNode = editorInFocus.rootNode;
  const [codeBlockLanguages] = codeMirrorHooks.useEmitterValues("codeBlockLanguages");
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.selectWithLabel }, /* @__PURE__ */ React__default.createElement("label", null, "Code block language:"), /* @__PURE__ */ React__default.createElement(
    Select,
    {
      value: codeBlockNode.getLanguage(),
      onChange: (language) => {
        theEditor == null ? void 0 : theEditor.update(() => {
          codeBlockNode.setLanguage(language);
          setTimeout(() => {
            theEditor == null ? void 0 : theEditor.update(() => {
              codeBlockNode.getLatest().select();
            });
          });
        });
      },
      triggerTitle: "Select code block language",
      placeholder: "Code block language",
      items: Object.entries(codeBlockLanguages).map(([value, label]) => ({ value, label }))
    }
  ));
};
export {
  ChangeCodeMirrorLanguage
};
