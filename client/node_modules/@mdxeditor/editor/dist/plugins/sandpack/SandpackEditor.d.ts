import React from 'react';
import { SandpackPreset } from '.';
import { CodeBlockEditorProps } from '../codeblock';
export interface SandpackEditorProps extends CodeBlockEditorProps {
    preset: SandpackPreset;
}
export declare const SandpackEditor: ({ nodeKey, code, focusEmitter, preset }: SandpackEditorProps) => React.JSX.Element;
