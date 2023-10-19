import React from 'react';
/**
 * @internal
 */
export declare const SelectItem: React.ForwardRefExoticComponent<{
    className?: string | undefined;
    children: React.ReactNode;
    value: string;
} & React.RefAttributes<HTMLDivElement | null>>;
/**
 * @internal
 */
export declare const SelectTrigger: React.FC<{
    title: string;
    placeholder: string;
    className?: string;
}>;
/**
 * @internal
 */
export declare const SelectContent: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
/**
 * @internal
 */
export declare const SelectButtonTrigger: React.FC<{
    children: React.ReactNode;
    title: string;
    className?: string;
}>;
/**
 * The properties of the {@link Select} React component.
 */
export interface SelectProps<T extends string> {
    value: T;
    onChange: (value: T) => void;
    triggerTitle: string;
    placeholder: string;
    items: ({
        label: string | JSX.Element;
        value: T;
    } | 'separator')[];
}
/**
 * A toolbar primitive you can use to build dropdowns, such as the block type select.
 * See {@link SelectProps} for more details.
 */
export declare const Select: <T extends string>(props: SelectProps<T>) => React.JSX.Element;
