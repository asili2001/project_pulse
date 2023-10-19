import * as Mdast from 'mdast';
import { MdxJsxTextElement } from 'mdast-util-mdx';
import { MdastImportVisitor } from '../../importMarkdownToLexical';
export declare const MdastFormattingVisitor: MdastImportVisitor<Mdast.Emphasis | Mdast.Strong | MdxJsxTextElement>;
