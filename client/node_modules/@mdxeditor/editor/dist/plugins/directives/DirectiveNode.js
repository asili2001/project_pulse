var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import React__default from "react";
import { DecoratorNode } from "lexical";
import { NestedEditorsContext } from "../core/NestedLexicalEditor.js";
import { directivesPluginHooks } from "./index.js";
import { voidEmitter } from "../../utils/voidEmitter.js";
let GENERATION = 0;
class DirectiveNode extends DecoratorNode {
  constructor(mdastNode, key) {
    super(key);
    __publicField(this, "__mdastNode");
    __publicField(this, "__focusEmitter", voidEmitter());
    __publicField(this, "select", () => {
      this.__focusEmitter.publish();
    });
    this.__mdastNode = mdastNode;
    this.generation = GENERATION++;
  }
  static getType() {
    return "directive";
  }
  static clone(node) {
    return new DirectiveNode(structuredClone(node.__mdastNode), node.__key);
  }
  static importJSON(serializedNode) {
    return $createDirectiveNode(serializedNode.mdastNode);
  }
  getMdastNode() {
    return this.__mdastNode;
  }
  exportJSON() {
    return {
      mdastNode: structuredClone(this.__mdastNode),
      type: "directive",
      version: 1
    };
  }
  createDOM() {
    return document.createElement(this.__mdastNode.type === "textDirective" ? "span" : "div");
  }
  updateDOM() {
    return false;
  }
  setMdastNode(mdastNode) {
    this.getWritable().__mdastNode = mdastNode;
  }
  decorate(parentEditor, config) {
    return /* @__PURE__ */ React__default.createElement(
      DirectiveEditorContainer,
      {
        lexicalNode: this,
        mdastNode: this.getMdastNode(),
        parentEditor,
        config,
        focusEmitter: this.__focusEmitter
      }
    );
  }
  isInline() {
    return this.__mdastNode.type === "textDirective";
  }
  isKeyboardSelectable() {
    return true;
  }
}
function DirectiveEditorContainer(props) {
  const { mdastNode } = props;
  const [directiveDescriptors] = directivesPluginHooks.useEmitterValues("directiveDescriptors");
  const descriptor = directiveDescriptors.find((descriptor2) => descriptor2.testNode(mdastNode));
  if (!descriptor) {
    throw new Error(`No descriptor found for directive ${mdastNode.name}`);
  }
  const Editor = descriptor.Editor;
  return /* @__PURE__ */ React__default.createElement(NestedEditorsContext.Provider, { value: props }, /* @__PURE__ */ React__default.createElement(Editor, { descriptor, mdastNode, lexicalNode: props.lexicalNode, parentEditor: props.parentEditor }));
}
function $createDirectiveNode(mdastNode, key) {
  return new DirectiveNode(mdastNode, key);
}
function $isDirectiveNode(node) {
  return node instanceof DirectiveNode;
}
export {
  $createDirectiveNode,
  $isDirectiveNode,
  DirectiveEditorContainer,
  DirectiveNode
};
