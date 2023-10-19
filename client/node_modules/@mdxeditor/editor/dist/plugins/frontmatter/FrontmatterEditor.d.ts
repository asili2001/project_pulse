import React from 'react';
export interface FrontmatterEditorProps {
    yaml: string;
    onChange: (yaml: string) => void;
}
export declare const FrontmatterEditor: ({ yaml, onChange }: FrontmatterEditorProps) => React.JSX.Element;
