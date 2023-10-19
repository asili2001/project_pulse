import React from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
export declare const DownshiftAutoComplete: React.FC<{
    suggestions: string[];
    control: Control<any, any>;
    setValue: UseFormSetValue<any>;
    placeholder: string;
    inputName: string;
    autofocus?: boolean;
    initialInputValue: string;
}>;
