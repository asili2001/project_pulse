import { coreSystem } from "../core/index.js";
import { MdastHeadingVisitor } from "./MdastHeadingVisitor.js";
import { $createHeadingNode, HeadingNode } from "@lexical/rich-text";
import { LexicalHeadingVisitor } from "./LexicalHeadingVisitor.js";
import { KEY_DOWN_COMMAND, $createParagraphNode, COMMAND_PRIORITY_LOW } from "lexical";
import { controlOrMeta } from "../../utils/detectMac.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const FORMATTING_KEYS = [48, 49, 50, 51, 52, 53, 54];
const ALL_HEADING_LEVELS = [1, 2, 3, 4, 5, 6];
const CODE_TO_HEADING_LEVEL_MAP = {
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6
};
const headingsSystem = system(
  (r, [{ createRootEditorSubscription, convertSelectionToNode }]) => {
    const allowedHeadingLevels = r.node(ALL_HEADING_LEVELS);
    r.pub(createRootEditorSubscription, (theRootEditor) => {
      return theRootEditor.registerCommand(
        KEY_DOWN_COMMAND,
        (event) => {
          const { keyCode, ctrlKey, metaKey, altKey } = event;
          if (FORMATTING_KEYS.includes(keyCode) && controlOrMeta(metaKey, ctrlKey) && altKey) {
            event.preventDefault();
            theRootEditor.update(() => {
              if (keyCode === 48) {
                r.pub(convertSelectionToNode, () => $createParagraphNode());
              } else {
                const allowedHeadingLevelsValues = r.getValue(allowedHeadingLevels);
                const requestedHeadingLevel = CODE_TO_HEADING_LEVEL_MAP[keyCode];
                if (!allowedHeadingLevelsValues.includes(requestedHeadingLevel)) {
                  r.pub(convertSelectionToNode, () => $createHeadingNode(`h${requestedHeadingLevel}`));
                }
              }
            });
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      );
    });
    return {
      allowedHeadingLevels
    };
  },
  [coreSystem]
);
const [headingsPlugin, headingsPluginHooks] = realmPlugin({
  id: "headings",
  systemSpec: headingsSystem,
  applyParamsToSystem(realm, params) {
    realm.pubKey("allowedHeadingLevels", (params == null ? void 0 : params.allowedHeadingLevels) ?? ALL_HEADING_LEVELS);
  },
  init: (realm) => {
    realm.pubKey("addImportVisitor", MdastHeadingVisitor);
    realm.pubKey("addLexicalNode", HeadingNode);
    realm.pubKey("addExportVisitor", LexicalHeadingVisitor);
  }
});
export {
  headingsPlugin,
  headingsPluginHooks,
  headingsSystem
};
