import { $createListNode, $isListItemNode, $createListItemNode } from "@lexical/list";
const MdastListVisitor = {
  testNode: "list",
  visitNode: function({ mdastNode, lexicalParent, actions }) {
    const lexicalNode = $createListNode(mdastNode.ordered ? "number" : "bullet");
    if ($isListItemNode(lexicalParent)) {
      const dedicatedParent = $createListItemNode();
      dedicatedParent.append(lexicalNode);
      lexicalParent.insertAfter(dedicatedParent);
    } else {
      lexicalParent.append(lexicalNode);
    }
    actions.visitChildren(mdastNode, lexicalNode);
  }
};
export {
  MdastListVisitor
};
