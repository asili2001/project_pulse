import * as Mdast from 'mdast';
import { CodeBlockNode } from './CodeBlockNode';
import { LexicalExportVisitor } from '../../exportMarkdownFromLexical';
export declare const CodeBlockVisitor: LexicalExportVisitor<CodeBlockNode, Mdast.Code>;
