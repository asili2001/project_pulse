import React__default from "react";
import { coreSystem } from "../core/index.js";
import { MdastLinkVisitor } from "./MdastLinkVisitor.js";
import { LexicalLinkVisitor } from "./LexicalLinkVisitor.js";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin.js";
import { LexicalAutoLinkPlugin } from "./AutoLinkPlugin.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const linkSystem = system(
  (r) => {
    const disableAutoLink = r.node(false);
    return { disableAutoLink };
  },
  [coreSystem]
);
const [linkPlugin] = realmPlugin({
  id: "link",
  systemSpec: linkSystem,
  init: (realm, params) => {
    const disableAutoLink = Boolean(params == null ? void 0 : params.disableAutoLink);
    realm.pubKey("addImportVisitor", MdastLinkVisitor);
    realm.pubKey("addLexicalNode", LinkNode);
    realm.pubKey("addLexicalNode", AutoLinkNode);
    realm.pubKey("addExportVisitor", LexicalLinkVisitor);
    realm.pubKey("disableAutoLink", disableAutoLink);
    const linkPluginProps = (params == null ? void 0 : params.validateUrl) ? { validateUrl: params.validateUrl } : {};
    realm.pubKey("addComposerChild", () => /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(LinkPlugin, { ...linkPluginProps }), disableAutoLink ? null : /* @__PURE__ */ React__default.createElement(LexicalAutoLinkPlugin, null)));
  }
});
export {
  linkPlugin
};
