import React from 'react';
import type { EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
import { DecoratorNode } from 'lexical';
import { Directive } from 'mdast-util-directive';
import { VoidEmitter } from '../../utils/voidEmitter';
/**
 * A serialized representation of an {@link DirectiveNode}.
 */
export type SerializedDirectiveNode = Spread<{
    mdastNode: Directive;
    type: 'directive';
    version: 1;
}, SerializedLexicalNode>;
/**
 * A lexical node that represents an image. Use {@link "$createDirectiveNode"} to construct one.
 */
export declare class DirectiveNode extends DecoratorNode<React.JSX.Element> {
    __mdastNode: Directive;
    __focusEmitter: {
        publish: () => void;
        subscribe: (cb: () => void) => void;
    };
    static getType(): string;
    static clone(node: DirectiveNode): DirectiveNode;
    static importJSON(serializedNode: SerializedDirectiveNode): DirectiveNode;
    constructor(mdastNode: Directive, key?: NodeKey);
    getMdastNode(): Directive;
    exportJSON(): SerializedDirectiveNode;
    createDOM(): HTMLElement;
    updateDOM(): false;
    setMdastNode(mdastNode: Directive): void;
    select: () => void;
    decorate(parentEditor: LexicalEditor, config: EditorConfig): JSX.Element;
    isInline(): boolean;
    isKeyboardSelectable(): boolean;
}
export declare function DirectiveEditorContainer(props: {
    parentEditor: LexicalEditor;
    lexicalNode: DirectiveNode;
    mdastNode: Directive;
    config: EditorConfig;
    focusEmitter: VoidEmitter;
}): React.JSX.Element;
/**
 * Creates an {@link DirectiveNode}.
 */
export declare function $createDirectiveNode(mdastNode: Directive, key?: NodeKey): DirectiveNode;
/**
 * Retruns true if the node is an {@link DirectiveNode}.
 */
export declare function $isDirectiveNode(node: LexicalNode | null | undefined): node is DirectiveNode;
