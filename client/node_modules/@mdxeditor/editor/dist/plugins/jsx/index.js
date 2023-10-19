import { mdxFromMarkdown, mdxToMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import { coreSystem } from "../core/index.js";
import { $createLexicalJsxNode, LexicalJsxNode } from "./LexicalJsxNode.js";
import { LexicalJsxVisitor } from "./LexicalJsxVisitor.js";
import { MdastMdxJsEsmVisitor } from "./MdastMdxJsEsmVisitor.js";
import { MdastMdxJsxElementVisitor } from "./MdastMdxJsxElementVisitor.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const jsxSystem = system(
  (r, [{ insertDecoratorNode }]) => {
    const insertJsx = r.node();
    r.link(
      r.pipe(
        insertJsx,
        r.o.map(({ name, kind, props }) => {
          return () => $createLexicalJsxNode({
            name,
            type: kind === "flow" ? "mdxJsxFlowElement" : "mdxJsxTextElement",
            attributes: Object.entries(props).map(([name2, value]) => ({ type: "mdxJsxAttribute", name: name2, value })),
            children: []
          });
        })
      ),
      insertDecoratorNode
    );
    return {
      insertJsx
    };
  },
  [coreSystem]
);
const [
  /** @internal */
  jsxPlugin,
  /** @internal */
  jsxPluginHooks
] = realmPlugin({
  id: "jsx",
  systemSpec: jsxSystem,
  applyParamsToSystem: (realm, params) => {
    realm.pubKey("jsxComponentDescriptors", (params == null ? void 0 : params.jsxComponentDescriptors) || []);
  },
  init: (realm, _) => {
    realm.pubKey("jsxIsAvailable", true);
    realm.pubKey("addMdastExtension", mdxFromMarkdown());
    realm.pubKey("addSyntaxExtension", mdxjs());
    realm.pubKey("addImportVisitor", MdastMdxJsxElementVisitor);
    realm.pubKey("addImportVisitor", MdastMdxJsEsmVisitor);
    realm.pubKey("addLexicalNode", LexicalJsxNode);
    realm.pubKey("addExportVisitor", LexicalJsxVisitor);
    realm.pubKey("addToMarkdownExtension", mdxToMarkdown());
  }
});
export {
  jsxPlugin,
  jsxPluginHooks,
  jsxSystem
};
