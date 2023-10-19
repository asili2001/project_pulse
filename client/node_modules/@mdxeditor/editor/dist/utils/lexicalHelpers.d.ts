import { ElementNode, LexicalEditor, RangeSelection, TextNode } from 'lexical';
import { ExportMarkdownFromLexicalOptions } from '../exportMarkdownFromLexical';
export declare function fromWithinEditorRead<T>(editor: LexicalEditor, fn: () => T): T;
export declare function getSelectedNode(selection: RangeSelection): TextNode | ElementNode | null;
export declare function getSelectionRectangle(editor: LexicalEditor): {
    top: number;
    left: number;
    width: number;
    height: number;
} | null;
export declare function getStateAsMarkdown(editor: LexicalEditor, exportParams: Omit<ExportMarkdownFromLexicalOptions, 'root'>): string;
