import React__default from "react";
import { ButtonOrDropdownButton } from "../primitives/toolbar.js";
import AdmonitionIcon from "../../../icons/emergency_home.svg.js";
import { directivesPluginHooks } from "../../directives/index.js";
import { ADMONITION_TYPES } from "../../../directive-editors/AdmonitionDirectiveDescriptor.js";
const InsertAdmonition = () => {
  const insertDirective = directivesPluginHooks.usePublisher("insertDirective");
  const items = React__default.useMemo(
    () => ADMONITION_TYPES.map((type) => ({ value: type, label: type.replace(/^./, (l) => l.toUpperCase()) })),
    []
  );
  return /* @__PURE__ */ React__default.createElement(
    ButtonOrDropdownButton,
    {
      title: "Insert admonition",
      onChoose: (admonitionName) => {
        insertDirective({
          type: "containerDirective",
          name: admonitionName
        });
      },
      items
    },
    /* @__PURE__ */ React__default.createElement(AdmonitionIcon, null)
  );
};
export {
  InsertAdmonition
};
