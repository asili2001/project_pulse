import { $createCodeBlockNode } from "./CodeBlockNode.js";
const MdastCodeVisitor = {
  testNode: "code",
  visitNode({ mdastNode, actions }) {
    actions.addAndStepInto(
      $createCodeBlockNode({
        code: mdastNode.value,
        language: mdastNode.lang,
        meta: mdastNode.meta
      })
    );
  }
};
export {
  MdastCodeVisitor
};
