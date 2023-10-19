import { fromMarkdown } from "mdast-util-from-markdown";
function isParent(node) {
  return node.children instanceof Array;
}
function importMarkdownToLexical({ root, markdown, visitors, syntaxExtensions, mdastExtensions }) {
  var _a;
  const mdastRoot = fromMarkdown(markdown, {
    extensions: syntaxExtensions,
    mdastExtensions
  });
  if (mdastRoot.children.length === 0) {
    mdastRoot.children.push({ type: "paragraph", children: [] });
  }
  if (((_a = mdastRoot.children.at(-1)) == null ? void 0 : _a.type) !== "paragraph") {
    mdastRoot.children.push({ type: "paragraph", children: [] });
  }
  importMdastTreeToLexical({ root, mdastRoot, visitors });
}
function importMdastTreeToLexical({ root, mdastRoot, visitors }) {
  const formattingMap = /* @__PURE__ */ new WeakMap();
  function visitChildren(mdastNode, lexicalParent) {
    if (!isParent(mdastNode)) {
      throw new Error("Attempting to visit children of a non-parent");
    }
    mdastNode.children.forEach((child) => visit(child, lexicalParent, mdastNode));
  }
  function visit(mdastNode, lexicalParent, mdastParent) {
    const visitor = visitors.find((visitor2) => {
      if (typeof visitor2.testNode === "string") {
        return visitor2.testNode === mdastNode.type;
      }
      return visitor2.testNode(mdastNode);
    });
    if (!visitor) {
      throw new Error(`no MdastImportVisitor found for ${mdastNode.type} ${JSON.stringify(mdastNode)}`, {
        cause: mdastNode
      });
    }
    visitor.visitNode({
      //@ts-expect-error root type is glitching
      mdastNode,
      lexicalParent,
      mdastParent,
      actions: {
        visitChildren,
        addAndStepInto(lexicalNode) {
          lexicalParent.append(lexicalNode);
          if (isParent(mdastNode)) {
            visitChildren(mdastNode, lexicalNode);
          }
        },
        addFormatting(format, node = mdastNode) {
          formattingMap.set(node, format | (formattingMap.get(mdastParent) ?? 0));
        },
        removeFormatting(format, node = mdastNode) {
          formattingMap.set(node, format ^ (formattingMap.get(mdastParent) ?? 0));
        },
        getParentFormatting() {
          return formattingMap.get(mdastParent) ?? 0;
        }
      }
    });
  }
  visit(mdastRoot, root, null);
}
export {
  importMarkdownToLexical,
  importMdastTreeToLexical
};
