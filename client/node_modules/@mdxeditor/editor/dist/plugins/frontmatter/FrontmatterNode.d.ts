/// <reference types="react" />
import { DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
/**
 * A serialized representation of an {@link FrontmatterNode}.
 */
export type SerializedFrontmatterNode = Spread<{
    yaml: string;
    version: 1;
}, SerializedLexicalNode>;
/**
 * Represents {@link https://daily-dev-tips.com/posts/what-exactly-is-frontmatter/ | the frontmatter} of the markdown document.
 * Use {@link "$createFrontmatterNode"} to construct one.
 */
export declare class FrontmatterNode extends DecoratorNode<JSX.Element> {
    __yaml: string;
    static getType(): string;
    static clone(node: FrontmatterNode): FrontmatterNode;
    static importJSON(serializedNode: SerializedFrontmatterNode): FrontmatterNode;
    constructor(code: string, key?: NodeKey);
    exportJSON(): SerializedFrontmatterNode;
    createDOM(_config: EditorConfig): HTMLDivElement;
    updateDOM(): false;
    getYaml(): string;
    setYaml(yaml: string): void;
    decorate(editor: LexicalEditor): JSX.Element;
}
/**
 * Creates a {@link FrontmatterNode}.
 * @param yaml - The YAML string of the frontmatter.
 */
export declare function $createFrontmatterNode(yaml: string): FrontmatterNode;
/**
 * Returns `true` if the given node is a {@link FrontmatterNode}.
 */
export declare function $isFrontmatterNode(node: LexicalNode | null | undefined): node is FrontmatterNode;
