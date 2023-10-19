/// <reference types="react" />
import { DecoratorNode, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
import * as Mdast from 'mdast';
/**
 * A serialized representation of a {@link TableNode}.
 */
export type SerializedTableNode = Spread<{
    mdastNode: Mdast.Table;
}, SerializedLexicalNode>;
type CoordinatesSubscription = (coords: [colIndex: number, rowIndex: number]) => void;
/**
 * A lexical node that represents a table, with features specific to the markdown tables.
 * Use {@link "$createTableNode"} to construct one.
 */
export declare class TableNode extends DecoratorNode<JSX.Element> {
    __mdastNode: Mdast.Table;
    focusEmitter: {
        publish: (coords: [colIndex: number, rowIndex: number]) => void;
        subscribe: (cb: CoordinatesSubscription) => void;
    };
    static getType(): string;
    static clone(node: TableNode): TableNode;
    static importJSON(serializedNode: SerializedTableNode): TableNode;
    exportJSON(): SerializedTableNode;
    getMdastNode(): Mdast.Table;
    getRowCount(): number;
    getColCount(): number;
    constructor(mdastNode?: Mdast.Table, key?: NodeKey);
    createDOM(): HTMLElement;
    updateDOM(): false;
    updateCellContents(colIndex: number, rowIndex: number, children: Mdast.PhrasingContent[]): void;
    insertColumnAt(colIndex: number): void;
    deleteColumnAt(colIndex: number): void;
    insertRowAt(y: number): void;
    deleteRowAt(rowIndex: number): void;
    addRowToBottom(): void;
    addColumnToRight(): void;
    setColumnAlign(colIndex: number, align: Mdast.AlignType): void;
    decorate(parentEditor: LexicalEditor): JSX.Element;
    select(coords?: [colIndex: number, rowIndex: number]): void;
    isInline(): false;
}
/**
 * Retruns true if the given node is a {@link TableNode}.
 */
export declare function $isTableNode(node: LexicalNode | null | undefined): node is TableNode;
/**
 * Creates a {@link TableNode}
 * @param mdastNode - The mdast node to create the {@link TableNode} from.
 */
export declare function $createTableNode(mdastNode: Mdast.Table): TableNode;
export {};
