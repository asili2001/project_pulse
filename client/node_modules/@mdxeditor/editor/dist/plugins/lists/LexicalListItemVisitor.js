import { $isListItemNode, $isListNode } from "@lexical/list";
const LexicalListItemVisitor = {
  testLexicalNode: $isListItemNode,
  visitLexicalNode: ({ lexicalNode, mdastParent, actions }) => {
    const children = lexicalNode.getChildren();
    const firstChild = children[0];
    if (children.length === 1 && $isListNode(firstChild)) {
      const prevListItemNode = mdastParent.children.at(-1);
      actions.visitChildren(lexicalNode, prevListItemNode);
    } else {
      const listItem = actions.appendToParent(mdastParent, {
        type: "listItem",
        spread: false,
        children: [{ type: "paragraph", children: [] }]
      });
      actions.visitChildren(lexicalNode, listItem.children[0]);
    }
  }
};
export {
  LexicalListItemVisitor
};
