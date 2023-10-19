import React from 'react';
/**
 * The properties of the {@link PropertyPopover} React component.
 */
export interface PropertyPopoverProps {
    /**
     * The properties to edit. The key is the name of the property, and the value is the initial value.
     */
    properties: Record<string, string>;
    /**
     * Triggered when the user edits the property values.
     */
    onChange: (values: Record<string, string>) => void;
    /**
     * The title to display in the popover.
     */
    title: string;
}
/**
 * A React component that can be used in custom editors to edit the properties of the node.
 * Displays a simple, static key/value editing UI in a popover.
 */
export declare const PropertyPopover: React.FC<PropertyPopoverProps>;
