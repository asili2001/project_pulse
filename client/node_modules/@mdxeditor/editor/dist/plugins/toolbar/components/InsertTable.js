import { ButtonWithTooltip } from "../primitives/toolbar.js";
import React__default from "react";
import { tablePluginHooks } from "../../table/index.js";
import TableIcon from "../../../icons/table.svg.js";
const InsertTable = () => {
  const insertTable = tablePluginHooks.usePublisher("insertTable");
  return /* @__PURE__ */ React__default.createElement(
    ButtonWithTooltip,
    {
      title: "Insert table",
      onClick: () => {
        insertTable(true);
      }
    },
    /* @__PURE__ */ React__default.createElement(TableIcon, null)
  );
};
export {
  InsertTable
};
