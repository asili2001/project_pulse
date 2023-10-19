import * as Mdast from 'mdast';
import { LexicalExportVisitor } from '../../exportMarkdownFromLexical';
import { FrontmatterNode } from './FrontmatterNode';
export declare const LexicalFrontmatterVisitor: LexicalExportVisitor<FrontmatterNode, Mdast.YAML>;
