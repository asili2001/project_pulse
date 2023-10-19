import type { EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
import { DecoratorNode } from 'lexical';
import React from 'react';
import { MdastJsx } from '.';
import { VoidEmitter } from '../../utils/voidEmitter';
/**
 * A serialized representation of an {@link LexicalJsxNode}.
 */
export type SerializedLexicalJsxNode = Spread<{
    mdastNode: MdastJsx;
    type: 'jsx';
    version: 1;
}, SerializedLexicalNode>;
/**
 * A lexical node that represents an image. Use {@link "$createLexicalJsxNode"} to construct one.
 */
export declare class LexicalJsxNode extends DecoratorNode<JSX.Element> {
    __mdastNode: MdastJsx;
    __focusEmitter: {
        publish: () => void;
        subscribe: (cb: () => void) => void;
    };
    static getType(): string;
    static clone(node: LexicalJsxNode): LexicalJsxNode;
    static importJSON(serializedNode: SerializedLexicalJsxNode): LexicalJsxNode;
    constructor(mdastNode: MdastJsx, key?: NodeKey);
    getMdastNode(): MdastJsx;
    exportJSON(): SerializedLexicalJsxNode;
    createDOM(): HTMLElement;
    updateDOM(): false;
    setMdastNode(mdastNode: MdastJsx): void;
    select: () => void;
    decorate(parentEditor: LexicalEditor, config: EditorConfig): JSX.Element;
    isInline(): boolean;
    isKeyboardSelectable(): boolean;
}
export declare function JsxEditorContainer(props: {
    /** The Lexical editor that contains the node */
    parentEditor: LexicalEditor;
    /** The Lexical node that is being edited */
    lexicalJsxNode: LexicalJsxNode;
    /** The MDAST node that is being edited */
    mdastNode: MdastJsx;
    config: EditorConfig;
    focusEmitter: VoidEmitter;
}): React.JSX.Element;
/**
 * Creates an {@link LexicalJsxNode}.
 */
export declare function $createLexicalJsxNode(mdastNode: MdastJsx): LexicalJsxNode;
/**
 * Retruns true if the node is an {@link LexicalJsxNode}.
 */
export declare function $isLexicalJsxNode(node: LexicalNode | null | undefined): node is LexicalJsxNode;
