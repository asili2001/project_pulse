import type { CodeBlockEditorDescriptor, CreateCodeBlockNodeOptions } from '../codeblock';
import type { Options } from 'mdast-util-to-markdown';
import type { Config } from 'mdast-util-from-markdown/lib';
import type { Extension } from 'micromark-util-types';
import type { Content } from 'mdast';
import type { MdastImportVisitor, LexicalVisitor } from '../..';
import type { EditorSubscription, EditorInFocus, BlockType } from '../core';
import type { InitialEditorStateType } from '@lexical/react/LexicalComposer';
import type { JsxComponentDescriptor } from '../jsx';
import type { HistoryState } from '@lexical/history';
import type { LexicalEditor, RangeSelection, Klass, LexicalNode, TextFormatType, ElementNode, DecoratorNode } from 'lexical';
import type { SystemSpec, Realm, RealmNode, PluginConstructor, TypedRealm, ValueForKey, SystemKeys, ValuesForKeys, SystemDict } from '../../gurx';
import { SandpackProvider } from '@codesandbox/sandpack-react';
import React from 'react';
type SandpackProviderProps = React.ComponentProps<typeof SandpackProvider>;
/**
 * Defines a single preset that can be used to create a sandbox.
 */
export interface SandpackPreset {
    /**
     * The name of the preset - use this to reference the preset from the defaultPreset field.
     */
    name: string;
    /**
     * The label of the preset, displayed in the sandpack button dropdown.
     */
    label: string | JSX.Element;
    /**
     * The meta string that will be used to identify the preset from the fenced code block. e.g. "live react"
     */
    meta: string;
    /**
     * The sandpack template that will be used to create the sandbox. e.g. "react", "react-ts", "vanilla".
     */
    sandpackTemplate: SandpackProviderProps['template'];
    /**
     * The sandpack theme that will be used to create the sandbox. e.g. "light", "dark".
     */
    sandpackTheme: SandpackProviderProps['theme'];
    /**
     * The name of the file that will be created in the sandbox. e.g. "/App.js".
     */
    snippetFileName: string;
    /**
     * The dependencies that will be added to the sandbox, just like in package.json.
     */
    dependencies?: Record<string, string>;
    /**
     * The files that will be added to the sandbox (read-only).
     * The key is the name of the file, and the value is the contents of the file.
     */
    files?: Record<string, string>;
    /**
     * The language used in the editable snippet. e.g. "jsx", "tsx", etc.
     */
    snippetLanguage?: string;
    /**
     * The initial content of the editable snippet.
     */
    initialSnippetContent?: string;
}
/**
 * The configuration for the available sandpack presets.
 */
export interface SandpackConfig {
    /**
     * The name of the default preset that will be used if no meta (other than live) is set.
     */
    defaultPreset: string;
    /**
     * The list of sandpack presets that can be used.
     */
    presets: SandpackPreset[];
}
/**
 * @internal
 */
