import * as Mdast from 'mdast';
import { MdastImportVisitor } from '../../importMarkdownToLexical';
import { MdxJsxTextElement, MdxJsxFlowElement } from 'mdast-util-mdx';
export declare const MdastImageVisitor: MdastImportVisitor<Mdast.Image>;
export declare const MdastHtmlImageVisitor: MdastImportVisitor<Mdast.HTML>;
export declare const MdastJsxImageVisitor: MdastImportVisitor<MdxJsxTextElement | MdxJsxFlowElement>;
