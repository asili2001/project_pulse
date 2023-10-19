import React__default from "react";
import { ButtonWithTooltip } from "../primitives/toolbar.js";
import FrontmatterIcon from "../../../icons/frontmatter.svg.js";
import { frontmatterPluginHooks } from "../../frontmatter/index.js";
import styles from "../../../styles/ui.module.css.js";
import classNames from "classnames";
const InsertFrontmatter = () => {
  const insertFrontmatter = frontmatterPluginHooks.usePublisher("insertFrontmatter");
  const [hasFrontmatter] = frontmatterPluginHooks.useEmitterValues("hasFrontmatter");
  return /* @__PURE__ */ React__default.createElement(
    ButtonWithTooltip,
    {
      title: hasFrontmatter ? "Edit frontmatter" : "Insert frontmatter",
      className: classNames({
        [styles.activeToolbarButton]: hasFrontmatter
      }),
      onClick: insertFrontmatter.bind(null, true)
    },
    /* @__PURE__ */ React__default.createElement(FrontmatterIcon, null)
  );
};
export {
  InsertFrontmatter
};
