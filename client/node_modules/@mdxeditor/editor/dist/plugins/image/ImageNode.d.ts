/// <reference types="react" />
import type { DOMConversionMap, DOMExportOutput, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
import { DecoratorNode } from 'lexical';
/**
 * A serialized representation of an {@link ImageNode}.
 */
export type SerializedImageNode = Spread<{
    altText: string;
    title?: string;
    width?: number;
    height?: number;
    src: string;
    type: 'image';
    version: 1;
}, SerializedLexicalNode>;
/**
 * A lexical node that represents an image. Use {@link "$createImageNode"} to construct one.
 */
export declare class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __title: string | undefined;
    __width: 'inherit' | number;
    __height: 'inherit' | number;
    static getType(): string;
    static clone(node: ImageNode): ImageNode;
    static importJSON(serializedNode: SerializedImageNode): ImageNode;
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
    constructor(src: string, altText: string, title: string | undefined, width?: 'inherit' | number, height?: 'inherit' | number, key?: NodeKey);
    exportJSON(): SerializedImageNode;
    setWidthAndHeight(width: 'inherit' | number, height: 'inherit' | number): void;
    createDOM(config: EditorConfig): HTMLElement;
    updateDOM(): false;
    getSrc(): string;
    getAltText(): string;
    getTitle(): string | undefined;
    getHeight(): 'inherit' | number;
    getWidth(): 'inherit' | number;
    hasExplicitDimensions(): boolean;
    setTitle(title: string | undefined): void;
    setSrc(src: string): void;
    setAltText(altText: string | undefined): void;
    decorate(_parentEditor: LexicalEditor): JSX.Element;
}
/**
 * The payload to create an {@link ImageNode}.
 */
export interface CreateImageNodeOptions {
    altText: string;
    width?: number;
    height?: number;
    title?: string;
    key?: NodeKey;
    src: string;
}
/**
 * Creates an {@link ImageNode}.
 * @param options - The payload to create an image. The keys map to the img tag attributes.
 */
export declare function $createImageNode(options: CreateImageNodeOptions): ImageNode;
/**
 * Retruns true if the node is an {@link ImageNode}.
 */
export declare function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode;
