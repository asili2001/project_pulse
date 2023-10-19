import { $wrapNodeInElement } from "@lexical/utils";
import { $getNodeByKey, $insertNodes, $isRootOrShadowRoot, $createParagraphNode, COMMAND_PRIORITY_EDITOR, DRAGSTART_COMMAND, COMMAND_PRIORITY_HIGH, DRAGOVER_COMMAND, COMMAND_PRIORITY_LOW, DROP_COMMAND, PASTE_COMMAND, COMMAND_PRIORITY_CRITICAL, createCommand, $createRangeSelection, $setSelection, $getSelection, $isNodeSelection } from "lexical";
import { coreSystem } from "../core/index.js";
import { $createImageNode, $isImageNode, ImageNode } from "./ImageNode.js";
import { LexicalImageVisitor } from "./LexicalImageVisitor.js";
import { MdastImageVisitor, MdastHtmlImageVisitor, MdastJsxImageVisitor } from "./MdastImageVisitor.js";
import { CAN_USE_DOM } from "../../utils/detectMac.js";
import { ImageDialog } from "./ImageDialog.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const imageSystem = system(
  (r, [{ rootEditor }]) => {
    const insertImage = r.node();
    const imageAutocompleteSuggestions = r.node([]);
    const disableImageResize = r.node(false);
    const imageUploadHandler = r.node(null);
    const imagePreviewHandler = r.node(null);
    const imageDialogState = r.node({ type: "inactive" });
    const openNewImageDialog = r.node();
    const openEditImageDialog = r.node();
    const closeImageDialog = r.node();
    const saveImage = r.node();
    r.link(r.pipe(closeImageDialog, r.o.mapTo({ type: "inactive" })), imageDialogState);
    r.link(r.pipe(openNewImageDialog, r.o.mapTo({ type: "new" })), imageDialogState);
    r.link(
      r.pipe(
        openEditImageDialog,
        r.o.map((payload) => ({ type: "editing", ...payload }))
      ),
      imageDialogState
    );
    r.sub(
      r.pipe(saveImage, r.o.withLatestFrom(rootEditor, imageUploadHandler, imageDialogState)),
      ([values, theEditor, imageUploadHandler2, dialogState]) => {
        const handler = dialogState.type === "editing" ? (src) => {
          theEditor == null ? void 0 : theEditor.update(() => {
            const { nodeKey } = dialogState;
            const imageNode = $getNodeByKey(nodeKey);
            imageNode.setTitle(values.title);
            imageNode.setAltText(values.altText);
            imageNode.setSrc(src);
          });
          r.pub(imageDialogState, { type: "inactive" });
        } : (src) => {
          theEditor == null ? void 0 : theEditor.update(() => {
            const imageNode = $createImageNode({ altText: values.altText ?? "", src, title: values.title ?? "" });
            $insertNodes([imageNode]);
            if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
              $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
            }
          });
          r.pub(imageDialogState, { type: "inactive" });
        };
        if (values.file.length > 0) {
          imageUploadHandler2 == null ? void 0 : imageUploadHandler2(values.file.item(0)).then(handler).catch((e) => {
            throw e;
          });
        } else if (values.src) {
          handler(values.src);
        }
      }
    );
    r.sub(rootEditor, (editor) => {
      editor == null ? void 0 : editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      );
      const theUploadHandler = r.getValue(imageUploadHandler);
      editor == null ? void 0 : editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          return onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH
      );
      editor == null ? void 0 : editor.registerCommand(
        DRAGOVER_COMMAND,
        (event) => {
          return onDragover(event);
        },
        COMMAND_PRIORITY_LOW
      );
      editor == null ? void 0 : editor.registerCommand(
        DROP_COMMAND,
        (event) => {
          return onDrop(event, editor, r.getValue(imageUploadHandler));
        },
        COMMAND_PRIORITY_HIGH
      );
      if (theUploadHandler === null) {
        return;
      }
      editor == null ? void 0 : editor.registerCommand(
        PASTE_COMMAND,
        (event) => {
          var _a;
          let cbPayload = Array.from(((_a = event.clipboardData) == null ? void 0 : _a.items) || []);
          cbPayload = cbPayload.filter((i) => /image/.test(i.type));
          if (!cbPayload.length || cbPayload.length === 0) {
            return false;
          }
          const imageUploadHandlerValue = r.getValue(imageUploadHandler);
          Promise.all(cbPayload.map((file) => imageUploadHandlerValue(file.getAsFile()))).then((urls) => {
            urls.forEach((url) => {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                src: url,
                altText: ""
              });
            });
          }).catch((e) => {
            throw e;
          });
          return true;
        },
        COMMAND_PRIORITY_CRITICAL
      );
    });
    return {
      imageDialogState,
      saveImage,
      openNewImageDialog,
      openEditImageDialog,
      closeImageDialog,
      imageUploadHandler,
      imageAutocompleteSuggestions,
      disableImageResize,
      insertImage,
      imagePreviewHandler
    };
  },
  [coreSystem]
);
const [
  /** @internal */
  imagePlugin,
  /** @internal */
  imagePluginHooks
] = realmPlugin({
  id: "image",
  systemSpec: imageSystem,
  applyParamsToSystem: (realm, params) => {
    realm.pubKey("imageUploadHandler", (params == null ? void 0 : params.imageUploadHandler) || null);
    realm.pubKey("imageAutocompleteSuggestions", (params == null ? void 0 : params.imageAutocompleteSuggestions) || []);
    realm.pubKey("disableImageResize", Boolean(params == null ? void 0 : params.disableImageResize));
    realm.pubKey("imagePreviewHandler", (params == null ? void 0 : params.imagePreviewHandler) || null);
  },
  init: (realm) => {
    realm.pubKey("addImportVisitor", MdastImageVisitor);
    realm.pubKey("addImportVisitor", MdastHtmlImageVisitor);
    realm.pubKey("addImportVisitor", MdastJsxImageVisitor);
    realm.pubKey("addLexicalNode", ImageNode);
    realm.pubKey("addExportVisitor", LexicalImageVisitor);
    realm.pubKey("addComposerChild", ImageDialog);
  }
});
const getDOMSelection = (targetWindow) => CAN_USE_DOM ? (targetWindow || window).getSelection() : null;
const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");
const TRANSPARENT_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
function onDragStart(event) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) {
    return false;
  }
  dataTransfer.setData("text/plain", "_");
  const img = document.createElement("img");
  img.src = TRANSPARENT_IMAGE;
  dataTransfer.setDragImage(img, 0, 0);
  dataTransfer.setData(
    "application/x-lexical-drag",
    JSON.stringify({
      data: {
        altText: node.__altText,
        title: node.__title,
        key: node.getKey(),
        src: node.__src
      },
      type: "image"
    })
  );
  return true;
}
function onDragover(event) {
  var _a;
  let cbPayload = Array.from(((_a = event.dataTransfer) == null ? void 0 : _a.items) || []);
  cbPayload = cbPayload.filter((i) => /image/.test(i.type));
  if (cbPayload.length > 0) {
    event.preventDefault();
    return true;
  }
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  if (!canDropImage(event)) {
    event.preventDefault();
  }
  return true;
}
function onDrop(event, editor, imageUploadHandler) {
  var _a;
  let cbPayload = Array.from(((_a = event.dataTransfer) == null ? void 0 : _a.items) || []);
  cbPayload = cbPayload.filter((i) => /image/.test(i.type));
  if (cbPayload.length > 0) {
    if (imageUploadHandler !== null) {
      event.preventDefault();
      Promise.all(cbPayload.map((image) => imageUploadHandler(image.getAsFile()))).then((urls) => {
        urls.forEach((url) => {
          editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            src: url,
            altText: ""
          });
        });
      }).catch((e) => {
        throw e;
      });
      return true;
    }
  }
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const data = getDragImageData(event);
  if (!data) {
    return false;
  }
  event.preventDefault();
  if (canDropImage(event)) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== void 0) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
  }
  return true;
}
function getImageNodeInSelection() {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}
function getDragImageData(event) {
  var _a;
  const dragData = (_a = event.dataTransfer) == null ? void 0 : _a.getData("application/x-lexical-drag");
  if (!dragData) {
    return null;
  }
  const { type, data } = JSON.parse(dragData);
  if (type !== "image") {
    return null;
  }
  return data;
}
function canDropImage(event) {
  const target = event.target;
  return !!(target && target instanceof HTMLElement && target.parentElement);
}
function getDragSelection(event) {
  let range;
  const target = event.target;
  const targetWindow = target == null ? null : target.nodeType === 9 ? target.defaultView : target.ownerDocument.defaultView;
  const domSelection = getDOMSelection(targetWindow);
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }
  return range;
}
export {
  $createImageNode,
  $isImageNode,
  INSERT_IMAGE_COMMAND,
  ImageNode,
  imagePlugin,
  imagePluginHooks,
  imageSystem
};
