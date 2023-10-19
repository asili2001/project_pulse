import { DecoratorNode, EditorConfig, LexicalEditor } from 'lexical';
import * as Mdast from 'mdast';
import type { Data, Node } from 'unist';
import React from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable.js';
import { VoidEmitter } from '../../utils/voidEmitter';
/**
 * The value of the {@link NestedEditorsContext} React context.
 */
export interface NestedEditorsContextValue<T extends Node> {
    /**
     * The parent lexical editor
     */
    parentEditor: LexicalEditor;
    /**
     * The parent editor config
     */
    config: EditorConfig;
    /**
     * The mdast node that is being edited
     */
    mdastNode: T;
    /**
     * The lexical node that is being edited
     */
    lexicalNode: DecoratorNode<any> & {
        /**
         * Use this method to update the mdast node. This will also update the mdast tree of the parent editor.
         */
        setMdastNode: (mdastNode: any) => void;
    };
    /**
     * Subscribe to the emitter and implement the logic to focus the custom editor.
     */
    focusEmitter: VoidEmitter;
}
/**
 * Use this context to provide the necessary values to the {@link NestedLexicalEditor} React component.
 * Place it as a wrapper in your custom lexical node decorators.
 */
export declare const NestedEditorsContext: React.Context<NestedEditorsContextValue<Node<Data>> | undefined>;
/**
 * A hook to get the current {@link NestedEditorsContext} value. Use this in your custom editor components.
 */
export declare function useNestedEditorContext<T extends Mdast.Content>(): NestedEditorsContextValue<T>;
/**
 * A hook that returns a function that can be used to update the mdast node. Use this in your custom editor components.
 */
export declare function useMdastNodeUpdater<T extends Mdast.Content>(): (node: Partial<T>) => void;
/**
 * A hook that returns a function that removes the lexical node from the editor.
 */
export declare function useLexicalNodeRemove(): () => void;
/**
 * The properties of the {@link NestedLexicalEditor} React component.
 * @typeParam T - The type of the mdast node of the editor.
 */
export interface NestedEditorProps<T extends Mdast.Content> {
    /**
     * A function that returns the phrasing content of the mdast node. In most cases, this will be the `children` property of the mdast node, but you can also have multiple nested nodes with their own children.
     */
    getContent: (mdastNode: T) => Mdast.Content[];
    /**
     * A function that should return the updated mdast node based on the original mdast node and the new content (serialized as mdast tree) produced by the editor.
     */
    getUpdatedMdastNode: (mdastNode: T, children: Mdast.Content[]) => T;
    /**
     * Props passed to the {@link https://github.com/facebook/lexical/blob/main/packages/lexical-react/src/LexicalContentEditable.tsx | ContentEditable} component.
     */
    contentEditableProps?: React.ComponentProps<typeof ContentEditable>;
    /**
     * Whether or not the editor edits blocks (multiple paragraphs)
     */
    block?: boolean;
}
/**
 * A nested editor React component that allows editing of the contents of complex markdown nodes that have nested markdown content (for example, custom directives or JSX elements). See the {@link NestedEditorProps} for more details on the compoment props.
 *
 * @example
 * You can use a type param to specify the type of the mdast node
 *
 * ```tsx
 *
 * interface CalloutDirectiveNode extends LeafDirective {
 *   name: 'callout'
 *   children: Mdast.PhrasingContent[]
 * }
 *
 * return <NestedLexicalEditor<CalloutDirectiveNode> getContent={node => node.children} getUpdatedMdastNode={(node, children) => ({ ...node, children })} />
 * ```
 */
export declare const NestedLexicalEditor: <T extends Mdast.Content>(props: NestedEditorProps<T>) => React.JSX.Element;
