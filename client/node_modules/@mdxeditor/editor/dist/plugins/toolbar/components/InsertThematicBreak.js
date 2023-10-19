import React__default from "react";
import { thematicBreakPluginHooks } from "../../thematic-break/index.js";
import { ButtonWithTooltip } from "../primitives/toolbar.js";
import HorizontalRuleIcon from "../../../icons/horizontal_rule.svg.js";
const InsertThematicBreak = () => {
  const insertThematicBreak = thematicBreakPluginHooks.usePublisher("insertThematicBreak");
  return /* @__PURE__ */ React__default.createElement(ButtonWithTooltip, { title: "Insert thematic break", onClick: insertThematicBreak.bind(null, true) }, /* @__PURE__ */ React__default.createElement(HorizontalRuleIcon, null));
};
export {
  InsertThematicBreak
};
