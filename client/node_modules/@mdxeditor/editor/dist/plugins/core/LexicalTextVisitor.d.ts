import { TextNode } from 'lexical';
import * as Mdast from 'mdast';
import { LexicalExportVisitor } from '../../exportMarkdownFromLexical';
export declare function isMdastText(mdastNode: Mdast.Content): mdastNode is Mdast.Text;
export declare const LexicalTextVisitor: LexicalExportVisitor<TextNode, Mdast.Text>;
