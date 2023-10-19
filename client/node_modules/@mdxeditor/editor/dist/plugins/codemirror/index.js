import { coreSystem } from "../core/index.js";
import { codeBlockSystem } from "../codeblock/index.js";
import { CodeMirrorEditor } from "./CodeMirrorEditor.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const defaultCodeBlockLanguages = {
  js: "JavaScript",
  ts: "TypeScript",
  tsx: "TypeScript (React)",
  jsx: "JavaScript (React)",
  css: "CSS"
};
const codeMirrorSystem = system(
  (r, [, { insertCodeBlock }]) => {
    const codeBlockLanguages = r.node(defaultCodeBlockLanguages);
    const insertCodeMirror = r.node();
    r.link(
      r.pipe(
        insertCodeMirror,
        r.o.map(({ language, code }) => {
          return {
            code,
            language,
            meta: ""
          };
        })
      ),
      insertCodeBlock
    );
    return {
      codeBlockLanguages,
      insertCodeMirror
    };
  },
  [coreSystem, codeBlockSystem]
);
const [
  /** @internal */
  codeMirrorPlugin,
  /** @internal */
  codeMirrorHooks
] = realmPlugin({
  id: "codemirror",
  systemSpec: codeMirrorSystem,
  applyParamsToSystem(r, params) {
    r.pubKey("codeBlockLanguages", params.codeBlockLanguages);
  },
  init(r, { codeBlockLanguages }) {
    r.pubKey("appendCodeBlockEditorDescriptor", {
      match(language, meta) {
        return codeBlockLanguages.hasOwnProperty(language) && meta === "";
      },
      priority: 1,
      Editor: CodeMirrorEditor
    });
  }
});
export {
  codeMirrorHooks,
  codeMirrorPlugin,
  codeMirrorSystem
};
