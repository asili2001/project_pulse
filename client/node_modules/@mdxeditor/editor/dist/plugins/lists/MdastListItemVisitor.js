import { $createListItemNode } from "@lexical/list";
const MdastListItemVisitor = {
  testNode: "listItem",
  visitNode({ actions }) {
    actions.addAndStepInto($createListItemNode());
  }
};
export {
  MdastListItemVisitor
};