export declare const sandpackSystem: SystemSpec<[SystemSpec<[], (r: Realm) => {
    activeEditor: RealmNode<LexicalEditor | null>;
    inFocus: RealmNode<boolean>;
    historyState: RealmNode<HistoryState>;
    currentSelection: RealmNode<RangeSelection | null>;
    jsxIsAvailable: RealmNode<boolean>;
    jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
    initialRootEditorState: RealmNode<InitialEditorStateType>;
    rootEditor: RealmNode<LexicalEditor | null>;
    createRootEditorSubscription: RealmNode<EditorSubscription>;
    createActiveEditorSubscription: RealmNode<EditorSubscription>;
    importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
    addLexicalNode: RealmNode<Klass<LexicalNode>>;
    addSyntaxExtension: RealmNode<Extension>;
    addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
    toMarkdownExtensions: RealmNode<Options[]>;
    toMarkdownOptions: RealmNode<Options>;
    addToMarkdownExtension: RealmNode<Options>;
    addExportVisitor: RealmNode<LexicalVisitor>;
    exportVisitors: RealmNode<LexicalVisitor[]>;
    initialMarkdown: RealmNode<string>;
    setMarkdown: RealmNode<string>;
    markdown: RealmNode<string>;
    editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<React.ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<React.ComponentType<{}>[]>;
    addComposerChild: RealmNode<React.ComponentType<{}>>;
    topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<React.ComponentType<{}>>;
    nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
    editorWrappers: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>>;
    currentFormat: RealmNode<number>;
    editorInFocus: RealmNode<EditorInFocus | null>;
    applyFormat: RealmNode<TextFormatType>;
    currentBlockType: RealmNode<BlockType>;
    applyBlockType: RealmNode<BlockType>;
    convertSelectionToNode: RealmNode<() => ElementNode>;
    insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
    onBlur: RealmNode<FocusEvent>;
}>, SystemSpec<[SystemSpec<[], (r: Realm) => {
    activeEditor: RealmNode<LexicalEditor | null>;
    inFocus: RealmNode<boolean>;
    historyState: RealmNode<HistoryState>;
    currentSelection: RealmNode<RangeSelection | null>;
    jsxIsAvailable: RealmNode<boolean>;
    jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
    initialRootEditorState: RealmNode<InitialEditorStateType>;
    rootEditor: RealmNode<LexicalEditor | null>;
    createRootEditorSubscription: RealmNode<EditorSubscription>;
    createActiveEditorSubscription: RealmNode<EditorSubscription>;
    importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
    addLexicalNode: RealmNode<Klass<LexicalNode>>;
    addSyntaxExtension: RealmNode<Extension>;
    addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
    toMarkdownExtensions: RealmNode<Options[]>;
    toMarkdownOptions: RealmNode<Options>;
    addToMarkdownExtension: RealmNode<Options>;
    addExportVisitor: RealmNode<LexicalVisitor>;
    exportVisitors: RealmNode<LexicalVisitor[]>;
    initialMarkdown: RealmNode<string>;
    setMarkdown: RealmNode<string>;
    markdown: RealmNode<string>;
    editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<React.ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<React.ComponentType<{}>[]>;
    addComposerChild: RealmNode<React.ComponentType<{}>>;
    topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<React.ComponentType<{}>>;
    nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
    editorWrappers: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>>;
    currentFormat: RealmNode<number>;
    editorInFocus: RealmNode<EditorInFocus | null>;
    applyFormat: RealmNode<TextFormatType>;
    currentBlockType: RealmNode<BlockType>;
    applyBlockType: RealmNode<BlockType>;
    convertSelectionToNode: RealmNode<() => ElementNode>;
    insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
    onBlur: RealmNode<FocusEvent>;
}>], (r: Realm, [{ insertDecoratorNode }]: [{
    activeEditor: RealmNode<LexicalEditor | null>;
    inFocus: RealmNode<boolean>;
    historyState: RealmNode<HistoryState>;
    currentSelection: RealmNode<RangeSelection | null>;
    jsxIsAvailable: RealmNode<boolean>;
    jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
    initialRootEditorState: RealmNode<InitialEditorStateType>;
    rootEditor: RealmNode<LexicalEditor | null>;
    createRootEditorSubscription: RealmNode<EditorSubscription>;
    createActiveEditorSubscription: RealmNode<EditorSubscription>;
    importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
    addLexicalNode: RealmNode<Klass<LexicalNode>>;
    addSyntaxExtension: RealmNode<Extension>;
    addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
    toMarkdownExtensions: RealmNode<Options[]>;
    toMarkdownOptions: RealmNode<Options>;
    addToMarkdownExtension: RealmNode<Options>;
    addExportVisitor: RealmNode<LexicalVisitor>;
    exportVisitors: RealmNode<LexicalVisitor[]>;
    initialMarkdown: RealmNode<string>;
    setMarkdown: RealmNode<string>;
    markdown: RealmNode<string>;
    editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<React.ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<React.ComponentType<{}>[]>;
    addComposerChild: RealmNode<React.ComponentType<{}>>;
    topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<React.ComponentType<{}>>;
    nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
    editorWrappers: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>>;
    currentFormat: RealmNode<number>;
    editorInFocus: RealmNode<EditorInFocus | null>;
    applyFormat: RealmNode<TextFormatType>;
    currentBlockType: RealmNode<BlockType>;
    applyBlockType: RealmNode<BlockType>;
    convertSelectionToNode: RealmNode<() => ElementNode>;
    insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
    onBlur: RealmNode<FocusEvent>;
}]) => {
    codeBlockEditorDescriptors: RealmNode<CodeBlockEditorDescriptor[]>;
    defaultCodeBlockLanguage: RealmNode<string>;
    appendCodeBlockEditorDescriptor: RealmNode<CodeBlockEditorDescriptor>;
    insertCodeBlock: RealmNode<Partial<CreateCodeBlockNodeOptions>>;
}>], (r: Realm, [, { insertCodeBlock }]: [{
    activeEditor: RealmNode<LexicalEditor | null>;
    inFocus: RealmNode<boolean>;
    historyState: RealmNode<HistoryState>;
    currentSelection: RealmNode<RangeSelection | null>;
    jsxIsAvailable: RealmNode<boolean>;
    jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
    initialRootEditorState: RealmNode<InitialEditorStateType>;
    rootEditor: RealmNode<LexicalEditor | null>;
    createRootEditorSubscription: RealmNode<EditorSubscription>;
    createActiveEditorSubscription: RealmNode<EditorSubscription>;
    importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
    addLexicalNode: RealmNode<Klass<LexicalNode>>;
    addSyntaxExtension: RealmNode<Extension>;
    addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
    toMarkdownExtensions: RealmNode<Options[]>;
    toMarkdownOptions: RealmNode<Options>;
    addToMarkdownExtension: RealmNode<Options>;
    addExportVisitor: RealmNode<LexicalVisitor>;
    exportVisitors: RealmNode<LexicalVisitor[]>;
    initialMarkdown: RealmNode<string>;
    setMarkdown: RealmNode<string>;
    markdown: RealmNode<string>;
    editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<React.ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<React.ComponentType<{}>[]>;
    addComposerChild: RealmNode<React.ComponentType<{}>>;
    topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<React.ComponentType<{}>>;
    nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
    editorWrappers: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>>;
    currentFormat: RealmNode<number>;
    editorInFocus: RealmNode<EditorInFocus | null>;
    applyFormat: RealmNode<TextFormatType>;
    currentBlockType: RealmNode<BlockType>;
    applyBlockType: RealmNode<BlockType>;
    convertSelectionToNode: RealmNode<() => ElementNode>;
    insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
    onBlur: RealmNode<FocusEvent>;
}, {
    codeBlockEditorDescriptors: RealmNode<CodeBlockEditorDescriptor[]>;
    defaultCodeBlockLanguage: RealmNode<string>;
    appendCodeBlockEditorDescriptor: RealmNode<CodeBlockEditorDescriptor>;
    insertCodeBlock: RealmNode<Partial<CreateCodeBlockNodeOptions>>;
}]) => {
    insertSandpack: RealmNode<string>;
    sandpackConfig: RealmNode<SandpackConfig>;
}>;
export declare const 
/** @internal */
sandpackPlugin: PluginConstructor<SystemSpec<[SystemSpec<[], (r: Realm) => {
    activeEditor: RealmNode<LexicalEditor | null>;
    inFocus: RealmNode<boolean>;
    historyState: RealmNode<HistoryState>;
    currentSelection: RealmNode<RangeSelection | null>;
    jsxIsAvailable: RealmNode<boolean>;
    jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
    initialRootEditorState: RealmNode<InitialEditorStateType>;
    rootEditor: RealmNode<LexicalEditor | null>;
    createRootEditorSubscription: RealmNode<EditorSubscription>;
    createActiveEditorSubscription: RealmNode<EditorSubscription>;
    importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
    addLexicalNode: RealmNode<Klass<LexicalNode>>;
    addSyntaxExtension: RealmNode<Extension>;
    addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
    toMarkdownExtensions: RealmNode<Options[]>;
    toMarkdownOptions: RealmNode<Options>;
    addToMarkdownExtension: RealmNode<Options>;
    addExportVisitor: RealmNode<LexicalVisitor>;
    exportVisitors: RealmNode<LexicalVisitor[]>;
    initialMarkdown: RealmNode<string>;
    setMarkdown: RealmNode<string>;
    markdown: RealmNode<string>;
    editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<React.ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<React.ComponentType<{}>[]>;
    addComposerChild: RealmNode<React.ComponentType<{}>>;
    topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<React.ComponentType<{}>>;
    nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
    editorWrappers: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>>;
    currentFormat: RealmNode<number>;
    editorInFocus: RealmNode<EditorInFocus | null>;
    applyFormat: RealmNode<TextFormatType>;
    currentBlockType: RealmNode<BlockType>;
    applyBlockType: RealmNode<BlockType>;
    convertSelectionToNode: RealmNode<() => ElementNode>;
    insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
    onBlur: RealmNode<FocusEvent>;
}>, SystemSpec<[SystemSpec<[], (r: Realm) => {
    activeEditor: RealmNode<LexicalEditor | null>;
    inFocus: RealmNode<boolean>;
    historyState: RealmNode<HistoryState>;
    currentSelection: RealmNode<RangeSelection | null>;
    jsxIsAvailable: RealmNode<boolean>;
    jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
    initialRootEditorState: RealmNode<InitialEditorStateType>;
    rootEditor: RealmNode<LexicalEditor | null>;
    createRootEditorSubscription: RealmNode<EditorSubscription>;
    createActiveEditorSubscription: RealmNode<EditorSubscription>;
    importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
    addLexicalNode: RealmNode<Klass<LexicalNode>>;
    addSyntaxExtension: RealmNode<Extension>;
    addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
    toMarkdownExtensions: RealmNode<Options[]>;
    toMarkdownOptions: RealmNode<Options>;
    addToMarkdownExtension: RealmNode<Options>;
    addExportVisitor: RealmNode<LexicalVisitor>;
    exportVisitors: RealmNode<LexicalVisitor[]>;
    initialMarkdown: RealmNode<string>;
    setMarkdown: RealmNode<string>;
    markdown: RealmNode<string>;
    editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<React.ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<React.ComponentType<{}>[]>;
    addComposerChild: RealmNode<React.ComponentType<{}>>;
    topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<React.ComponentType<{}>>;
    nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
    editorWrappers: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>>;
    currentFormat: RealmNode<number>;
    editorInFocus: RealmNode<EditorInFocus | null>;
    applyFormat: RealmNode<TextFormatType>;
    currentBlockType: RealmNode<BlockType>;
    applyBlockType: RealmNode<BlockType>;
    convertSelectionToNode: RealmNode<() => ElementNode>;
    insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
    onBlur: RealmNode<FocusEvent>;
}>], (r: Realm, [{ insertDecoratorNode }]: [{
    activeEditor: RealmNode<LexicalEditor | null>;
    inFocus: RealmNode<boolean>;
    historyState: RealmNode<HistoryState>;
    currentSelection: RealmNode<RangeSelection | null>;
    jsxIsAvailable: RealmNode<boolean>;
    jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
    initialRootEditorState: RealmNode<InitialEditorStateType>;
    rootEditor: RealmNode<LexicalEditor | null>;
    createRootEditorSubscription: RealmNode<EditorSubscription>;
    createActiveEditorSubscription: RealmNode<EditorSubscription>;
    importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
    addLexicalNode: RealmNode<Klass<LexicalNode>>;
    addSyntaxExtension: RealmNode<Extension>;
    addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
    toMarkdownExtensions: RealmNode<Options[]>;
    toMarkdownOptions: RealmNode<Options>;
    addToMarkdownExtension: RealmNode<Options>;
    addExportVisitor: RealmNode<LexicalVisitor>;
    exportVisitors: RealmNode<LexicalVisitor[]>;
    initialMarkdown: RealmNode<string>;
    setMarkdown: RealmNode<string>;
    markdown: RealmNode<string>;
    editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<React.ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<React.ComponentType<{}>[]>;
    addComposerChild: RealmNode<React.ComponentType<{}>>;
    topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<React.ComponentType<{}>>;
    nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
    editorWrappers: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>>;
    currentFormat: RealmNode<number>;
    editorInFocus: RealmNode<EditorInFocus | null>;
    applyFormat: RealmNode<TextFormatType>;
    currentBlockType: RealmNode<BlockType>;
    applyBlockType: RealmNode<BlockType>;
    convertSelectionToNode: RealmNode<() => ElementNode>;
    insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
    onBlur: RealmNode<FocusEvent>;
}]) => {
    codeBlockEditorDescriptors: RealmNode<CodeBlockEditorDescriptor[]>;
    defaultCodeBlockLanguage: RealmNode<string>;
    appendCodeBlockEditorDescriptor: RealmNode<CodeBlockEditorDescriptor>;
    insertCodeBlock: RealmNode<Partial<CreateCodeBlockNodeOptions>>;
}>], (r: Realm, [, { insertCodeBlock }]: [{
    activeEditor: RealmNode<LexicalEditor | null>;
    inFocus: RealmNode<boolean>;
    historyState: RealmNode<HistoryState>;
    currentSelection: RealmNode<RangeSelection | null>;
    jsxIsAvailable: RealmNode<boolean>;
    jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
    initialRootEditorState: RealmNode<InitialEditorStateType>;
    rootEditor: RealmNode<LexicalEditor | null>;
    createRootEditorSubscription: RealmNode<EditorSubscription>;
    createActiveEditorSubscription: RealmNode<EditorSubscription>;
    importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
    addLexicalNode: RealmNode<Klass<LexicalNode>>;
    addSyntaxExtension: RealmNode<Extension>;
    addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
    toMarkdownExtensions: RealmNode<Options[]>;
    toMarkdownOptions: RealmNode<Options>;
    addToMarkdownExtension: RealmNode<Options>;
    addExportVisitor: RealmNode<LexicalVisitor>;
    exportVisitors: RealmNode<LexicalVisitor[]>;
    initialMarkdown: RealmNode<string>;
    setMarkdown: RealmNode<string>;
    markdown: RealmNode<string>;
    editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<React.ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<React.ComponentType<{}>[]>;
    addComposerChild: RealmNode<React.ComponentType<{}>>;
    topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<React.ComponentType<{}>>;
    nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
    editorWrappers: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>>;
    currentFormat: RealmNode<number>;
    editorInFocus: RealmNode<EditorInFocus | null>;
    applyFormat: RealmNode<TextFormatType>;
    currentBlockType: RealmNode<BlockType>;
    applyBlockType: RealmNode<BlockType>;
    convertSelectionToNode: RealmNode<() => ElementNode>;
    insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
    onBlur: RealmNode<FocusEvent>;
}, {
    codeBlockEditorDescriptors: RealmNode<CodeBlockEditorDescriptor[]>;
    defaultCodeBlockLanguage: RealmNode<string>;
    appendCodeBlockEditorDescriptor: RealmNode<CodeBlockEditorDescriptor>;
    insertCodeBlock: RealmNode<Partial<CreateCodeBlockNodeOptions>>;
}]) => {
    insertSandpack: RealmNode<string>;
    sandpackConfig: RealmNode<SandpackConfig>;
}>, {
    sandpackConfig: SandpackConfig;
}>, 
/** @internal */
sandpackPluginHooks: {
    useRealmContext: () => TypedRealm<{
        insertSandpack: RealmNode<string>;
        sandpackConfig: RealmNode<SandpackConfig>;
    } & {
        activeEditor: RealmNode<LexicalEditor | null>;
        inFocus: RealmNode<boolean>;
        historyState: RealmNode<HistoryState>;
        currentSelection: RealmNode<RangeSelection | null>;
        jsxIsAvailable: RealmNode<boolean>;
        jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
        initialRootEditorState: RealmNode<InitialEditorStateType>;
        rootEditor: RealmNode<LexicalEditor | null>;
        createRootEditorSubscription: RealmNode<EditorSubscription>;
        createActiveEditorSubscription: RealmNode<EditorSubscription>;
        importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
        addLexicalNode: RealmNode<Klass<LexicalNode>>;
        addSyntaxExtension: RealmNode<Extension>;
        addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
        toMarkdownExtensions: RealmNode<Options[]>;
        toMarkdownOptions: RealmNode<Options>;
        addToMarkdownExtension: RealmNode<Options>;
        addExportVisitor: RealmNode<LexicalVisitor>;
        exportVisitors: RealmNode<LexicalVisitor[]>;
        initialMarkdown: RealmNode<string>;
        setMarkdown: RealmNode<string>;
        markdown: RealmNode<string>;
        editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<React.ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<React.ComponentType<{}>[]>;
        addComposerChild: RealmNode<React.ComponentType<{}>>;
        topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<React.ComponentType<{}>>;
        nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
        editorWrappers: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>>;
        currentFormat: RealmNode<number>;
        editorInFocus: RealmNode<EditorInFocus | null>;
        applyFormat: RealmNode<TextFormatType>;
        currentBlockType: RealmNode<BlockType>;
        applyBlockType: RealmNode<BlockType>;
        convertSelectionToNode: RealmNode<() => ElementNode>;
        insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
        onBlur: RealmNode<FocusEvent>;
    } & {
        codeBlockEditorDescriptors: RealmNode<CodeBlockEditorDescriptor[]>;
        defaultCodeBlockLanguage: RealmNode<string>;
        appendCodeBlockEditorDescriptor: RealmNode<CodeBlockEditorDescriptor>;
        insertCodeBlock: RealmNode<Partial<CreateCodeBlockNodeOptions>>;
    }>;
    useEmitter: <K extends "jsxComponentDescriptors" | "jsxIsAvailable" | "toMarkdownOptions" | "toMarkdownExtensions" | "mdastExtensions" | "syntaxExtensions" | "markdown" | "activeEditor" | "inFocus" | "historyState" | "currentSelection" | "initialRootEditorState" | "rootEditor" | "createRootEditorSubscription" | "createActiveEditorSubscription" | "importVisitors" | "usedLexicalNodes" | "addImportVisitor" | "addLexicalNode" | "addSyntaxExtension" | "addMdastExtension" | "addToMarkdownExtension" | "addExportVisitor" | "exportVisitors" | "initialMarkdown" | "setMarkdown" | "editorRootElementRef" | "contentEditableClassName" | "placeholder" | "autoFocus" | "readOnly" | "composerChildren" | "addComposerChild" | "topAreaChildren" | "addTopAreaChild" | "nestedEditorChildren" | "addNestedEditorChild" | "editorWrappers" | "addEditorWrapper" | "currentFormat" | "editorInFocus" | "applyFormat" | "currentBlockType" | "applyBlockType" | "convertSelectionToNode" | "insertDecoratorNode" | "onBlur" | "codeBlockEditorDescriptors" | "defaultCodeBlockLanguage" | "appendCodeBlockEditorDescriptor" | "insertCodeBlock" | "insertSandpack" | "sandpackConfig">(key: K, callback: (value: ValueForKey<{
        insertSandpack: RealmNode<string>;
        sandpackConfig: RealmNode<SandpackConfig>;
    } & {
        activeEditor: RealmNode<LexicalEditor | null>;
        inFocus: RealmNode<boolean>;
        historyState: RealmNode<HistoryState>;
        currentSelection: RealmNode<RangeSelection | null>;
        jsxIsAvailable: RealmNode<boolean>;
        jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
        initialRootEditorState: RealmNode<InitialEditorStateType>;
        rootEditor: RealmNode<LexicalEditor | null>;
        createRootEditorSubscription: RealmNode<EditorSubscription>;
        createActiveEditorSubscription: RealmNode<EditorSubscription>;
        importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
        addLexicalNode: RealmNode<Klass<LexicalNode>>;
        addSyntaxExtension: RealmNode<Extension>;
        addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
        toMarkdownExtensions: RealmNode<Options[]>;
        toMarkdownOptions: RealmNode<Options>;
        addToMarkdownExtension: RealmNode<Options>;
        addExportVisitor: RealmNode<LexicalVisitor>;
        exportVisitors: RealmNode<LexicalVisitor[]>;
        initialMarkdown: RealmNode<string>;
        setMarkdown: RealmNode<string>;
        markdown: RealmNode<string>;
        editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<React.ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<React.ComponentType<{}>[]>;
        addComposerChild: RealmNode<React.ComponentType<{}>>;
        topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<React.ComponentType<{}>>;
        nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
        editorWrappers: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>>;
        currentFormat: RealmNode<number>;
        editorInFocus: RealmNode<EditorInFocus | null>;
        applyFormat: RealmNode<TextFormatType>;
        currentBlockType: RealmNode<BlockType>;
        applyBlockType: RealmNode<BlockType>;
        convertSelectionToNode: RealmNode<() => ElementNode>;
        insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
        onBlur: RealmNode<FocusEvent>;
    } & {
        codeBlockEditorDescriptors: RealmNode<CodeBlockEditorDescriptor[]>;
        defaultCodeBlockLanguage: RealmNode<string>;
        appendCodeBlockEditorDescriptor: RealmNode<CodeBlockEditorDescriptor>;
        insertCodeBlock: RealmNode<Partial<CreateCodeBlockNodeOptions>>;
    }, K>) => void) => void;
    useEmitterValues: <K_1 extends SystemKeys<{
        insertSandpack: RealmNode<string>;
        sandpackConfig: RealmNode<SandpackConfig>;
    } & {
        activeEditor: RealmNode<LexicalEditor | null>;
        inFocus: RealmNode<boolean>;
        historyState: RealmNode<HistoryState>;
        currentSelection: RealmNode<RangeSelection | null>;
        jsxIsAvailable: RealmNode<boolean>;
        jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
        initialRootEditorState: RealmNode<InitialEditorStateType>;
        rootEditor: RealmNode<LexicalEditor | null>;
        createRootEditorSubscription: RealmNode<EditorSubscription>;
        createActiveEditorSubscription: RealmNode<EditorSubscription>;
        importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
        addLexicalNode: RealmNode<Klass<LexicalNode>>;
        addSyntaxExtension: RealmNode<Extension>;
        addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
        toMarkdownExtensions: RealmNode<Options[]>;
        toMarkdownOptions: RealmNode<Options>;
        addToMarkdownExtension: RealmNode<Options>;
        addExportVisitor: RealmNode<LexicalVisitor>;
        exportVisitors: RealmNode<LexicalVisitor[]>;
        initialMarkdown: RealmNode<string>;
        setMarkdown: RealmNode<string>;
        markdown: RealmNode<string>;
        editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<React.ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<React.ComponentType<{}>[]>;
        addComposerChild: RealmNode<React.ComponentType<{}>>;
        topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<React.ComponentType<{}>>;
        nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
        editorWrappers: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>>;
        currentFormat: RealmNode<number>;
        editorInFocus: RealmNode<EditorInFocus | null>;
        applyFormat: RealmNode<TextFormatType>;
        currentBlockType: RealmNode<BlockType>;
        applyBlockType: RealmNode<BlockType>;
        convertSelectionToNode: RealmNode<() => ElementNode>;
        insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
        onBlur: RealmNode<FocusEvent>;
    } & {
        codeBlockEditorDescriptors: RealmNode<CodeBlockEditorDescriptor[]>;
        defaultCodeBlockLanguage: RealmNode<string>;
        appendCodeBlockEditorDescriptor: RealmNode<CodeBlockEditorDescriptor>;
        insertCodeBlock: RealmNode<Partial<CreateCodeBlockNodeOptions>>;
    }>>(...keys: K_1) => ValuesForKeys<{
        insertSandpack: RealmNode<string>;
        sandpackConfig: RealmNode<SandpackConfig>;
    } & {
        activeEditor: RealmNode<LexicalEditor | null>;
        inFocus: RealmNode<boolean>;
        historyState: RealmNode<HistoryState>;
        currentSelection: RealmNode<RangeSelection | null>;
        jsxIsAvailable: RealmNode<boolean>;
        jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
        initialRootEditorState: RealmNode<InitialEditorStateType>;
        rootEditor: RealmNode<LexicalEditor | null>;
        createRootEditorSubscription: RealmNode<EditorSubscription>;
        createActiveEditorSubscription: RealmNode<EditorSubscription>;
        importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
        addLexicalNode: RealmNode<Klass<LexicalNode>>;
        addSyntaxExtension: RealmNode<Extension>;
        addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
        toMarkdownExtensions: RealmNode<Options[]>;
        toMarkdownOptions: RealmNode<Options>;
        addToMarkdownExtension: RealmNode<Options>;
        addExportVisitor: RealmNode<LexicalVisitor>;
        exportVisitors: RealmNode<LexicalVisitor[]>;
        initialMarkdown: RealmNode<string>;
        setMarkdown: RealmNode<string>;
        markdown: RealmNode<string>;
        editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<React.ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<React.ComponentType<{}>[]>;
        addComposerChild: RealmNode<React.ComponentType<{}>>;
        topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<React.ComponentType<{}>>;
        nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
        editorWrappers: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>>;
        currentFormat: RealmNode<number>;
        editorInFocus: RealmNode<EditorInFocus | null>;
        applyFormat: RealmNode<TextFormatType>;
        currentBlockType: RealmNode<BlockType>;
        applyBlockType: RealmNode<BlockType>;
        convertSelectionToNode: RealmNode<() => ElementNode>;
        insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
        onBlur: RealmNode<FocusEvent>;
    } & {
        codeBlockEditorDescriptors: RealmNode<CodeBlockEditorDescriptor[]>;
        defaultCodeBlockLanguage: RealmNode<string>;
        appendCodeBlockEditorDescriptor: RealmNode<CodeBlockEditorDescriptor>;
        insertCodeBlock: RealmNode<Partial<CreateCodeBlockNodeOptions>>;
    }, K_1>;
    usePubKeys: () => (values: SystemDict<{
        insertSandpack: RealmNode<string>;
        sandpackConfig: RealmNode<SandpackConfig>;
    } & {
        activeEditor: RealmNode<LexicalEditor | null>;
        inFocus: RealmNode<boolean>;
        historyState: RealmNode<HistoryState>;
        currentSelection: RealmNode<RangeSelection | null>;
        jsxIsAvailable: RealmNode<boolean>;
        jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
        initialRootEditorState: RealmNode<InitialEditorStateType>;
        rootEditor: RealmNode<LexicalEditor | null>;
        createRootEditorSubscription: RealmNode<EditorSubscription>;
        createActiveEditorSubscription: RealmNode<EditorSubscription>;
        importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
        addLexicalNode: RealmNode<Klass<LexicalNode>>;
        addSyntaxExtension: RealmNode<Extension>;
        addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
        toMarkdownExtensions: RealmNode<Options[]>;
        toMarkdownOptions: RealmNode<Options>;
        addToMarkdownExtension: RealmNode<Options>;
        addExportVisitor: RealmNode<LexicalVisitor>;
        exportVisitors: RealmNode<LexicalVisitor[]>;
        initialMarkdown: RealmNode<string>;
        setMarkdown: RealmNode<string>;
        markdown: RealmNode<string>;
        editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<React.ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<React.ComponentType<{}>[]>;
        addComposerChild: RealmNode<React.ComponentType<{}>>;
        topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<React.ComponentType<{}>>;
        nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
        editorWrappers: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>>;
        currentFormat: RealmNode<number>;
        editorInFocus: RealmNode<EditorInFocus | null>;
        applyFormat: RealmNode<TextFormatType>;
        currentBlockType: RealmNode<BlockType>;
        applyBlockType: RealmNode<BlockType>;
        convertSelectionToNode: RealmNode<() => ElementNode>;
        insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
        onBlur: RealmNode<FocusEvent>;
    } & {
        codeBlockEditorDescriptors: RealmNode<CodeBlockEditorDescriptor[]>;
        defaultCodeBlockLanguage: RealmNode<string>;
        appendCodeBlockEditorDescriptor: RealmNode<CodeBlockEditorDescriptor>;
        insertCodeBlock: RealmNode<Partial<CreateCodeBlockNodeOptions>>;
    }>) => void;
    usePublisher: <K_2 extends "jsxComponentDescriptors" | "jsxIsAvailable" | "toMarkdownOptions" | "toMarkdownExtensions" | "mdastExtensions" | "syntaxExtensions" | "markdown" | "activeEditor" | "inFocus" | "historyState" | "currentSelection" | "initialRootEditorState" | "rootEditor" | "createRootEditorSubscription" | "createActiveEditorSubscription" | "importVisitors" | "usedLexicalNodes" | "addImportVisitor" | "addLexicalNode" | "addSyntaxExtension" | "addMdastExtension" | "addToMarkdownExtension" | "addExportVisitor" | "exportVisitors" | "initialMarkdown" | "setMarkdown" | "editorRootElementRef" | "contentEditableClassName" | "placeholder" | "autoFocus" | "readOnly" | "composerChildren" | "addComposerChild" | "topAreaChildren" | "addTopAreaChild" | "nestedEditorChildren" | "addNestedEditorChild" | "editorWrappers" | "addEditorWrapper" | "currentFormat" | "editorInFocus" | "applyFormat" | "currentBlockType" | "applyBlockType" | "convertSelectionToNode" | "insertDecoratorNode" | "onBlur" | "codeBlockEditorDescriptors" | "defaultCodeBlockLanguage" | "appendCodeBlockEditorDescriptor" | "insertCodeBlock" | "insertSandpack" | "sandpackConfig">(key: K_2) => (value: ValueForKey<{
        insertSandpack: RealmNode<string>;
        sandpackConfig: RealmNode<SandpackConfig>;
    } & {
        activeEditor: RealmNode<LexicalEditor | null>;
        inFocus: RealmNode<boolean>;
        historyState: RealmNode<HistoryState>;
        currentSelection: RealmNode<RangeSelection | null>;
        jsxIsAvailable: RealmNode<boolean>;
        jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
        initialRootEditorState: RealmNode<InitialEditorStateType>;
        rootEditor: RealmNode<LexicalEditor | null>;
        createRootEditorSubscription: RealmNode<EditorSubscription>;
        createActiveEditorSubscription: RealmNode<EditorSubscription>;
        importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
        addLexicalNode: RealmNode<Klass<LexicalNode>>;
        addSyntaxExtension: RealmNode<Extension>;
        addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
        toMarkdownExtensions: RealmNode<Options[]>;
        toMarkdownOptions: RealmNode<Options>;
        addToMarkdownExtension: RealmNode<Options>;
        addExportVisitor: RealmNode<LexicalVisitor>;
        exportVisitors: RealmNode<LexicalVisitor[]>;
        initialMarkdown: RealmNode<string>;
        setMarkdown: RealmNode<string>;
        markdown: RealmNode<string>;
        editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<React.ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<React.ComponentType<{}>[]>;
        addComposerChild: RealmNode<React.ComponentType<{}>>;
        topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<React.ComponentType<{}>>;
        nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
        editorWrappers: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<React.ComponentType<{
            children: React.ReactNode;
        }>>;
        currentFormat: RealmNode<number>;
        editorInFocus: RealmNode<EditorInFocus | null>;
        applyFormat: RealmNode<TextFormatType>;
        currentBlockType: RealmNode<BlockType>;
        applyBlockType: RealmNode<BlockType>;
        convertSelectionToNode: RealmNode<() => ElementNode>;
        insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
        onBlur: RealmNode<FocusEvent>;
    } & {
        codeBlockEditorDescriptors: RealmNode<CodeBlockEditorDescriptor[]>;
        defaultCodeBlockLanguage: RealmNode<string>;
        appendCodeBlockEditorDescriptor: RealmNode<CodeBlockEditorDescriptor>;
        insertCodeBlock: RealmNode<Partial<CreateCodeBlockNodeOptions>>;
    }, K_2>) => void;
};
export {};
