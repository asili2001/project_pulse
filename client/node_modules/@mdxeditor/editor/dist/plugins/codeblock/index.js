import { CodeBlockVisitor } from "./CodeBlockVisitor.js";
import { MdastCodeVisitor } from "./MdastCodeVisitor.js";
import { coreSystem } from "../core/index.js";
import { $createCodeBlockNode, CodeBlockNode } from "./CodeBlockNode.js";
import { useCodeBlockEditorContext } from "./CodeBlockNode.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const codeBlockSystem = system(
  (r, [{ insertDecoratorNode }]) => {
    const codeBlockEditorDescriptors = r.node([]);
    const appendCodeBlockEditorDescriptor = r.node();
    const insertCodeBlock = r.node();
    const defaultCodeBlockLanguage = r.node("");
    r.link(
      r.pipe(
        insertCodeBlock,
        r.o.withLatestFrom(defaultCodeBlockLanguage),
        r.o.map(
          ([payload, defaultCodeBlockLanguage2]) => () => $createCodeBlockNode({ language: defaultCodeBlockLanguage2, ...payload })
        )
      ),
      insertDecoratorNode
    );
    r.link(
      r.pipe(
        appendCodeBlockEditorDescriptor,
        r.o.withLatestFrom(codeBlockEditorDescriptors),
        r.o.map(([newValue, values]) => {
          if (values.includes(newValue)) {
            return values;
          }
          return [...values, newValue];
        })
      ),
      codeBlockEditorDescriptors
    );
    return {
      codeBlockEditorDescriptors,
      defaultCodeBlockLanguage,
      appendCodeBlockEditorDescriptor,
      insertCodeBlock
    };
  },
  [coreSystem]
);
const [
  /**
   * @internal
   */
  codeBlockPlugin,
  /**
   * @internal
   */
  codeBlockPluginHooks
] = realmPlugin({
  id: "codeblock",
  systemSpec: codeBlockSystem,
  applyParamsToSystem(realm, params) {
    realm.pubKey("defaultCodeBlockLanguage", (params == null ? void 0 : params.defaultCodeBlockLanguage) || "");
  },
  init: (realm, params) => {
    realm.pubKey("codeBlockEditorDescriptors", (params == null ? void 0 : params.codeBlockEditorDescriptors) || []);
    realm.pubKey("addImportVisitor", MdastCodeVisitor);
    realm.pubKey("addLexicalNode", CodeBlockNode);
    realm.pubKey("addExportVisitor", CodeBlockVisitor);
  }
});
export {
  codeBlockPlugin,
  codeBlockPluginHooks,
  codeBlockSystem,
  useCodeBlockEditorContext
};
