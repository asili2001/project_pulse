import { coreSystem } from "../core/index.js";
import { frontmatterFromMarkdown, frontmatterToMarkdown } from "mdast-util-frontmatter";
import { frontmatter } from "micromark-extension-frontmatter";
import { MdastFrontmatterVisitor } from "./MdastFrontmatterVisitor.js";
import { LexicalFrontmatterVisitor } from "./LexicalFrontmatterVisitor.js";
import { $getRoot } from "lexical";
import { $isFrontmatterNode, $createFrontmatterNode, FrontmatterNode } from "./FrontmatterNode.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const frontmatterSystem = system(
  (r, [{ rootEditor, createRootEditorSubscription }]) => {
    const insertFrontmatter = r.node();
    const removeFrontmatter = r.node();
    const frontmatterDialogOpen = r.node(false);
    const hasFrontmatter = r.node(false);
    r.sub(r.pipe(insertFrontmatter, r.o.withLatestFrom(rootEditor)), ([, theEditor]) => {
      theEditor == null ? void 0 : theEditor.update(() => {
        const firstItem = $getRoot().getFirstChild();
        if (!$isFrontmatterNode(firstItem)) {
          const fmNode = $createFrontmatterNode('"": ""');
          if (firstItem) {
            firstItem.insertBefore(fmNode);
          } else {
            $getRoot().append(fmNode);
          }
        }
      });
      r.pub(frontmatterDialogOpen, true);
    });
    r.sub(r.pipe(removeFrontmatter, r.o.withLatestFrom(rootEditor)), ([, theEditor]) => {
      theEditor == null ? void 0 : theEditor.update(() => {
        const firstItem = $getRoot().getFirstChild();
        if ($isFrontmatterNode(firstItem)) {
          firstItem.remove();
        }
      });
      r.pub(frontmatterDialogOpen, false);
    });
    r.pub(createRootEditorSubscription, (rootEditor2) => {
      return rootEditor2.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          r.pub(hasFrontmatter, $isFrontmatterNode($getRoot().getFirstChild()));
        });
      });
    });
    return {
      insertFrontmatter,
      removeFrontmatter,
      hasFrontmatter,
      frontmatterDialogOpen
    };
  },
  [coreSystem]
);
const [
  /** @internal */
  frontmatterPlugin,
  /** @internal */
  frontmatterPluginHooks
] = realmPlugin({
  id: "frontmatter",
  systemSpec: frontmatterSystem,
  init: (realm) => {
    realm.pubKey("addMdastExtension", frontmatterFromMarkdown("yaml"));
    realm.pubKey("addSyntaxExtension", frontmatter());
    realm.pubKey("addLexicalNode", FrontmatterNode);
    realm.pubKey("addImportVisitor", MdastFrontmatterVisitor);
    realm.pubKey("addExportVisitor", LexicalFrontmatterVisitor);
    realm.pubKey("addToMarkdownExtension", frontmatterToMarkdown("yaml"));
  }
});
export {
  frontmatterPlugin,
  frontmatterPluginHooks,
  frontmatterSystem
};
