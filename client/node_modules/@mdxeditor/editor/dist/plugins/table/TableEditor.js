import { ContentEditable } from "@lexical/react/LexicalContentEditable.js";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary.js";
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer.js";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin.js";
import * as RadixPopover from "@radix-ui/react-popover";
import { $createParagraphNode, createEditor, $getRoot, KEY_TAB_COMMAND, COMMAND_PRIORITY_CRITICAL, FOCUS_COMMAND, COMMAND_PRIORITY_LOW, KEY_ENTER_COMMAND, BLUR_COMMAND } from "lexical";
import React__default from "react";
import { lexicalTheme } from "../../styles/lexicalTheme.js";
import { exportLexicalTreeToMdast } from "../../exportMarkdownFromLexical.js";
import { importMdastTreeToLexical } from "../../importMarkdownToLexical.js";
import AddColumnIcon from "../../icons/add_column.svg.js";
import AddRowIcon from "../../icons/add_row.svg.js";
import DeleteSmallIcon from "../../icons/delete_small.svg.js";
import AlignCenterIcon from "../../icons/format_align_center.svg.js";
import AlignLeftIcon from "../../icons/format_align_left.svg.js";
import AlignRightIcon from "../../icons/format_align_right.svg.js";
import InsertColLeftIcon from "../../icons/insert_col_left.svg.js";
import InsertColRightIcon from "../../icons/insert_col_right.svg.js";
import InsertRowAboveIcon from "../../icons/insert_row_above.svg.js";
import InsertRowBelowIcon from "../../icons/insert_row_below.svg.js";
import MoreHorizIcon from "../../icons/more_horiz.svg.js";
import * as RadixToolbar from "@radix-ui/react-toolbar";
import classNames from "classnames";
import styles from "../../styles/ui.module.css.js";
import { corePluginHooks } from "../core/index.js";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin.js";
import { mergeRegister } from "@lexical/utils";
import { isPartOftheEditorUI } from "../../utils/isPartOftheEditorUI.js";
import { uuidv4 } from "../../utils/uuid4.js";
const AlignToTailwindClassMap = {
  center: styles.centeredCell,
  left: styles.leftAlignedCell,
  right: styles.rightAlignedCell
};
const TableEditor = ({ mdastNode, parentEditor, lexicalTable }) => {
  const [activeCell, setActiveCell] = React__default.useState(null);
  const getCellKey = React__default.useMemo(() => {
    const cellKeyMap = /* @__PURE__ */ new WeakMap();
    return (cell) => {
      if (!cellKeyMap.has(cell)) {
        cellKeyMap.set(cell, uuidv4());
      }
      return cellKeyMap.get(cell);
    };
  }, []);
  const setActiveCellWithBoundaries = React__default.useCallback(
    (cell) => {
      const colCount = lexicalTable.getColCount();
      if (cell === null) {
        setActiveCell(null);
        return;
      }
      let [colIndex, rowIndex] = cell;
      if (colIndex > colCount - 1) {
        colIndex = 0;
        rowIndex++;
      }
      if (colIndex < 0) {
        colIndex = colCount - 1;
        rowIndex -= 1;
      }
      if (rowIndex > lexicalTable.getRowCount() - 1) {
        setActiveCell(null);
        parentEditor.update(() => {
          const nextSibling = lexicalTable.getLatest().getNextSibling();
          if (nextSibling) {
            lexicalTable.getLatest().selectNext();
          } else {
            const newParagraph = $createParagraphNode();
            lexicalTable.insertAfter(newParagraph);
            newParagraph.select();
          }
        });
        return;
      }
      if (rowIndex < 0) {
        setActiveCell(null);
        parentEditor.update(() => {
          lexicalTable.getLatest().selectPrevious();
        });
        return;
      }
      setActiveCell([colIndex, rowIndex]);
    },
    [lexicalTable, parentEditor]
  );
  React__default.useEffect(() => {
    lexicalTable.focusEmitter.subscribe(setActiveCellWithBoundaries);
  }, [lexicalTable, setActiveCellWithBoundaries]);
  const addRowToBottom = React__default.useCallback(
    (e) => {
      e.preventDefault();
      parentEditor.update(() => {
        lexicalTable.addRowToBottom();
        setActiveCell([0, lexicalTable.getRowCount()]);
      });
    },
    [parentEditor, lexicalTable]
  );
  const addColumnToRight = React__default.useCallback(
    (e) => {
      e.preventDefault();
      parentEditor.update(() => {
        lexicalTable.addColumnToRight();
        setActiveCell([lexicalTable.getColCount(), 0]);
      });
    },
    [parentEditor, lexicalTable]
  );
  const [highlightedCoordinates, setHighlightedCoordinates] = React__default.useState([-1, -1]);
  const onTableMouseOver = React__default.useCallback((e) => {
    let tableCell = e.target;
    while (tableCell && !["TH", "TD"].includes(tableCell.tagName)) {
      if (tableCell === e.currentTarget) {
        return;
      }
      tableCell = tableCell.parentElement;
    }
    if (tableCell === null) {
      return;
    }
    const tableRow = tableCell.parentElement;
    const tableContainer = tableRow.parentElement;
    const colIndex = tableContainer.tagName === "TFOOT" ? -1 : Array.from(tableRow.children).indexOf(tableCell);
    const rowIndex = tableCell.tagName === "TH" ? -1 : Array.from(tableRow.parentElement.children).indexOf(tableRow);
    setHighlightedCoordinates([colIndex, rowIndex]);
  }, []);
  return /* @__PURE__ */ React__default.createElement("table", { className: styles.tableEditor, onMouseOver: onTableMouseOver, onMouseLeave: () => setHighlightedCoordinates([-1, -1]) }, /* @__PURE__ */ React__default.createElement("colgroup", null, /* @__PURE__ */ React__default.createElement("col", null), Array.from({ length: mdastNode.children[0].children.length }, (_, colIndex) => {
    const align = mdastNode.align || [];
    const currentColumnAlign = align[colIndex] || "left";
    const className = AlignToTailwindClassMap[currentColumnAlign];
    return /* @__PURE__ */ React__default.createElement("col", { key: colIndex, className });
  }), /* @__PURE__ */ React__default.createElement("col", null)), /* @__PURE__ */ React__default.createElement("thead", null, /* @__PURE__ */ React__default.createElement("tr", null, /* @__PURE__ */ React__default.createElement("th", { className: styles.tableToolsColumn, "data-tool-cell": true }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      className: styles.iconButton,
      type: "button",
      title: "Delete table",
      onClick: (e) => {
        e.preventDefault();
        parentEditor.update(() => {
          lexicalTable.selectNext();
          lexicalTable.remove();
        });
      }
    },
    /* @__PURE__ */ React__default.createElement(DeleteSmallIcon, null)
  )), Array.from({ length: mdastNode.children[0].children.length }, (_, colIndex) => {
    return /* @__PURE__ */ React__default.createElement("th", { key: colIndex, "data-tool-cell": true }, /* @__PURE__ */ React__default.createElement(
      ColumnEditor,
      {
        ...{
          setActiveCellWithBoundaries,
          parentEditor,
          colIndex,
          highlightedCoordinates,
          lexicalTable,
          align: (mdastNode.align || [])[colIndex]
        }
      }
    ));
  }), /* @__PURE__ */ React__default.createElement("th", { className: styles.tableToolsColumn }))), /* @__PURE__ */ React__default.createElement("tbody", null, mdastNode.children.map((row, rowIndex) => {
    return /* @__PURE__ */ React__default.createElement("tr", { key: rowIndex }, /* @__PURE__ */ React__default.createElement("td", { className: styles.toolCell, "data-tool-cell": true }, /* @__PURE__ */ React__default.createElement(RowEditor, { ...{ setActiveCellWithBoundaries, parentEditor, rowIndex, highlightedCoordinates, lexicalTable } })), row.children.map((mdastCell, colIndex) => {
      var _a;
      return /* @__PURE__ */ React__default.createElement(
        Cell,
        {
          align: (_a = mdastNode.align) == null ? void 0 : _a[colIndex],
          key: getCellKey(mdastCell),
          contents: mdastCell.children,
          setActiveCell: setActiveCellWithBoundaries,
          ...{
            rowIndex,
            colIndex,
            lexicalTable,
            parentEditor,
            activeCell
          }
        }
      );
    }), rowIndex === 0 && /* @__PURE__ */ React__default.createElement("th", { rowSpan: lexicalTable.getRowCount(), "data-tool-cell": true }, /* @__PURE__ */ React__default.createElement("button", { type: "button", className: styles.addColumnButton, onClick: addColumnToRight }, /* @__PURE__ */ React__default.createElement(AddColumnIcon, null))));
  })), /* @__PURE__ */ React__default.createElement("tfoot", null, /* @__PURE__ */ React__default.createElement("tr", null, /* @__PURE__ */ React__default.createElement("th", null), /* @__PURE__ */ React__default.createElement("th", { colSpan: lexicalTable.getColCount() }, /* @__PURE__ */ React__default.createElement("button", { type: "button", className: styles.addRowButton, onClick: addRowToBottom }, /* @__PURE__ */ React__default.createElement(AddRowIcon, null))), /* @__PURE__ */ React__default.createElement("th", null))));
};
const Cell = ({ align, ...props }) => {
  const { activeCell, setActiveCell } = props;
  const isActive = Boolean(activeCell && activeCell[0] === props.colIndex && activeCell[1] === props.rowIndex);
  const className = AlignToTailwindClassMap[align || "left"];
  return /* @__PURE__ */ React__default.createElement(
    "td",
    {
      className,
      "data-active": isActive,
      onClick: () => {
        setActiveCell([props.colIndex, props.rowIndex]);
      }
    },
    /* @__PURE__ */ React__default.createElement(CellEditor, { ...props, focus: isActive })
  );
};
const CellEditor = ({ focus, setActiveCell, parentEditor, lexicalTable, contents, colIndex, rowIndex }) => {
  const [importVisitors, exportVisitors, usedLexicalNodes, jsxComponentDescriptors, jsxIsAvailable, rootEditor] = corePluginHooks.useEmitterValues(
    "importVisitors",
    "exportVisitors",
    "usedLexicalNodes",
    "jsxComponentDescriptors",
    "jsxIsAvailable",
    "rootEditor"
  );
  const [editor] = React__default.useState(() => {
    const editor2 = createEditor({
      nodes: usedLexicalNodes,
      theme: lexicalTheme
    });
    editor2.update(() => {
      importMdastTreeToLexical({
        root: $getRoot(),
        mdastRoot: { type: "root", children: [{ type: "paragraph", children: contents }] },
        visitors: importVisitors
      });
    });
    return editor2;
  });
  const saveAndFocus = React__default.useCallback(
    (nextCell) => {
      editor.getEditorState().read(() => {
        const mdast = exportLexicalTreeToMdast({
          root: $getRoot(),
          jsxComponentDescriptors,
          visitors: exportVisitors,
          jsxIsAvailable
        });
        parentEditor.update(() => {
          lexicalTable.updateCellContents(colIndex, rowIndex, mdast.children[0].children);
        });
      });
      setActiveCell(nextCell);
    },
    [colIndex, editor, exportVisitors, jsxComponentDescriptors, jsxIsAvailable, lexicalTable, parentEditor, rowIndex, setActiveCell]
  );
  React__default.useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        KEY_TAB_COMMAND,
        (payload) => {
          payload.preventDefault();
          const nextCell = payload.shiftKey ? [colIndex - 1, rowIndex] : [colIndex + 1, rowIndex];
          saveAndFocus(nextCell);
          return true;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          setActiveCell([colIndex, rowIndex]);
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (payload) => {
          payload == null ? void 0 : payload.preventDefault();
          const nextCell = (payload == null ? void 0 : payload.shiftKey) ? [colIndex, rowIndex - 1] : [colIndex, rowIndex + 1];
          saveAndFocus(nextCell);
          return true;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        BLUR_COMMAND,
        (payload) => {
          const relatedTarget = payload.relatedTarget;
          if (isPartOftheEditorUI(relatedTarget, rootEditor.getRootElement())) {
            return false;
          }
          saveAndFocus(null);
          return true;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [colIndex, editor, rootEditor, rowIndex, saveAndFocus, setActiveCell]);
  React__default.useEffect(() => {
    focus && (editor == null ? void 0 : editor.focus());
  }, [focus, editor]);
  return /* @__PURE__ */ React__default.createElement(LexicalNestedComposer, { initialEditor: editor }, /* @__PURE__ */ React__default.createElement(RichTextPlugin, { contentEditable: /* @__PURE__ */ React__default.createElement(ContentEditable, null), placeholder: /* @__PURE__ */ React__default.createElement("div", null), ErrorBoundary: LexicalErrorBoundary }), /* @__PURE__ */ React__default.createElement(HistoryPlugin, null));
};
const ColumnEditor = ({
  parentEditor,
  highlightedCoordinates,
  align,
  lexicalTable,
  colIndex,
  setActiveCellWithBoundaries
}) => {
  const [editorRootElementRef] = corePluginHooks.useEmitterValues("editorRootElementRef");
  const insertColumnAt = React__default.useCallback(
    (colIndex2) => {
      parentEditor.update(() => {
        lexicalTable.insertColumnAt(colIndex2);
      });
      setActiveCellWithBoundaries([colIndex2, 0]);
    },
    [parentEditor, lexicalTable, setActiveCellWithBoundaries]
  );
  const deleteColumnAt = React__default.useCallback(
    (colIndex2) => {
      parentEditor.update(() => {
        lexicalTable.deleteColumnAt(colIndex2);
      });
    },
    [parentEditor, lexicalTable]
  );
  const setColumnAlign = React__default.useCallback(
    (colIndex2, align2) => {
      parentEditor.update(() => {
        lexicalTable.setColumnAlign(colIndex2, align2);
      });
    },
    [parentEditor, lexicalTable]
  );
  return /* @__PURE__ */ React__default.createElement(RadixPopover.Root, null, /* @__PURE__ */ React__default.createElement(
    RadixPopover.PopoverTrigger,
    {
      className: styles.tableColumnEditorTrigger,
      "data-active": highlightedCoordinates[0] === colIndex + 1,
      title: "Column menu"
    },
    /* @__PURE__ */ React__default.createElement(MoreHorizIcon, null)
  ), /* @__PURE__ */ React__default.createElement(RadixPopover.Portal, { container: editorRootElementRef == null ? void 0 : editorRootElementRef.current }, /* @__PURE__ */ React__default.createElement(
    RadixPopover.PopoverContent,
    {
      className: classNames(styles.tableColumnEditorPopoverContent),
      onOpenAutoFocus: (e) => e.preventDefault(),
      sideOffset: 5,
      side: "top"
    },
    /* @__PURE__ */ React__default.createElement(RadixToolbar.Root, { className: styles.tableColumnEditorToolbar }, /* @__PURE__ */ React__default.createElement(
      RadixToolbar.ToggleGroup,
      {
        className: styles.toggleGroupRoot,
        onValueChange: (value) => {
          setColumnAlign(colIndex, value);
        },
        value: align || "left",
        type: "single",
        "aria-label": "Text alignment"
      },
      /* @__PURE__ */ React__default.createElement(RadixToolbar.ToggleItem, { value: "left", title: "Align left" }, /* @__PURE__ */ React__default.createElement(AlignLeftIcon, null)),
      /* @__PURE__ */ React__default.createElement(RadixToolbar.ToggleItem, { value: "center", title: "Align center" }, /* @__PURE__ */ React__default.createElement(AlignCenterIcon, null)),
      /* @__PURE__ */ React__default.createElement(RadixToolbar.ToggleItem, { value: "right", title: "Align right" }, /* @__PURE__ */ React__default.createElement(AlignRightIcon, null))
    ), /* @__PURE__ */ React__default.createElement(RadixToolbar.Separator, null), /* @__PURE__ */ React__default.createElement(RadixToolbar.Button, { onClick: insertColumnAt.bind(null, colIndex), title: "Insert a column to the left of this one" }, /* @__PURE__ */ React__default.createElement(InsertColLeftIcon, null)), /* @__PURE__ */ React__default.createElement(RadixToolbar.Button, { onClick: insertColumnAt.bind(null, colIndex + 1), title: "Insert a column to the right of this one" }, /* @__PURE__ */ React__default.createElement(InsertColRightIcon, null)), /* @__PURE__ */ React__default.createElement(RadixToolbar.Button, { onClick: deleteColumnAt.bind(null, colIndex), title: "Delete this column" }, /* @__PURE__ */ React__default.createElement(DeleteSmallIcon, null)))
  )));
};
const RowEditor = ({
  parentEditor,
  highlightedCoordinates,
  lexicalTable,
  rowIndex,
  setActiveCellWithBoundaries
}) => {
  const [editorRootElementRef] = corePluginHooks.useEmitterValues("editorRootElementRef");
  const insertRowAt = React__default.useCallback(
    (rowIndex2) => {
      parentEditor.update(() => {
        lexicalTable.insertRowAt(rowIndex2);
      });
      setActiveCellWithBoundaries([0, rowIndex2]);
    },
    [parentEditor, lexicalTable, setActiveCellWithBoundaries]
  );
  const deleteRowAt = React__default.useCallback(
    (rowIndex2) => {
      parentEditor.update(() => {
        lexicalTable.deleteRowAt(rowIndex2);
      });
    },
    [parentEditor, lexicalTable]
  );
  return /* @__PURE__ */ React__default.createElement(RadixPopover.Root, null, /* @__PURE__ */ React__default.createElement(RadixPopover.PopoverTrigger, { className: styles.tableColumnEditorTrigger, "data-active": highlightedCoordinates[1] === rowIndex }, /* @__PURE__ */ React__default.createElement(MoreHorizIcon, null)), /* @__PURE__ */ React__default.createElement(RadixPopover.Portal, { container: editorRootElementRef == null ? void 0 : editorRootElementRef.current }, /* @__PURE__ */ React__default.createElement(
    RadixPopover.PopoverContent,
    {
      className: classNames(styles.tableColumnEditorPopoverContent),
      onOpenAutoFocus: (e) => e.preventDefault(),
      sideOffset: 5,
      side: "bottom"
    },
    /* @__PURE__ */ React__default.createElement(RadixToolbar.Root, { className: styles.tableColumnEditorToolbar }, /* @__PURE__ */ React__default.createElement(RadixToolbar.Button, { onClick: insertRowAt.bind(null, rowIndex), title: "Insert a row above this one" }, /* @__PURE__ */ React__default.createElement(InsertRowAboveIcon, null)), /* @__PURE__ */ React__default.createElement(RadixToolbar.Button, { onClick: insertRowAt.bind(null, rowIndex + 1), title: "Insert a row below this one" }, /* @__PURE__ */ React__default.createElement(InsertRowBelowIcon, null)), /* @__PURE__ */ React__default.createElement(RadixToolbar.Button, { onClick: deleteRowAt.bind(null, rowIndex), title: "Delete this row" }, /* @__PURE__ */ React__default.createElement(DeleteSmallIcon, null)))
  )));
};
export {
  TableEditor
};
