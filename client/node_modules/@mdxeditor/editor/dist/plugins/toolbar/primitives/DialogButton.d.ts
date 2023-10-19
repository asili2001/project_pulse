import React from 'react';
/**
 * The properties of the {@link DialogButton} component.
 */
export interface DialogButtonProps {
    /**
     * The autocomplete suggestions to show in the dialog input.
     */
    autocompleteSuggestions?: string[];
    /**
     * The callback to call when the dialog is submitted. The callback receives the value of the text input as a parameter.
     */
    onSubmit: (value: string) => void;
    /**
     * The title to show in the tooltip of the toolbar button.
     */
    tooltipTitle: string;
    /**
     * The contents of the button. Usually an icon.
     * @example
     * ```tsx
     * <DialogButton buttonContent={<CustomIcon />} />
     * ```
     */
    buttonContent?: React.ReactNode;
    /**
     * The placeholder text to show in the dialog input.
     */
    dialogInputPlaceholder: string;
    /**
     * The title of the submit button.
     */
    submitButtonTitle: string;
}
/**
 * Use this primitive to create a toolbar button that opens a dialog with a text input, autocomplete suggestions, and a submit button.
 *
 * See {@link DialogButtonProps} for the properties that can be passed to this component.
 */
export declare const DialogButton: React.ForwardRefExoticComponent<DialogButtonProps & React.RefAttributes<HTMLButtonElement>>;
