import { TOGGLE_LINK_COMMAND, $isLinkNode } from "@lexical/link";
import { $isRangeSelection, KEY_ESCAPE_COMMAND, COMMAND_PRIORITY_LOW, KEY_MODIFIER_COMMAND, $getSelection, COMMAND_PRIORITY_HIGH } from "lexical";
import { IS_APPLE } from "../../utils/detectMac.js";
import { getSelectionRectangle, getSelectedNode } from "../../utils/lexicalHelpers.js";
import { coreSystem } from "../core/index.js";
import { LinkDialog } from "./LinkDialog.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
function getLinkNodeInSelection(selection) {
  if (!selection) {
    return null;
  }
  const node = getSelectedNode(selection);
  if (node === null) {
    return null;
  }
  const parent = node.getParent();
  if ($isLinkNode(parent)) {
    return parent;
  } else if ($isLinkNode(node)) {
    return node;
  }
  return null;
}
const linkDialogSystem = system(
  (r, [{ activeEditor, currentSelection, createActiveEditorSubscription }]) => {
    const dialogState = r.node(false);
    const onWindowChange = r.node();
    const linkDialogState = r.node({ type: "inactive" }, true);
    const updateLink = r.node();
    const cancelLinkEdit = r.node();
    const applyLinkChanges = r.node();
    const switchFromPreviewToLinkEdit = r.node();
    const removeLink = r.node();
    const openLinkEditDialog = r.node();
    const linkAutocompleteSuggestions = r.node([]);
    r.sub(
      r.pipe(
        openLinkEditDialog,
        r.o.withLatestFrom(currentSelection, activeEditor),
        r.o.filter(([, selection]) => $isRangeSelection(selection))
      ),
      ([, selection, editor]) => {
        editor == null ? void 0 : editor.getEditorState().read(() => {
          const node = getLinkNodeInSelection(selection);
          const rectangle = getSelectionRectangle(editor);
          if (node) {
            r.pub(linkDialogState, {
              type: "edit",
              initialUrl: node.getURL(),
              initialTitle: node.getTitle() || "",
              url: node.getURL(),
              title: node.getTitle() || "",
              linkNodeKey: node.getKey(),
              rectangle
            });
          } else {
            r.pub(linkDialogState, {
              type: "edit",
              initialUrl: "",
              initialTitle: "",
              title: "",
              url: "",
              linkNodeKey: "",
              rectangle
            });
          }
        });
      }
    );
    r.sub(r.pipe(removeLink, r.o.withLatestFrom(activeEditor)), ([, editor]) => {
      editor == null ? void 0 : editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    });
    r.pub(createActiveEditorSubscription, (editor) => {
      return editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          const state = r.getValue(linkDialogState);
          if (state.type === "preview") {
            r.pub(linkDialogState, { type: "inactive" });
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      );
    });
    r.pub(createActiveEditorSubscription, (editor) => {
      return editor.registerCommand(
        KEY_MODIFIER_COMMAND,
        (event) => {
          if (event.key === "k" && (IS_APPLE ? event.metaKey : event.ctrlKey)) {
            const selection = $getSelection();
            if ($isRangeSelection(selection) && (getLinkNodeInSelection(selection) || !selection.isCollapsed())) {
              r.pub(openLinkEditDialog, true);
              event.stopPropagation();
              return true;
            } else {
              return false;
            }
          }
          return false;
        },
        COMMAND_PRIORITY_HIGH
      );
    });
    r.link(
      r.pipe(
        switchFromPreviewToLinkEdit,
        r.o.withLatestFrom(linkDialogState),
        r.o.map(([, state]) => {
          if (state.type === "preview") {
            return {
              type: "edit",
              initialUrl: state.url,
              url: state.url,
              linkNodeKey: state.linkNodeKey,
              rectangle: state.rectangle
            };
          } else {
            throw new Error("Cannot switch to edit mode when not in preview mode");
          }
        })
      ),
      linkDialogState
    );
    r.sub(r.pipe(updateLink, r.o.withLatestFrom(activeEditor, linkDialogState)), ([payload, editor, state]) => {
      const url = payload.url.trim();
      const title = payload.title.trim();
      if (url.trim() !== "") {
        editor == null ? void 0 : editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url, title });
        setTimeout(() => {
          editor == null ? void 0 : editor.update(() => {
            const node = getLinkNodeInSelection($getSelection());
            node == null ? void 0 : node.setTitle(title);
          });
        });
        r.pub(linkDialogState, {
          type: "preview",
          linkNodeKey: state.linkNodeKey,
          rectangle: state.rectangle,
          url
        });
      } else {
        if (state.type === "edit" && state.initialUrl !== "") {
          editor == null ? void 0 : editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
        r.pub(linkDialogState, {
          type: "inactive"
        });
      }
    });
    r.link(
      r.pipe(
        cancelLinkEdit,
        r.o.withLatestFrom(linkDialogState, activeEditor),
        r.o.map(([, state, editor]) => {
          if (state.type === "edit") {
            editor == null ? void 0 : editor.focus();
            if (state.initialUrl === "") {
              return {
                type: "inactive"
              };
            } else {
              return {
                type: "preview",
                url: state.initialUrl,
                linkNodeKey: state.linkNodeKey,
                rectangle: state.rectangle
              };
            }
          } else {
            throw new Error("Cannot cancel edit when not in edit mode");
          }
        })
      ),
      linkDialogState
    );
    r.link(
      r.pipe(
        r.combine(currentSelection, onWindowChange),
        r.o.withLatestFrom(activeEditor, linkDialogState),
        r.o.map(([[selection], activeEditor2]) => {
          if ($isRangeSelection(selection) && activeEditor2) {
            const node = getLinkNodeInSelection(selection);
            if (node) {
              return {
                type: "preview",
                url: node.getURL(),
                linkNodeKey: node.getKey(),
                rectangle: getSelectionRectangle(activeEditor2)
              };
            } else {
              return {
                type: "inactive"
              };
            }
          } else {
            return {
              type: "inactive"
            };
          }
        })
      ),
      linkDialogState
    );
    return {
      dialogState,
      onWindowChange,
      linkDialogState,
      updateLink,
      switchFromPreviewToLinkEdit,
      cancelLinkEdit,
      removeLink,
      openLinkEditDialog,
      applyLinkChanges,
      linkAutocompleteSuggestions
    };
  },
  [coreSystem]
);
const [
  /** @internal */
  linkDialogPlugin,
  /** @internal */
  linkDialogPluginHooks
] = realmPlugin({
  id: "link-dialog",
  dependencies: ["link"],
  systemSpec: linkDialogSystem,
  applyParamsToSystem(r, params = {}) {
    r.pubKey("linkAutocompleteSuggestions", params.linkAutocompleteSuggestions || []);
  },
  init(r) {
    r.pubKey("addComposerChild", LinkDialog);
  }
});
export {
  linkDialogPlugin,
  linkDialogPluginHooks
};
