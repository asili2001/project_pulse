import React, { ReactNode } from 'react';
/**
 * A small styled wrapper around the radix-ui tooltip, that lets you display an instan tooltip on hover.
 */
export declare const TooltipWrap: React.ForwardRefExoticComponent<{
    title: string;
    children: ReactNode;
} & React.RefAttributes<HTMLButtonElement>>;
