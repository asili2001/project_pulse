import React__default from "react";
import { diffSourcePluginHooks } from "./index.js";
import { corePluginHooks } from "../core/index.js";
import { MergeView } from "@codemirror/merge";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { COMMON_STATE_CONFIG_EXTENSIONS } from "./SourceEditor.js";
const DiffViewer = () => {
  const [newText] = corePluginHooks.useEmitterValues("markdown");
  const [oldText] = diffSourcePluginHooks.useEmitterValues("diffMarkdown");
  const updateMarkdown = diffSourcePluginHooks.usePublisher("markdownSourceEditorValue");
  return /* @__PURE__ */ React__default.createElement(CmMergeView, { oldMarkdown: oldText, newMarkdown: newText, onUpdate: updateMarkdown });
};
const CmMergeView = ({ oldMarkdown, newMarkdown, onUpdate }) => {
  const cmMergeViewRef = React__default.useRef(null);
  const ref = React__default.useCallback(
    (el) => {
      var _a;
      if (el !== null) {
        cmMergeViewRef.current = new MergeView({
          renderRevertControl: () => {
            const el2 = document.createElement("button");
            el2.classList.add("cm-merge-revert");
            el2.appendChild(document.createTextNode("⮕"));
            return el2;
          },
          parent: el,
          orientation: "a-b",
          revertControls: "a-to-b",
          gutter: true,
          a: {
            doc: oldMarkdown,
            extensions: [...COMMON_STATE_CONFIG_EXTENSIONS, EditorState.readOnly.of(true)]
          },
          b: {
            doc: newMarkdown,
            extensions: [
              ...COMMON_STATE_CONFIG_EXTENSIONS,
              EditorView.updateListener.of(({ state }) => {
                const md = state.doc.toString();
                onUpdate(md);
              })
            ]
          }
        });
      } else {
        (_a = cmMergeViewRef.current) == null ? void 0 : _a.destroy();
        cmMergeViewRef.current = null;
      }
    },
    [newMarkdown, oldMarkdown, onUpdate]
  );
  return /* @__PURE__ */ React__default.createElement("div", { ref });
};
export {
  DiffViewer
};
