import React__default from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { corePluginHooks } from "../index.js";
import styles from "../../../styles/ui.module.css.js";
const PopoverPortal = (props) => {
  const [editorRootElementRef] = corePluginHooks.useEmitterValues("editorRootElementRef");
  return /* @__PURE__ */ React__default.createElement(RadixPopover.Portal, { ...props, container: editorRootElementRef == null ? void 0 : editorRootElementRef.current });
};
const PopoverContent = React__default.forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ React__default.createElement(RadixPopover.Content, { ...props, className: styles.popoverContent, sideOffset: 5, side: "top", ref }, /* @__PURE__ */ React__default.createElement("span", { className: styles.popoverArrow }, /* @__PURE__ */ React__default.createElement(RadixPopover.Arrow, null)), props.children);
  }
);
export {
  PopoverContent,
  PopoverPortal
};
