import React__default from "react";
import { corePluginHooks } from "../../core/index.js";
import { IS_BOLD, IS_ITALIC, IS_UNDERLINE } from "../../../FormatConstants.js";
import { MultipleChoiceToggleGroup } from "../primitives/toolbar.js";
import BoldIcon from "../../../icons/format_bold.svg.js";
import ItalicIcon from "../../../icons/format_italic.svg.js";
import UnderlinedIcon from "../../../icons/format_underlined.svg.js";
const BoldItalicUnderlineToggles = () => {
  const [currentFormat] = corePluginHooks.useEmitterValues("currentFormat");
  const applyFormat = corePluginHooks.usePublisher("applyFormat");
  const boldIsOn = (currentFormat & IS_BOLD) !== 0;
  const italicIsOn = (currentFormat & IS_ITALIC) !== 0;
  const underlineIsOn = (currentFormat & IS_UNDERLINE) !== 0;
  const boldTitle = boldIsOn ? "Remove bold" : "Bold";
  const italicTitle = italicIsOn ? "Remove italic" : "Italic";
  const underlineTitle = underlineIsOn ? "Remove underline" : "Underline";
  return /* @__PURE__ */ React__default.createElement(
    MultipleChoiceToggleGroup,
    {
      items: [
        { title: boldTitle, contents: /* @__PURE__ */ React__default.createElement(BoldIcon, null), active: boldIsOn, onChange: applyFormat.bind(null, "bold") },
        { title: italicTitle, contents: /* @__PURE__ */ React__default.createElement(ItalicIcon, null), active: italicIsOn, onChange: applyFormat.bind(null, "italic") },
        {
          title: underlineTitle,
          contents: /* @__PURE__ */ React__default.createElement(UnderlinedIcon, { style: { transform: "translateY(2px)" } }),
          active: underlineIsOn,
          onChange: applyFormat.bind(null, "underline")
        }
      ]
    }
  );
};
export {
  BoldItalicUnderlineToggles
};
