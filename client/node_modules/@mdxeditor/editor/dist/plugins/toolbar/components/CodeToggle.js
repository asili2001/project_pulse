import React__default from "react";
import { IS_CODE } from "../../../FormatConstants.js";
import CodeIcon from "../../../icons/code.svg.js";
import { corePluginHooks } from "../../core/index.js";
import { MultipleChoiceToggleGroup } from "../primitives/toolbar.js";
const CodeToggle = () => {
  const [currentFormat] = corePluginHooks.useEmitterValues("currentFormat");
  const applyFormat = corePluginHooks.usePublisher("applyFormat");
  const codeIsOn = (currentFormat & IS_CODE) !== 0;
  const title = codeIsOn ? "Remove code format" : "Inline code format";
  return /* @__PURE__ */ React__default.createElement(
    MultipleChoiceToggleGroup,
    {
      items: [{ title, contents: /* @__PURE__ */ React__default.createElement(CodeIcon, null), active: codeIsOn, onChange: applyFormat.bind(null, "code") }]
    }
  );
};
export {
  CodeToggle
};
