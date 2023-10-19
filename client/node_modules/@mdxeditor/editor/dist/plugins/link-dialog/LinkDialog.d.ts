import React from 'react';
import { LexicalCommand } from 'lexical';
export declare const OPEN_LINK_DIALOG: LexicalCommand<undefined>;
interface LinkEditFormProps {
    url: string;
    title: string;
    onSubmit: (link: {
        url: string;
        title: string;
    }) => void;
    onCancel: () => void;
    linkAutocompleteSuggestions: string[];
}
export declare function LinkEditForm({ url, title, onSubmit, onCancel, linkAutocompleteSuggestions }: LinkEditFormProps): React.JSX.Element;
export declare const LinkDialog: React.FC;
export {};
