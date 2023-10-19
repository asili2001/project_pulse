import * as RadixToolbar from '@radix-ui/react-toolbar';
import React from 'react';
import { EditorInFocus } from '../../core';
/**
 * @internal
 */
export declare const Root: React.FC<{
    readOnly: boolean;
    children: React.ReactNode;
}>;
/**
 * A toolbar button primitive.
 */
export declare const Button: React.ForwardRefExoticComponent<Omit<RadixToolbar.ToolbarButtonProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<object>>;
/**
 * A toolbar button with a custom toolbar primitive.
 */
export declare const ButtonWithTooltip: ({ title, children, ...props }: Omit<RadixToolbar.ToolbarButtonProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<object> & {
    title: string;
}) => React.JSX.Element;
/**
 * @internal
 */
export declare const ToolbarToggleItem: React.ForwardRefExoticComponent<Omit<RadixToolbar.ToolbarToggleItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<object>>;
/**
 * @internal
 */
export declare const SingleToggleGroup: React.ForwardRefExoticComponent<(Omit<RadixToolbar.ToolbarToggleGroupSingleProps & React.RefAttributes<HTMLDivElement>, "ref"> | Omit<RadixToolbar.ToolbarToggleGroupMultipleProps & React.RefAttributes<HTMLDivElement>, "ref">) & React.RefAttributes<object>>;
/**
 * @internal
 */
export declare const ToggleSingleGroupWithItem: React.ForwardRefExoticComponent<Omit<RadixToolbar.ToolbarToggleGroupSingleProps, "type"> & {
    on: boolean;
    title: string;
    disabled?: boolean | undefined;
} & React.RefAttributes<HTMLDivElement>>;
/**
 * A toolbar primitive that allows you to build an UI with multiple non-exclusive toggle groups, like the bold/italic/underline toggle.
 */
export declare const MultipleChoiceToggleGroup: React.FC<{
    items: {
        title: string;
        contents: React.ReactNode;
        active: boolean;
        onChange: (active: boolean) => void;
        disabled?: boolean;
    }[];
}>;
/**
 * The properties of the {@link SingleChoiceToggleGroup} React component.
 */
export interface SingleChoiceToggleGroupProps<T extends string> {
    items: {
        title: string;
        value: T;
        contents: React.ReactNode;
    }[];
    onChange: (value: T) => void;
    value: T;
    className?: string;
}
/**
 * A toolbar primitive that allows you to build an UI with multiple exclusive toggle groups, like the list type toggle.
 */
export declare const SingleChoiceToggleGroup: <T extends string>({ value, onChange, className, items }: SingleChoiceToggleGroupProps<T>) => React.JSX.Element;
/**
 * The properties of the {@link ButtonOrDropdownButton} React component.
 */
export interface ButtonOrDropdownButtonProps<T extends string> {
    /**
     * The contents of the button - usually an icon.
     */
    children: React.ReactNode;
    /**
     * The title used for the tooltip.
     */
    title: string;
    /**
     * The function to execute when the button is clicked or an item is chosen from the dropdown.
     * If there is only one item in the dropdown, the value will be an empty string.
     */
    onChoose: (value: T) => void;
    /**
     * The items to show in the dropdown.
     */
    items: {
        /**
         * The value to pass to the `onChoose` function when this item is chosen.
         */
        value: T;
        /**
         * The label to show in the dropdown.
         */
        label: string | JSX.Element;
    }[];
}
/**
 * Use this primitive to create a toolbar button that can be either a button or a dropdown, depending on the number of items passed.
 *
 * @see {@link ButtonOrDropdownButtonProps} for the properties of the React component.
 */
export declare const ButtonOrDropdownButton: <T extends string>(props: ButtonOrDropdownButtonProps<T>) => React.JSX.Element;
/**
 * An object that describes a possible option to be displayed in the {@link ConditionalContents} component.
 */
export type ConditionalContentsOption = {
    /**
     * A function that returns `true` if the option should be displayed for the current editor in focus.
     */
    when: (rootNode: EditorInFocus | null) => boolean;
    /**
     * The contents to display if the `when` function returns `true`.
     */
    contents: () => React.ReactNode;
};
/**
 * A default option to be displayed in the {@link ConditionalContents} component if none of the other options match.
 */
export type FallBackOption = {
    /**
     * The contents to display
     */
    fallback: () => React.ReactNode;
};
/**
 * The properties of the {@link ConditionalContents} React component.
 */
export interface ConditionalContentsProps {
    /**
     * A set of options that define the contents to show based on the editor that is in focus.
     * Can be either a {@link ConditionalContentsOption} or a {@link FallBackOption}.
     * See the {@link ConditionalContents} documentation for an example.
     */
    options: (ConditionalContentsOption | FallBackOption)[];
}
/**
 * A toolbar primitive that allows you to show different contents based on the editor that is in focus.
 * Useful for code editors that have different features and don't support rich text formatting.
 * @example
 * ```tsx
 *    <ConditionalContents
 *      options={[
 *        { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
 *        { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
 *        {
 *          fallback: () => (
 *            <>
 *              <UndoRedo />
 *              <BoldItalicUnderlineToggles />
 *              <InsertCodeBlock />
 *            </>
 *          )
 *        }
 *      ]}
 *    />
 * ```
 */
export declare const ConditionalContents: React.FC<ConditionalContentsProps>;
/**
 * A toolbar primitive that allows you to show a separator between toolbar items.
 * By default, the separator is styled as vertical line.
 */
export declare const Separator: React.ForwardRefExoticComponent<RadixToolbar.ToolbarSeparatorProps & React.RefAttributes<HTMLDivElement>>;
