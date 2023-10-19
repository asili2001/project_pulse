import React__default from "react";
import { ButtonWithTooltip } from "../primitives/toolbar.js";
import FrameSourceIcon from "../../../icons/frame_source.svg.js";
import { codeBlockPluginHooks } from "../../codeblock/index.js";
const InsertCodeBlock = () => {
  const insertCodeBlock = codeBlockPluginHooks.usePublisher("insertCodeBlock");
  return /* @__PURE__ */ React__default.createElement(
    ButtonWithTooltip,
    {
      title: "Insert code block",
      onClick: () => {
        insertCodeBlock({});
      }
    },
    /* @__PURE__ */ React__default.createElement(FrameSourceIcon, null)
  );
};
export {
  InsertCodeBlock
};
