import { createEmptyHistoryState } from "@lexical/react/LexicalHistoryPlugin.js";
import { $isHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $findMatchingParent, $wrapNodeInElement, $insertNodeToNearestRoot } from "@lexical/utils";
import { createCommand, SELECTION_CHANGE_COMMAND, $getRoot, COMMAND_PRIORITY_CRITICAL, $setSelection, BLUR_COMMAND, KEY_DOWN_COMMAND, $isDecoratorNode, FORMAT_TEXT_COMMAND, $isRootOrShadowRoot, $getSelection, $isRangeSelection, $insertNodes, $createParagraphNode, ParagraphNode, TextNode } from "lexical";
import { exportMarkdownFromLexical } from "../../exportMarkdownFromLexical.js";
import { importMarkdownToLexical } from "../../importMarkdownToLexical.js";
import { LexicalLinebreakVisitor } from "./LexicalLinebreakVisitor.js";
import { LexicalParagraphVisitor } from "./LexicalParagraphVisitor.js";
import { LexicalRootVisitor } from "./LexicalRootVisitor.js";
import { LexicalTextVisitor } from "./LexicalTextVisitor.js";
import { MdastFormattingVisitor } from "./MdastFormattingVisitor.js";
import { MdastInlineCodeVisitor } from "./MdastInlineCodeVisitor.js";
import { MdastParagraphVisitor } from "./MdastParagraphVisitor.js";
import { MdastRootVisitor } from "./MdastRootVisitor.js";
import { MdastTextVisitor } from "./MdastTextVisitor.js";
import { SharedHistoryPlugin } from "./SharedHistoryPlugin.js";
import { noop } from "../../utils/fp.js";
import { controlOrMeta } from "../../utils/detectMac.js";
import { MdastBreakVisitor } from "./MdastBreakVisitor.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const NESTED_EDITOR_UPDATED_COMMAND = createCommand("NESTED_EDITOR_UPDATED_COMMAND");
const coreSystem = system((r) => {
  function createAppendNodeFor(node) {
    const appendNode = r.node();
    r.link(
      r.pipe(
        appendNode,
        r.o.withLatestFrom(node),
        r.o.map(([newValue, values]) => {
          if (values.includes(newValue)) {
            return values;
          }
          return [...values, newValue];
        })
      ),
      node
    );
    return appendNode;
  }
  const rootEditor = r.node(null);
  const activeEditor = r.node(null, true);
  const contentEditableClassName = r.node("");
  const readOnly = r.node(false);
  const placeholder = r.node("");
  const autoFocus = r.node(false);
  const inFocus = r.node(false, true);
  const currentFormat = r.node(0, true);
  const applyFormat = r.node();
  const currentSelection = r.node(null);
  const activeEditorSubscriptions = r.node([]);
  const rootEditorSubscriptions = r.node([]);
  const editorInFocus = r.node(null);
  const onBlur = r.node();
  const rebind = () => r.o.scan((teardowns, [subs, activeEditorValue]) => {
    teardowns.forEach((teardown) => {
      if (!teardown) {
        throw new Error("You have a subscription that does not return a teardown");
      }
      teardown();
    });
    return activeEditorValue ? subs.map((s) => s(activeEditorValue)) : [];
  }, []);
  r.pipe(r.combine(activeEditorSubscriptions, activeEditor), rebind());
  r.pipe(r.combine(rootEditorSubscriptions, rootEditor), rebind());
  const createRootEditorSubscription = createAppendNodeFor(rootEditorSubscriptions);
  const createActiveEditorSubscription = createAppendNodeFor(activeEditorSubscriptions);
  function handleSelectionChange() {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      r.pubKeys({
        currentSelection: selection,
        currentFormat: selection.format
      });
    }
  }
  r.pub(createRootEditorSubscription, (theRootEditor) => {
    return theRootEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_, theActiveEditor) => {
        r.pubIn({
          [activeEditor.key]: theActiveEditor,
          [inFocus.key]: true
        });
        if (theActiveEditor._parentEditor === null) {
          theActiveEditor.getEditorState().read(() => {
            r.pub(editorInFocus, {
              rootNode: $getRoot(),
              editorType: "lexical"
            });
          });
        }
        handleSelectionChange();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  });
  r.pub(createRootEditorSubscription, (theRootEditor) => {
    return theRootEditor.registerUpdateListener(({ dirtyElements, dirtyLeaves, editorState }) => {
      if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
        return;
      }
      let theNewMarkdownValue;
      editorState.read(() => {
        theNewMarkdownValue = exportMarkdownFromLexical({
          root: $getRoot(),
          visitors: r.getValue(exportVisitors),
          jsxComponentDescriptors: r.getValue(jsxComponentDescriptors),
          toMarkdownExtensions: r.getValue(toMarkdownExtensions),
          toMarkdownOptions: r.getValue(toMarkdownOptions),
          jsxIsAvailable: r.getValue(jsxIsAvailable)
        });
      });
      r.pub(markdown, theNewMarkdownValue.trim());
    });
  });
  const initialMarkdown = r.node("");
  const markdown = r.node("", true);
  r.link(initialMarkdown, markdown);
  const importVisitors = r.node([]);
  const syntaxExtensions = r.node([]);
  const mdastExtensions = r.node([]);
  const usedLexicalNodes = r.node([]);
  const exportVisitors = r.node([]);
  const toMarkdownExtensions = r.node([]);
  const toMarkdownOptions = r.node({}, true);
  const jsxIsAvailable = r.node(false);
  const jsxComponentDescriptors = r.node([]);
  const editorRootElementRef = r.node(null);
  const addLexicalNode = createAppendNodeFor(usedLexicalNodes);
  const addImportVisitor = createAppendNodeFor(importVisitors);
  const addSyntaxExtension = createAppendNodeFor(syntaxExtensions);
  const addMdastExtension = createAppendNodeFor(mdastExtensions);
  const addExportVisitor = createAppendNodeFor(exportVisitors);
  const addToMarkdownExtension = createAppendNodeFor(toMarkdownExtensions);
  const setMarkdown = r.node();
  r.sub(
    r.pipe(setMarkdown, r.o.withLatestFrom(rootEditor, importVisitors, mdastExtensions, syntaxExtensions, inFocus)),
    ([theNewMarkdownValue, editor, importVisitors2, mdastExtensions2, syntaxExtensions2, inFocus2]) => {
      editor == null ? void 0 : editor.update(() => {
        $getRoot().clear();
        importMarkdownToLexical({
          root: $getRoot(),
          visitors: importVisitors2,
          mdastExtensions: mdastExtensions2,
          markdown: theNewMarkdownValue,
          syntaxExtensions: syntaxExtensions2
        });
        if (!inFocus2) {
          $setSelection(null);
        }
      });
    }
  );
  const initialRootEditorState = r.node((theRootEditor) => {
    r.pub(rootEditor, theRootEditor);
    r.pub(activeEditor, theRootEditor);
    importMarkdownToLexical({
      root: $getRoot(),
      visitors: r.getValue(importVisitors),
      mdastExtensions: r.getValue(mdastExtensions),
      markdown: r.getValue(initialMarkdown),
      syntaxExtensions: r.getValue(syntaxExtensions)
    });
    const autoFocusValue = r.getValue(autoFocus);
    if (autoFocusValue) {
      if (autoFocusValue === true) {
        setTimeout(() => theRootEditor.focus(noop, { defaultSelection: "rootStart" }));
        return;
      }
      setTimeout(
        () => theRootEditor.focus(noop, {
          defaultSelection: autoFocusValue.defaultSelection ?? "rootStart"
        })
      );
    }
  });
  r.pub(createActiveEditorSubscription, (editor) => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        handleSelectionChange();
      });
    });
  });
  r.pub(createActiveEditorSubscription, (theEditor) => {
    return theEditor.registerCommand(
      BLUR_COMMAND,
      (payload) => {
        var _a;
        const theRootEditor = r.getValue(rootEditor);
        if (theRootEditor) {
          const movingOutside = !((_a = theRootEditor.getRootElement()) == null ? void 0 : _a.contains(payload.relatedTarget));
          if (movingOutside) {
            r.pubIn({
              [inFocus.key]: false,
              [onBlur.key]: payload
            });
          }
        }
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  });
  r.pub(createRootEditorSubscription, (theRootEditor) => {
    return theRootEditor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        const { keyCode, ctrlKey, metaKey } = event;
        if (keyCode === 65 && controlOrMeta(metaKey, ctrlKey)) {
          let shouldOverride = false;
          theRootEditor.getEditorState().read(() => {
            shouldOverride = $isDecoratorNode($getRoot().getFirstChild()) || $isDecoratorNode($getRoot().getLastChild());
          });
          if (shouldOverride) {
            event.preventDefault();
            event.stopImmediatePropagation();
            theRootEditor.update(() => {
              var _a;
              const rootElement = theRootEditor.getRootElement();
              (_a = window.getSelection()) == null ? void 0 : _a.selectAllChildren(rootElement);
              rootElement.focus({
                preventScroll: true
              });
            });
            return true;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  });
  const composerChildren = r.node([]);
  const addComposerChild = createAppendNodeFor(composerChildren);
  const topAreaChildren = r.node([]);
  const addTopAreaChild = createAppendNodeFor(topAreaChildren);
  const editorWrappers = r.node([]);
  const addEditorWrapper = createAppendNodeFor(editorWrappers);
  const nestedEditorChildren = r.node([]);
  const addNestedEditorChild = createAppendNodeFor(nestedEditorChildren);
  const historyState = r.node(createEmptyHistoryState());
  r.sub(r.pipe(applyFormat, r.o.withLatestFrom(activeEditor)), ([format, theEditor]) => {
    theEditor == null ? void 0 : theEditor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  });
  const currentBlockType = r.node("");
  const applyBlockType = r.node();
  r.sub(r.pipe(currentSelection, r.o.withLatestFrom(activeEditor)), ([selection, theEditor]) => {
    if (!selection || !theEditor) {
      return;
    }
    const anchorNode = selection.anchor.getNode();
    let element = anchorNode.getKey() === "root" ? anchorNode : $findMatchingParent(anchorNode, (e) => {
      const parent = e.getParent();
      return parent !== null && $isRootOrShadowRoot(parent);
    });
    if (element === null) {
      element = anchorNode.getTopLevelElementOrThrow();
    }
    const elementKey = element.getKey();
    const elementDOM = theEditor.getElementByKey(elementKey);
    if (elementDOM !== null) {
      const blockType = $isHeadingNode(element) ? element.getTag() : element.getType();
      r.pub(currentBlockType, blockType);
    }
  });
  const convertSelectionToNode = r.node();
  r.sub(r.pipe(convertSelectionToNode, r.o.withLatestFrom(activeEditor)), ([factory, editor]) => {
    editor == null ? void 0 : editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, factory);
        setTimeout(() => {
          editor.focus();
        });
      }
    });
  });
  const insertDecoratorNode = r.node();
  r.sub(r.pipe(insertDecoratorNode, r.o.withLatestFrom(activeEditor)), ([nodeFactory, theEditor]) => {
    theEditor == null ? void 0 : theEditor.focus(
      () => {
        theEditor.getEditorState().read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const focusNode = selection.focus.getNode();
            if (focusNode !== null) {
              theEditor.update(() => {
                const node = nodeFactory();
                if (node.isInline()) {
                  $insertNodes([node]);
                  if ($isRootOrShadowRoot(node.getParentOrThrow())) {
                    $wrapNodeInElement(node, $createParagraphNode).selectEnd();
                  }
                } else {
                  $insertNodeToNearestRoot(node);
                }
                if (Object.hasOwn(node, "select") && typeof node.select === "function") {
                  setTimeout(() => node.select());
                }
              });
            }
          }
        });
      },
      { defaultSelection: "rootEnd" }
    );
  });
  r.sub(r.pipe(readOnly, r.o.withLatestFrom(rootEditor)), ([readOnly2, theRootEditor]) => {
    theRootEditor == null ? void 0 : theRootEditor.setEditable(!readOnly2);
  });
  return {
    // state
    activeEditor,
    inFocus,
    historyState,
    currentSelection,
    // jsx
    jsxIsAvailable,
    jsxComponentDescriptors,
    // lexical editor
    initialRootEditorState,
    rootEditor,
    createRootEditorSubscription,
    createActiveEditorSubscription,
    // import
    importVisitors,
    syntaxExtensions,
    mdastExtensions,
    usedLexicalNodes,
    addImportVisitor,
    addLexicalNode,
    addSyntaxExtension,
    addMdastExtension,
    // export
    toMarkdownExtensions,
    toMarkdownOptions,
    addToMarkdownExtension,
    addExportVisitor,
    exportVisitors,
    // markdown strings
    initialMarkdown,
    setMarkdown,
    markdown,
    // DOM
    editorRootElementRef,
    contentEditableClassName,
    placeholder,
    autoFocus,
    readOnly,
    // child controls
    composerChildren,
    addComposerChild,
    topAreaChildren,
    addTopAreaChild,
    nestedEditorChildren,
    addNestedEditorChild,
    editorWrappers,
    addEditorWrapper,
    // editor content state and commands
    currentFormat,
    editorInFocus,
    applyFormat,
    currentBlockType,
    applyBlockType,
    convertSelectionToNode,
    insertDecoratorNode,
    // Events
    onBlur
  };
}, []);
const [
  /** @internal */
  corePlugin,
  /** @internal */
  corePluginHooks
] = realmPlugin({
  id: "core",
  systemSpec: coreSystem,
  applyParamsToSystem(realm, params) {
    realm.pubKeys({
      contentEditableClassName: params.contentEditableClassName,
      toMarkdownOptions: params.toMarkdownOptions,
      autoFocus: params.autoFocus,
      placeholder: params.placeholder,
      readOnly: params.readOnly
    });
    realm.singletonSubKey("markdown", params.onChange);
    realm.singletonSubKey("onBlur", params.onBlur);
  },
  init(realm, params) {
    realm.pubKey("initialMarkdown", params.initialMarkdown.trim());
    realm.pubKey("addImportVisitor", MdastRootVisitor);
    realm.pubKey("addImportVisitor", MdastParagraphVisitor);
    realm.pubKey("addImportVisitor", MdastTextVisitor);
    realm.pubKey("addImportVisitor", MdastFormattingVisitor);
    realm.pubKey("addImportVisitor", MdastInlineCodeVisitor);
    realm.pubKey("addImportVisitor", MdastBreakVisitor);
    realm.pubKey("addLexicalNode", ParagraphNode);
    realm.pubKey("addLexicalNode", TextNode);
    realm.pubKey("addExportVisitor", LexicalRootVisitor);
    realm.pubKey("addExportVisitor", LexicalParagraphVisitor);
    realm.pubKey("addExportVisitor", LexicalTextVisitor);
    realm.pubKey("addExportVisitor", LexicalLinebreakVisitor);
    realm.pubKey("addComposerChild", SharedHistoryPlugin);
  }
});
export {
  NESTED_EDITOR_UPDATED_COMMAND,
  corePlugin,
  corePluginHooks,
  coreSystem
};
