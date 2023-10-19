import React__default from "react";
import { imagePluginHooks } from "../../image/index.js";
import * as RadixToolbar from "@radix-ui/react-toolbar";
import AddPhotoIcon from "../../../icons/add_photo.svg.js";
import styles from "../../../styles/ui.module.css.js";
import { corePluginHooks } from "../../core/index.js";
import { TooltipWrap } from "../primitives/TooltipWrap.js";
const InsertImage = React__default.forwardRef((_, forwardedRef) => {
  const openNewImageDialog = imagePluginHooks.usePublisher("openNewImageDialog");
  const [readOnly] = corePluginHooks.useEmitterValues("readOnly");
  return /* @__PURE__ */ React__default.createElement(RadixToolbar.Button, { className: styles.toolbarButton, ref: forwardedRef, disabled: readOnly, onClick: () => openNewImageDialog(true) }, /* @__PURE__ */ React__default.createElement(TooltipWrap, { title: "Insert image" }, /* @__PURE__ */ React__default.createElement(AddPhotoIcon, null)));
});
export {
  InsertImage
};
