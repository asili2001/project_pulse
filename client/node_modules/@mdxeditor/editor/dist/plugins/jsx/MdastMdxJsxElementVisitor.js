import { $createLexicalJsxNode } from "./LexicalJsxNode.js";
const MdastMdxJsxElementVisitor = {
  testNode: (node) => {
    return (node.type === "mdxJsxTextElement" || node.type === "mdxJsxFlowElement") && node.name !== "img";
  },
  visitNode({ lexicalParent, mdastNode }) {
    lexicalParent.append($createLexicalJsxNode(mdastNode));
  }
};
export {
  MdastMdxJsxElementVisitor
};
