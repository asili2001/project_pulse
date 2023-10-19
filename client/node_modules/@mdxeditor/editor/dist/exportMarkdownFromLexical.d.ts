import { LexicalNode, RootNode as LexicalRootNode } from 'lexical';
import * as Mdast from 'mdast';
import { Options as ToMarkdownOptions } from 'mdast-util-to-markdown';
import type { JsxComponentDescriptor } from './plugins/jsx';
export type { Options as ToMarkdownOptions } from 'mdast-util-to-markdown';
/**
 * A set of covenience utilities to manipulate the mdast tree when processing lexical nodes.
 */
export interface LexicalVisitActions<T extends LexicalNode> {
    /**
     * Iterate over the immediate children of a lexical node with the given mdast node as a parent.
     */
    visitChildren(node: T, mdastParent: Mdast.Parent): void;
    /**
     * Create a new mdast node with the given type, and props.
     * Iterate over the immediate children of the current lexical node with the new mdast node as a parent.
     * @param hasChildren - true by default. Pass false to skip iterating over the lexical node children.
     */
    addAndStepInto(type: string, props?: Record<string, unknown>, hasChildren?: boolean): void;
    /**
     * Append a new mdast node to a parent node.
     * @param parentNode - the mdast parent node to append the new node to.
     * @param node - the mdast node to append.
     */
    appendToParent<T extends Mdast.Parent>(parentNode: T, node: T['children'][number]): T['children'][number] | Mdast.Root;
    /**
     * Used when processing JSX nodes so that later, the correct import statement can be added to the document.
     * @param componentName - the name of the component that has to be imported.
     * @see {@link JsxComponentDescriptor}
     */
    registerReferredComponent(componentName: string): void;
}
/**
 * The params passed to the {@link LexicalExportVisitor.visitLexicalNode} method.
 */
export interface LexicalNodeVisitParams<T extends LexicalNode> {
    /**
     * The lexical node that is being visited.
     */
    lexicalNode: T;
    /**
     * The mdast parent node that the result of the lexical node conversion should be appended to.
     */
    mdastParent: Mdast.Parent;
    /**
     * A set of actions that can be used to manipulate the mdast tree.
     * These are "convenience" utilities that avoid the repetitive boilerplate of creating mdast nodes.
     */
    actions: LexicalVisitActions<T>;
}
/**
 * Implement this interface in order to process mdast node(s) into a lexical tree.
 * This is part of the process that converts the editor contents to markdown.
 */
export interface LexicalExportVisitor<LN extends LexicalNode, UN extends Mdast.Content> {
    /**
     * Return true if the given node is of the type that this visitor can process.
     * You can safely use the node type guard functions (as in $isParagraphNode, $isLinkNode, etc.) here.
     */
    testLexicalNode?(lexicalNode: LexicalNode): lexicalNode is LN;
    /**
     * Process the given node and manipulate the mdast tree accordingly.
     * @see {@link LexicalNodeVisitParams} and {@link LexicalVisitActions} for more information.
     */
    visitLexicalNode?(params: LexicalNodeVisitParams<LN>): void;
    /**
     * Return true if the current node should be joined with the previous node.
     * This is necessary due to some inconsistencies between the lexical tree and the mdast tree when it comes to formatting.
     */
    shouldJoin?(prevNode: Mdast.Content, currentNode: UN): boolean;
    /**
     * Join the current node with the previous node, returning the resulting new node
     * For this to be called by the tree walk, shouldJoin must return true.
     */
    join?<T extends Mdast.Content>(prevNode: T, currentNode: T): T;
}
/**
 * The "any" type for LexicalExportVisitor.
 * @internal
 */
export type LexicalVisitor = LexicalExportVisitor<LexicalNode, Mdast.Content>;
/**
 * @internal
 */
export interface ExportLexicalTreeOptions {
    root: LexicalRootNode;
    visitors: LexicalVisitor[];
    jsxComponentDescriptors: JsxComponentDescriptor[];
    jsxIsAvailable: boolean;
}
/**
 * @internal
 */
export declare function exportLexicalTreeToMdast({ root, visitors, jsxComponentDescriptors, jsxIsAvailable }: ExportLexicalTreeOptions): Mdast.Root;
/**
 * @internal
 */
export type ToMarkdownExtension = NonNullable<ToMarkdownOptions['extensions']>[number];
/**
 * @internal
 */
export interface ExportMarkdownFromLexicalOptions extends ExportLexicalTreeOptions {
    visitors: LexicalVisitor[];
    /**
     * the markdown extensions to use
     */
    toMarkdownExtensions: ToMarkdownExtension[];
    /**
     * The options to pass to `toMarkdown`
     */
    toMarkdownOptions: ToMarkdownOptions;
}
/**
 * Configures how the lexical tree is converted to a mdast tree and then to markdown.
 */
export interface LexicalConvertOptions {
    /**
     * The visitors to use when processing the lexical tree
     */
    visitors?: LexicalVisitor[];
    /**
     * the markdown extensions to use
     */
    toMarkdownExtensions?: ToMarkdownExtension[];
    /**
     * The options to pass to `toMarkdown`
     */
    toMarkdownOptions?: ToMarkdownOptions;
}
/**
 * @internal
 */
export declare function exportMarkdownFromLexical({ root, toMarkdownOptions, toMarkdownExtensions, visitors, jsxComponentDescriptors, jsxIsAvailable }: ExportMarkdownFromLexicalOptions): string;
