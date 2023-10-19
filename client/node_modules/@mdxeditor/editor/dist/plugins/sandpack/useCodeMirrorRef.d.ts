import { CodeMirrorRef } from '@codesandbox/sandpack-react/dist/components/CodeEditor/CodeMirror';
import React from 'react';
import { VoidEmitter } from '../../utils/voidEmitter';
export declare function useCodeMirrorRef(nodeKey: string, editorType: 'codeblock' | 'sandpack', language: string, focusEmitter: VoidEmitter): React.RefObject<CodeMirrorRef>;
