import React__default from "react";
import { coreSystem } from "../core/index.js";
import { codeBlockSystem } from "../codeblock/index.js";
import { SandpackEditor } from "./SandpackEditor.js";
import { system } from "../../gurx/realmFactory.js";
import { realmPlugin } from "../../gurx/react.js";
const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`;
const defaultSandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      name: "react",
      meta: "live react",
      label: "React",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent
    }
  ]
};
const sandpackSystem = system(
  (r, [, { insertCodeBlock }]) => {
    const sandpackConfig = r.node(defaultSandpackConfig);
    const insertSandpack = r.node();
    r.link(
      r.pipe(
        insertSandpack,
        r.o.withLatestFrom(sandpackConfig),
        r.o.map(([presetName, sandpackConfig2]) => {
          const preset = presetName ? sandpackConfig2.presets.find((preset2) => preset2.name === presetName) : sandpackConfig2.presets.find((preset2) => preset2.name == sandpackConfig2.defaultPreset);
          if (!preset) {
            throw new Error(`No sandpack preset found with name ${presetName}`);
          }
          return {
            code: preset.initialSnippetContent || "",
            language: preset.snippetLanguage || "jsx",
            meta: preset.meta
          };
        })
      ),
      insertCodeBlock
    );
    return {
      insertSandpack,
      sandpackConfig
    };
  },
  [coreSystem, codeBlockSystem]
);
const [
  /** @internal */
  sandpackPlugin,
  /** @internal */
  sandpackPluginHooks
] = realmPlugin({
  id: "sandpack",
  systemSpec: sandpackSystem,
  applyParamsToSystem(r, params) {
    r.pubKey("sandpackConfig", params.sandpackConfig);
  },
  init(r) {
    r.pubKey("appendCodeBlockEditorDescriptor", {
      match(_language, meta) {
        return meta == null ? void 0 : meta.startsWith("live");
      },
      priority: 1,
      Editor(props) {
        const [config] = sandpackPluginHooks.useEmitterValues("sandpackConfig");
        const preset = config.presets.find((preset2) => preset2.meta === props.meta);
        if (!preset) {
          throw new Error(`No sandpack preset found with ${props.meta}`);
        }
        return /* @__PURE__ */ React__default.createElement(SandpackEditor, { ...props, preset });
      }
    });
  }
});
export {
  sandpackPlugin,
  sandpackPluginHooks,
  sandpackSystem
};
