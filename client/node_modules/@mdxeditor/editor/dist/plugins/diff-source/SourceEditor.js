import { markdown } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { lineNumbers, EditorView } from "@codemirror/view";
import { basicLight } from "cm6-theme-basic-light";
import { basicSetup } from "codemirror";
import React__default from "react";
import { diffSourcePluginHooks } from "./index.js";
import { corePluginHooks } from "../core/index.js";
const COMMON_STATE_CONFIG_EXTENSIONS = [basicSetup, basicLight, markdown(), lineNumbers()];
const SourceEditor = () => {
  const [markdown2, readOnly] = corePluginHooks.useEmitterValues("markdown", "readOnly");
  const updateMarkdown = diffSourcePluginHooks.usePublisher("markdownSourceEditorValue");
  const editorViewRef = React__default.useRef(null);
  const ref = React__default.useCallback(
    (el) => {
      var _a;
      if (el !== null) {
        const extensions = [
          ...COMMON_STATE_CONFIG_EXTENSIONS,
          EditorView.updateListener.of(({ state }) => {
            updateMarkdown(state.doc.toString());
          })
        ];
        if (readOnly) {
          extensions.push(EditorState.readOnly.of(true));
        }
        el.innerHTML = "";
        editorViewRef.current = new EditorView({
          parent: el,
          state: EditorState.create({ doc: markdown2, extensions })
        });
      } else {
        (_a = editorViewRef.current) == null ? void 0 : _a.destroy();
        editorViewRef.current = null;
      }
    },
    [markdown2, readOnly, updateMarkdown]
  );
  return /* @__PURE__ */ React__default.createElement("div", { ref, className: "cm-sourceView" });
};
export {
  COMMON_STATE_CONFIG_EXTENSIONS,
  SourceEditor
};
