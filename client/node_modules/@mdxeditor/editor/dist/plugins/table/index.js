import { gfmTableFromMarkdown, gfmTableToMarkdown } from "mdast-util-gfm-table";
import { gfmTable } from "micromark-extension-gfm-table";
import { coreSystem } from "../core/index.js";
import { LexicalTableVisitor } from "./LexicalTableVisitor.js";
import { MdastTableVisitor } from "./MdastTableVisitor.js";
import { $createTableNode, TableNode } from "./TableNode.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
function seedTable() {
  return {
    type: "table",
    children: [
      {
        type: "tableRow",
        children: [{ type: "tableCell", children: [] }]
      }
    ]
  };
}
const tableSystem = system(
  (r, [{ insertDecoratorNode }]) => {
    const insertTable = r.node();
    r.link(
      r.pipe(
        insertTable,
        r.o.mapTo(() => {
          return $createTableNode(seedTable());
        })
      ),
      insertDecoratorNode
    );
    return {
      insertTable
    };
  },
  [coreSystem]
);
const [
  /** @internal */
  tablePlugin,
  /** @internal */
  tablePluginHooks
] = realmPlugin({
  id: "table",
  systemSpec: tableSystem,
  init: (realm) => {
    realm.pubKey("addMdastExtension", gfmTableFromMarkdown);
    realm.pubKey("addSyntaxExtension", gfmTable);
    realm.pubKey("addImportVisitor", MdastTableVisitor);
    realm.pubKey("addLexicalNode", TableNode);
    realm.pubKey("addExportVisitor", LexicalTableVisitor);
    realm.pubKey("addToMarkdownExtension", gfmTableToMarkdown({ tableCellPadding: true, tablePipeAlign: true }));
  }
});
export {
  tablePlugin,
  tablePluginHooks,
  tableSystem
};
