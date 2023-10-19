import { coreSystem } from "../core/index.js";
import { QuoteNode } from "@lexical/rich-text";
import { MdastBlockQuoteVisitor } from "./MdastBlockQuoteVisitor.js";
import { LexicalQuoteVisitor } from "./LexicalQuoteVisitor.js";
import { realmPlugin } from "../../gurx/react.js";
import { system } from "../../gurx/realmFactory.js";
const [
  /** @internal */
  quotePlugin,
  /** @internal */
  quotePluginHooks
] = realmPlugin({
  id: "quote",
  systemSpec: system(() => {
    return {};
  }, [coreSystem]),
  init: (realm) => {
    realm.pubKey("addImportVisitor", MdastBlockQuoteVisitor);
    realm.pubKey("addLexicalNode", QuoteNode);
    realm.pubKey("addExportVisitor", LexicalQuoteVisitor);
  }
});
export {
  quotePlugin,
  quotePluginHooks
};
