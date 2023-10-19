import { coreSystem } from "../core/index.js";
import { MdastThematicBreakVisitor } from "./MdastThematicBreakVisitor.js";
import { LexicalThematicBreakVisitor } from "./LexicalThematicBreakVisitor.js";
import { INSERT_HORIZONTAL_RULE_COMMAND, HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode.js";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const thematicBreakSystem = system(
  (r, [{ activeEditor }]) => {
    const insertThematicBreak = r.node();
    r.sub(r.pipe(insertThematicBreak, r.o.withLatestFrom(activeEditor)), ([, theEditor]) => {
      theEditor == null ? void 0 : theEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, void 0);
    });
    return {
      insertThematicBreak
    };
  },
  [coreSystem]
);
const [
  /** @internal */
  thematicBreakPlugin,
  /** @internal */
  thematicBreakPluginHooks
] = realmPlugin({
  id: "thematic-break",
  systemSpec: thematicBreakSystem,
  init: (realm) => {
    realm.pubKey("addImportVisitor", MdastThematicBreakVisitor);
    realm.pubKey("addLexicalNode", HorizontalRuleNode);
    realm.pubKey("addExportVisitor", LexicalThematicBreakVisitor);
    realm.pubKey("addComposerChild", HorizontalRulePlugin);
  }
});
export {
  thematicBreakPlugin,
  thematicBreakPluginHooks,
  thematicBreakSystem
};
