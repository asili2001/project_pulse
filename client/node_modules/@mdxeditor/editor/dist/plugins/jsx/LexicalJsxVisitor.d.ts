import { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx';
import { LexicalJsxNode } from './LexicalJsxNode';
import { LexicalExportVisitor } from '../../exportMarkdownFromLexical';
export declare const LexicalJsxVisitor: LexicalExportVisitor<LexicalJsxNode, MdxJsxFlowElement | MdxJsxTextElement>;
