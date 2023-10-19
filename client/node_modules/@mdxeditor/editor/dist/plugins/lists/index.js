import { coreSystem } from "../core/index.js";
import { MdastListVisitor } from "./MdastListVisitor.js";
import { MdastListItemVisitor } from "./MdastListItemVisitor.js";
import { LexicalListVisitor } from "./LexicalListVisitor.js";
import { LexicalListItemVisitor } from "./LexicalListItemVisitor.js";
import { $isListNode, ListNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND, ListItemNode, $getListDepth, $isListItemNode } from "@lexical/list";
import { $isRootOrShadowRoot, INDENT_CONTENT_COMMAND, COMMAND_PRIORITY_CRITICAL, $getSelection, $isRangeSelection, $isElementNode } from "lexical";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin.js";
import { ListPlugin } from "@lexical/react/LexicalListPlugin.js";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const ListTypeCommandMap = /* @__PURE__ */ new Map([
  ["number", INSERT_ORDERED_LIST_COMMAND],
  ["bullet", INSERT_UNORDERED_LIST_COMMAND],
  ["", REMOVE_LIST_COMMAND]
]);
const listsSystem = system(
  (r, [{ activeEditor, currentSelection }]) => {
    const currentListType = r.node("");
    const applyListType = r.node();
    r.sub(r.pipe(applyListType, r.o.withLatestFrom(activeEditor)), ([listType, theEditor]) => {
      theEditor == null ? void 0 : theEditor.dispatchCommand(ListTypeCommandMap.get(listType), void 0);
    });
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
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          r.pub(currentListType, type);
        } else {
          r.pub(currentListType, null);
        }
      }
    });
    return { currentListType, applyListType };
  },
  [coreSystem]
);
const [
  /** @internal */
  listsPlugin,
  /** @internal */
  listsPluginHooks
] = realmPlugin({
  id: "lists",
  systemSpec: listsSystem,
  init: (realm) => {
    var _a;
    realm.pubKey("addImportVisitor", MdastListVisitor);
    realm.pubKey("addImportVisitor", MdastListItemVisitor);
    realm.pubKey("addLexicalNode", ListItemNode);
    realm.pubKey("addLexicalNode", ListNode);
    realm.pubKey("addExportVisitor", LexicalListVisitor);
    realm.pubKey("addExportVisitor", LexicalListItemVisitor);
    (_a = realm.getKeyValue("rootEditor")) == null ? void 0 : _a.registerCommand(INDENT_CONTENT_COMMAND, () => !isIndentPermitted(7), COMMAND_PRIORITY_CRITICAL);
    realm.pubKey("addComposerChild", TabIndentationPlugin);
    realm.pubKey("addComposerChild", ListPlugin);
  }
});
function getElementNodesInSelection(selection) {
  const nodesInSelection = selection.getNodes();
  if (nodesInSelection.length === 0) {
    return /* @__PURE__ */ new Set([selection.anchor.getNode().getParentOrThrow(), selection.focus.getNode().getParentOrThrow()]);
  }
  return new Set(nodesInSelection.map((n) => $isElementNode(n) ? n : n.getParentOrThrow()));
}
function isIndentPermitted(maxDepth) {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) {
    return false;
  }
  const elementNodesInSelection = getElementNodesInSelection(selection);
  let totalDepth = 0;
  for (const elementNode of elementNodesInSelection) {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth);
    } else if ($isListItemNode(elementNode)) {
      const parent = elementNode.getParent();
      if ((parent == null ? void 0 : parent.getChildren().length) === 1) {
        const grandParentListItem = parent == null ? void 0 : parent.getParent();
        if ($isListItemNode(grandParentListItem) && grandParentListItem.getChildren().length === 1) {
          return false;
        }
      }
      if (!$isListNode(parent)) {
        throw new Error("ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.");
      }
      totalDepth = Math.max($getListDepth(parent) + 1, totalDepth);
    }
  }
  return totalDepth <= maxDepth;
}
export {
  listsPlugin,
  listsPluginHooks,
  listsSystem
};
