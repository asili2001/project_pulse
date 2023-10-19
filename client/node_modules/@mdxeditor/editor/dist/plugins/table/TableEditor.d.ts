import { LexicalEditor } from 'lexical';
import * as Mdast from 'mdast';
import React from 'react';
import { TableNode } from './TableNode';
export interface TableEditorProps {
    parentEditor: LexicalEditor;
    lexicalTable: TableNode;
    mdastNode: Mdast.Table;
}
export declare const TableEditor: React.FC<TableEditorProps>;
export interface CellProps {
    parentEditor: LexicalEditor;
    lexicalTable: TableNode;
    contents: Mdast.PhrasingContent[];
    colIndex: number;
    rowIndex: number;
    align?: Mdast.AlignType;
    activeCell: [number, number] | null;
    setActiveCell: (cell: [number, number] | null) => void;
    focus: boolean;
}
