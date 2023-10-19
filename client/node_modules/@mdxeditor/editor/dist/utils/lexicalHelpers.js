import { $getSelection } from "lexical";
import { $isAtNodeEnd } from "@lexical/selection";
function getSelectedNode(selection) {
  try {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
      return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
      return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
      return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
    }
  } catch {
    return null;
  }
}
function getSelectionRectangle(editor) {
  const selection = $getSelection();
  const nativeSelection = window.getSelection();
  const activeElement = document.activeElement;
  const rootElement = editor.getRootElement();
  if (selection !== null && nativeSelection !== null && rootElement !== null && rootElement.contains(nativeSelection.anchorNode) && editor.isEditable()) {
    const domRange = nativeSelection.getRangeAt(0);
    let rect;
    if (nativeSelection.anchorNode === rootElement) {
      let inner = rootElement;
      while (inner.firstElementChild != null) {
        inner = inner.firstElementChild;
      }
      rect = inner.getBoundingClientRect();
    } else {
      rect = domRange.getBoundingClientRect();
    }
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else if (!activeElement || activeElement.className !== "link-input") {
    return null;
  }
  return null;
}
export {
  getSelectedNode,
  getSelectionRectangle
};
