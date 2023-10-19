import { coreSystem } from "../core/index.js";
import { DiffSourceWrapper } from "./DiffSourceWrapper.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const diffSourceSystem = system(
  (r, [{ markdown, setMarkdown }]) => {
    const diffMarkdown = r.node("");
    const markdownSourceEditorValue = r.node("");
    r.link(markdown, markdownSourceEditorValue);
    const viewMode = r.node("rich-text");
    r.sub(
      r.pipe(
        viewMode,
        r.o.scan(
          (prev, next) => {
            return {
              current: prev.next,
              next
            };
          },
          { current: "rich-text", next: "rich-text" }
        ),
        r.o.withLatestFrom(markdownSourceEditorValue)
      ),
      ([{ current }, markdownSourceFromEditor]) => {
        if (current === "source" || current === "diff") {
          r.pub(setMarkdown, markdownSourceFromEditor);
        }
      }
    );
    return { viewMode, diffMarkdown, markdownSourceEditorValue };
  },
  [coreSystem]
);
const [
  /** @internal */
  diffSourcePlugin,
  /** @internal */
  diffSourcePluginHooks
] = realmPlugin({
  id: "diff-source",
  systemSpec: diffSourceSystem,
  applyParamsToSystem(r, params) {
    r.pubKey("viewMode", (params == null ? void 0 : params.viewMode) || "rich-text");
  },
  init(r, params) {
    r.pubKey("diffMarkdown", (params == null ? void 0 : params.diffMarkdown) || "");
    r.pubKey("addEditorWrapper", DiffSourceWrapper);
  }
});
export {
  diffSourcePlugin,
  diffSourcePluginHooks,
  diffSourceSystem
};
