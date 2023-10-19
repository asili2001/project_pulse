import React from 'react';
import { RealmPluginInitializer } from './gurx';
import { ToMarkdownOptions } from './exportMarkdownFromLexical';
/**
 * The properties of the {@link MDXEditor} React component.
 */
export interface MDXEditorProps {
    /**
     * the CSS class to apply to the content editable element of the editor.
     * Use this to style the various content elements like lists and blockquotes.
     */
    contentEditableClassName?: string;
    /**
     * The markdown to edit. Notice that this is read only when the component is mounted.
     * To change the component content dynamically, use the `MDXEditorMethods.setMarkdown` method.
     */
    markdown: string;
    /**
     * Triggered when the editor value changes. The callback is not throttled, you can use any throttling mechanism
     * if you intend to do auto-saving.
     */
    onChange?: (markdown: string) => void;
    /**
     * The markdown options used to generate the resulting markdown.
     * See {@link https://github.com/syntax-tree/mdast-util-to-markdown#options | the mdast-util-to-markdown docs} for the full list of options.
     */
    toMarkdownOptions?: ToMarkdownOptions;
    /**
     * The plugins to use in the editor.
     */
    plugins?: React.ComponentProps<typeof RealmPluginInitializer>['plugins'];
    /**
     * The class name to apply to the root component element. Use this if you want to change the editor dimensions, maximum height, etc.
     * For a content-specific styling, Use `contentEditableClassName` property.
     */
    className?: string;
    /**
     * pass if you would like to have the editor automatically focused when mounted.
     */
    autoFocus?: boolean | {
        defaultSelection?: 'rootStart' | 'rootEnd';
        preventScroll?: boolean;
    };
    /**
     * Triggered when focus leaves the editor
     */
    onBlur?: (e: FocusEvent) => void;
    /**
     * The placeholder contents, displayed when the editor is empty.
     */
    placeholder?: React.ReactNode;
    /**
     * pass if you would like to have the editor in read-only mode.
     * Note: Don't use this mode to render content for consumption - render the markdown using a library of your choice instead.
     */
    readOnly?: boolean;
}
/**
 * The interface for the {@link MDXEditor} object reference.
 *
 * @example
 * ```tsx
 *  const mdxEditorRef = React.useRef<MDXEditorMethods>(null)
 *  <MDXEditor ref={mdxEditorRef} />
 * ```
 */
export interface MDXEditorMethods {
    /**
     * Gets the current markdown value.
     */
    getMarkdown: () => string;
    /**
     * Updates the markdown value of the editor.
     */
    setMarkdown: (value: string) => void;
    /**
     * Sets focus on input
     */
    focus: (callbackFn?: (() => void) | undefined, opts?: {
        defaultSelection?: 'rootStart' | 'rootEnd';
        preventScroll?: boolean;
    }) => void;
}
/**
 * The MDXEditor React component. See {@link MDXEditorProps} for the list of properties supported and the {@link MDXEditorMethods} for the methods accessible through the ref.
 */
export declare const MDXEditor: React.ForwardRefExoticComponent<MDXEditorProps & React.RefAttributes<MDXEditorMethods>>;
