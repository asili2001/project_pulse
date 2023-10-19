import { coreSystem } from "../core/index.js";
import { directive } from "micromark-extension-directive";
import { directiveFromMarkdown, directiveToMarkdown } from "mdast-util-directive";
import { $createDirectiveNode, DirectiveNode } from "./DirectiveNode.js";
import { DirectiveVisitor } from "./DirectiveVisitor.js";
import { MdastDirectiveVisitor } from "./MdastDirectiveVisitor.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const directivesSystem = system(
  (r, [{ insertDecoratorNode }]) => {
    const directiveDescriptors = r.node([]);
    const insertDirective = r.node();
    r.link(
      r.pipe(
        insertDirective,
        r.o.map((payload) => {
          return () => $createDirectiveNode({ children: [], ...payload });
        })
      ),
      insertDecoratorNode
    );
    return {
      directiveDescriptors,
      insertDirective
    };
  },
  [coreSystem]
);
const [
  /** @internal */
  directivesPlugin,
  /** @internal */
  directivesPluginHooks
] = realmPlugin({
  id: "directives",
  systemSpec: directivesSystem,
  applyParamsToSystem: (realm, params) => {
    realm.pubKey("directiveDescriptors", (params == null ? void 0 : params.directiveDescriptors) || []);
  },
  init: (realm, _) => {
    realm.pubKey("addMdastExtension", directiveFromMarkdown);
    realm.pubKey("addSyntaxExtension", directive());
    realm.pubKey("addImportVisitor", MdastDirectiveVisitor);
    realm.pubKey("addLexicalNode", DirectiveNode);
    realm.pubKey("addExportVisitor", DirectiveVisitor);
    realm.pubKey("addToMarkdownExtension", directiveToMarkdown);
  }
});
export {
  directivesPlugin,
  directivesPluginHooks,
  directivesSystem
};
