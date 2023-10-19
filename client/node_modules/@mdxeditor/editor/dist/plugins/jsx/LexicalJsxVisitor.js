import { $isLexicalJsxNode } from "./LexicalJsxNode.js";
const LexicalJsxVisitor = {
  testLexicalNode: $isLexicalJsxNode,
  visitLexicalNode({ actions, mdastParent, lexicalNode }) {
    const mdastNode = lexicalNode.getMdastNode();
    actions.registerReferredComponent(mdastNode.name);
    actions.appendToParent(mdastParent, mdastNode);
  }
};
export {
  LexicalJsxVisitor
};
