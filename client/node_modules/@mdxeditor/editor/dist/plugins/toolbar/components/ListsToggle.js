import React__default from "react";
import BulletedListIcon from "../../../icons/format_list_bulleted.svg.js";
import NumberedListIcon from "../../../icons/format_list_numbered.svg.js";
import { listsPluginHooks } from "../../lists/index.js";
import { SingleChoiceToggleGroup } from "../primitives/toolbar.js";
const ListsToggle = () => {
  const [currentListType] = listsPluginHooks.useEmitterValues("currentListType");
  const applyListType = listsPluginHooks.usePublisher("applyListType");
  return /* @__PURE__ */ React__default.createElement(
    SingleChoiceToggleGroup,
    {
      value: currentListType || "",
      items: [
        { title: "Bulleted list", contents: /* @__PURE__ */ React__default.createElement(BulletedListIcon, null), value: "bullet" },
        { title: "Numbered list", contents: /* @__PURE__ */ React__default.createElement(NumberedListIcon, null), value: "number" }
      ],
      onChange: applyListType
    }
  );
};
export {
  ListsToggle
};
