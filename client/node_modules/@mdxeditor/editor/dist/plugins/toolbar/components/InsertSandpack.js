import React__default from "react";
import { ButtonOrDropdownButton } from "../primitives/toolbar.js";
import LiveCodeIcon from "../../../icons/deployed_code.svg.js";
import { sandpackPluginHooks } from "../../sandpack/index.js";
const InsertSandpack = () => {
  const [sandpackConfig] = sandpackPluginHooks.useEmitterValues("sandpackConfig");
  const insertSandpack = sandpackPluginHooks.usePublisher("insertSandpack");
  const items = React__default.useMemo(() => sandpackConfig.presets.map((preset) => ({ value: preset.name, label: preset.label })), [sandpackConfig]);
  return /* @__PURE__ */ React__default.createElement(ButtonOrDropdownButton, { title: "Insert Sandpack", onChoose: insertSandpack, items }, /* @__PURE__ */ React__default.createElement(LiveCodeIcon, null));
};
export {
  InsertSandpack
};
