import { $createDirectiveNode } from "./DirectiveNode.js";
const DIRECTIVE_TYPES = ["leafDirective", "containerDirective", "textDirective"];
const MdastDirectiveVisitor = {
  testNode: (node) => {
    return DIRECTIVE_TYPES.includes(node.type);
  },
  visitNode({ lexicalParent, mdastNode }) {
    lexicalParent.append($createDirectiveNode(mdastNode));
  }
};
export {
  MdastDirectiveVisitor
};
