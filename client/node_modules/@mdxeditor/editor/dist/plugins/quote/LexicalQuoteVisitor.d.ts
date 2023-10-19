import { QuoteNode } from '@lexical/rich-text';
import * as Mdast from 'mdast';
import { LexicalExportVisitor } from '../../exportMarkdownFromLexical';
export declare const LexicalQuoteVisitor: LexicalExportVisitor<QuoteNode, Mdast.Blockquote>;
