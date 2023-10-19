import React__default from "react";
import { corePlugin, corePluginHooks } from "./plugins/core/index.js";
import { lexicalTheme } from "./styles/lexicalTheme.js";
import { LexicalComposer } from "@lexical/react/LexicalComposer.js";
import styles from "./styles/ui.module.css.js";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin.js";
import { ContentEditable } from "@lexical/react/LexicalContentEditable.js";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary.js";
import classNames from "classnames";
import { noop } from "./utils/fp.js";
import { RealmPluginInitializer, useHasPlugin } from "./gurx/react.js";
const LexicalProvider = ({ children }) => {
  const [initialRootEditorState, nodes, readOnly] = corePluginHooks.useEmitterValues(
    "initialRootEditorState",
    "usedLexicalNodes",
    "readOnly"
  );
  return /* @__PURE__ */ React__default.createElement(
    LexicalComposer,
    {
      initialConfig: {
        editable: !readOnly,
        editorState: initialRootEditorState,
        namespace: "MDXEditor",
        theme: lexicalTheme,
        nodes,
        onError: (error) => {
          throw error;
        }
      }
    },
    children
  );
};
const RichTextEditor = () => {
  const [contentEditableClassName, composerChildren, topAreaChildren, editorWrappers, placeholder] = corePluginHooks.useEmitterValues(
    "contentEditableClassName",
    "composerChildren",
    "topAreaChildren",
    "editorWrappers",
    "placeholder"
  );
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, topAreaChildren.map((Child, index) => /* @__PURE__ */ React__default.createElement(Child, { key: index })), /* @__PURE__ */ React__default.createElement(RenderRecurisveWrappers, { wrappers: editorWrappers }, /* @__PURE__ */ React__default.createElement("div", { className: classNames(styles.rootContentEditableWrapper) }, /* @__PURE__ */ React__default.createElement(
    RichTextPlugin,
    {
      contentEditable: /* @__PURE__ */ React__default.createElement(ContentEditable, { className: classNames(styles.contentEditable, contentEditableClassName) }),
      placeholder: /* @__PURE__ */ React__default.createElement("div", { className: classNames(styles.contentEditable, styles.placeholder, contentEditableClassName) }, /* @__PURE__ */ React__default.createElement("p", null, placeholder)),
      ErrorBoundary: LexicalErrorBoundary
    }
  ))), composerChildren.map((Child, index) => /* @__PURE__ */ React__default.createElement(Child, { key: index })));
};
const DEFAULT_MARKDOWN_OPTIONS = {
  listItemIndent: "one"
};
const RenderRecurisveWrappers = ({
  wrappers,
  children
}) => {
  if (wrappers.length === 0) {
    return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, children);
  }
  const Wrapper = wrappers[0];
  return /* @__PURE__ */ React__default.createElement(Wrapper, null, /* @__PURE__ */ React__default.createElement(RenderRecurisveWrappers, { wrappers: wrappers.slice(1) }, children));
};
const EditorRootElement = ({ children, className }) => {
  const editorRootElementRef = React__default.useRef(null);
  const setEditorRootElementRef = corePluginHooks.usePublisher("editorRootElementRef");
  React__default.useEffect(() => {
    const popupContainer = document.createElement("div");
    popupContainer.classList.add(styles.editorRoot);
    if (className) {
      className.split(" ").forEach((c) => {
        popupContainer.classList.add(c);
      });
    }
    document.body.appendChild(popupContainer);
    editorRootElementRef.current = popupContainer;
    setEditorRootElementRef(editorRootElementRef);
    return () => {
      popupContainer.remove();
    };
  }, [className, editorRootElementRef, setEditorRootElementRef]);
  return /* @__PURE__ */ React__default.createElement("div", { className: classNames(styles.editorRoot, styles.editorWrapper, className, "mdxeditor") }, children);
};
const Methods = ({ mdxRef }) => {
  const realm = corePluginHooks.useRealmContext();
  const hasDiffSourcePlugin = useHasPlugin("diff-source");
  React__default.useImperativeHandle(
    mdxRef,
    () => {
      return {
        getMarkdown: () => {
          if (hasDiffSourcePlugin) {
            if (realm.getKeyValue("viewMode") === "source") {
              return realm.getKeyValue("markdownSourceEditorValue");
            }
          }
          return realm.getKeyValue("markdown");
        },
        setMarkdown: (markdown) => {
          realm.pubKey("setMarkdown", markdown);
        },
        focus: (callbackFn, opts) => {
          var _a;
          (_a = realm.getKeyValue("rootEditor")) == null ? void 0 : _a.focus(callbackFn, opts);
        }
      };
    },
    [realm, hasDiffSourcePlugin]
  );
  return null;
};
const MDXEditor = React__default.forwardRef((props, ref) => {
  return /* @__PURE__ */ React__default.createElement(
    RealmPluginInitializer,
    {
      plugins: [
        corePlugin({
          contentEditableClassName: props.contentEditableClassName ?? "",
          initialMarkdown: props.markdown,
          onChange: props.onChange ?? noop,
          onBlur: props.onBlur ?? noop,
          toMarkdownOptions: props.toMarkdownOptions ?? DEFAULT_MARKDOWN_OPTIONS,
          autoFocus: props.autoFocus ?? false,
          placeholder: props.placeholder ?? "",
          readOnly: Boolean(props.readOnly)
        }),
        ...props.plugins || []
      ]
    },
    /* @__PURE__ */ React__default.createElement(EditorRootElement, { className: props.className }, /* @__PURE__ */ React__default.createElement(LexicalProvider, null, /* @__PURE__ */ React__default.createElement(RichTextEditor, null))),
    /* @__PURE__ */ React__default.createElement(Methods, { mdxRef: ref })
  );
});
export {
  MDXEditor
};
