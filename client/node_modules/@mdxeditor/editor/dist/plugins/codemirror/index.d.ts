import type { CodeBlockEditorDescriptor, CreateCodeBlockNodeOptions } from '../codeblock';
import type { RefObject, ReactNode, ComponentType } from 'react';
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
/// <reference types="react" />
/** @internal */
export declare const codeMirrorSystem: SystemSpec<[SystemSpec<[], (r: Realm) => {
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
    editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<ComponentType<{}>[]>;
    addComposerChild: RealmNode<ComponentType<{}>>;
    topAreaChildren: RealmNode<ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<ComponentType<{}>>;
    nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<ComponentType<{}>>;
    editorWrappers: RealmNode<ComponentType<{
        children: ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<ComponentType<{
        children: ReactNode;
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
    editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<ComponentType<{}>[]>;
    addComposerChild: RealmNode<ComponentType<{}>>;
    topAreaChildren: RealmNode<ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<ComponentType<{}>>;
    nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<ComponentType<{}>>;
    editorWrappers: RealmNode<ComponentType<{
        children: ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<ComponentType<{
        children: ReactNode;
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
    editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<ComponentType<{}>[]>;
    addComposerChild: RealmNode<ComponentType<{}>>;
    topAreaChildren: RealmNode<ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<ComponentType<{}>>;
    nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<ComponentType<{}>>;
    editorWrappers: RealmNode<ComponentType<{
        children: ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<ComponentType<{
        children: ReactNode;
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
    editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<ComponentType<{}>[]>;
    addComposerChild: RealmNode<ComponentType<{}>>;
    topAreaChildren: RealmNode<ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<ComponentType<{}>>;
    nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<ComponentType<{}>>;
    editorWrappers: RealmNode<ComponentType<{
        children: ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<ComponentType<{
        children: ReactNode;
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
    codeBlockLanguages: RealmNode<Record<string, string>>;
    insertCodeMirror: RealmNode<{
        language: string;
        code: string;
    }>;
}>;
export declare const 
/** @internal */
codeMirrorPlugin: PluginConstructor<SystemSpec<[SystemSpec<[], (r: Realm) => {
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
    editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<ComponentType<{}>[]>;
    addComposerChild: RealmNode<ComponentType<{}>>;
    topAreaChildren: RealmNode<ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<ComponentType<{}>>;
    nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<ComponentType<{}>>;
    editorWrappers: RealmNode<ComponentType<{
        children: ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<ComponentType<{
        children: ReactNode;
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
    editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<ComponentType<{}>[]>;
    addComposerChild: RealmNode<ComponentType<{}>>;
    topAreaChildren: RealmNode<ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<ComponentType<{}>>;
    nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<ComponentType<{}>>;
    editorWrappers: RealmNode<ComponentType<{
        children: ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<ComponentType<{
        children: ReactNode;
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
    editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<ComponentType<{}>[]>;
    addComposerChild: RealmNode<ComponentType<{}>>;
    topAreaChildren: RealmNode<ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<ComponentType<{}>>;
    nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<ComponentType<{}>>;
    editorWrappers: RealmNode<ComponentType<{
        children: ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<ComponentType<{
        children: ReactNode;
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
    editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<ComponentType<{}>[]>;
    addComposerChild: RealmNode<ComponentType<{}>>;
    topAreaChildren: RealmNode<ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<ComponentType<{}>>;
    nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<ComponentType<{}>>;
    editorWrappers: RealmNode<ComponentType<{
        children: ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<ComponentType<{
        children: ReactNode;
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
    codeBlockLanguages: RealmNode<Record<string, string>>;
    insertCodeMirror: RealmNode<{
        language: string;
        code: string;
    }>;
}>, {
    codeBlockLanguages: Record<string, string>;
}>, 
/** @internal */
codeMirrorHooks: {
    useRealmContext: () => TypedRealm<{
        codeBlockLanguages: RealmNode<Record<string, string>>;
        insertCodeMirror: RealmNode<{
            language: string;
            code: string;
        }>;
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
        editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<ComponentType<{}>[]>;
        addComposerChild: RealmNode<ComponentType<{}>>;
        topAreaChildren: RealmNode<ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<ComponentType<{}>>;
        nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<ComponentType<{}>>;
        editorWrappers: RealmNode<ComponentType<{
            children: ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<ComponentType<{
            children: ReactNode;
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
    useEmitter: <K extends "jsxComponentDescriptors" | "jsxIsAvailable" | "toMarkdownOptions" | "toMarkdownExtensions" | "mdastExtensions" | "syntaxExtensions" | "markdown" | "activeEditor" | "inFocus" | "historyState" | "currentSelection" | "initialRootEditorState" | "rootEditor" | "createRootEditorSubscription" | "createActiveEditorSubscription" | "importVisitors" | "usedLexicalNodes" | "addImportVisitor" | "addLexicalNode" | "addSyntaxExtension" | "addMdastExtension" | "addToMarkdownExtension" | "addExportVisitor" | "exportVisitors" | "initialMarkdown" | "setMarkdown" | "editorRootElementRef" | "contentEditableClassName" | "placeholder" | "autoFocus" | "readOnly" | "composerChildren" | "addComposerChild" | "topAreaChildren" | "addTopAreaChild" | "nestedEditorChildren" | "addNestedEditorChild" | "editorWrappers" | "addEditorWrapper" | "currentFormat" | "editorInFocus" | "applyFormat" | "currentBlockType" | "applyBlockType" | "convertSelectionToNode" | "insertDecoratorNode" | "onBlur" | "codeBlockEditorDescriptors" | "defaultCodeBlockLanguage" | "appendCodeBlockEditorDescriptor" | "insertCodeBlock" | "codeBlockLanguages" | "insertCodeMirror">(key: K, callback: (value: ValueForKey<{
        codeBlockLanguages: RealmNode<Record<string, string>>;
        insertCodeMirror: RealmNode<{
            language: string;
            code: string;
        }>;
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
        editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<ComponentType<{}>[]>;
        addComposerChild: RealmNode<ComponentType<{}>>;
        topAreaChildren: RealmNode<ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<ComponentType<{}>>;
        nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<ComponentType<{}>>;
        editorWrappers: RealmNode<ComponentType<{
            children: ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<ComponentType<{
            children: ReactNode;
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
        codeBlockLanguages: RealmNode<Record<string, string>>;
        insertCodeMirror: RealmNode<{
            language: string;
            code: string;
        }>;
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
        editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<ComponentType<{}>[]>;
        addComposerChild: RealmNode<ComponentType<{}>>;
        topAreaChildren: RealmNode<ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<ComponentType<{}>>;
        nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<ComponentType<{}>>;
        editorWrappers: RealmNode<ComponentType<{
            children: ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<ComponentType<{
            children: ReactNode;
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
        codeBlockLanguages: RealmNode<Record<string, string>>;
        insertCodeMirror: RealmNode<{
            language: string;
            code: string;
        }>;
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
        editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<ComponentType<{}>[]>;
        addComposerChild: RealmNode<ComponentType<{}>>;
        topAreaChildren: RealmNode<ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<ComponentType<{}>>;
        nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<ComponentType<{}>>;
        editorWrappers: RealmNode<ComponentType<{
            children: ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<ComponentType<{
            children: ReactNode;
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
        codeBlockLanguages: RealmNode<Record<string, string>>;
        insertCodeMirror: RealmNode<{
            language: string;
            code: string;
        }>;
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
        editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<ComponentType<{}>[]>;
        addComposerChild: RealmNode<ComponentType<{}>>;
        topAreaChildren: RealmNode<ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<ComponentType<{}>>;
        nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<ComponentType<{}>>;
        editorWrappers: RealmNode<ComponentType<{
            children: ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<ComponentType<{
            children: ReactNode;
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
    usePublisher: <K_2 extends "jsxComponentDescriptors" | "jsxIsAvailable" | "toMarkdownOptions" | "toMarkdownExtensions" | "mdastExtensions" | "syntaxExtensions" | "markdown" | "activeEditor" | "inFocus" | "historyState" | "currentSelection" | "initialRootEditorState" | "rootEditor" | "createRootEditorSubscription" | "createActiveEditorSubscription" | "importVisitors" | "usedLexicalNodes" | "addImportVisitor" | "addLexicalNode" | "addSyntaxExtension" | "addMdastExtension" | "addToMarkdownExtension" | "addExportVisitor" | "exportVisitors" | "initialMarkdown" | "setMarkdown" | "editorRootElementRef" | "contentEditableClassName" | "placeholder" | "autoFocus" | "readOnly" | "composerChildren" | "addComposerChild" | "topAreaChildren" | "addTopAreaChild" | "nestedEditorChildren" | "addNestedEditorChild" | "editorWrappers" | "addEditorWrapper" | "currentFormat" | "editorInFocus" | "applyFormat" | "currentBlockType" | "applyBlockType" | "convertSelectionToNode" | "insertDecoratorNode" | "onBlur" | "codeBlockEditorDescriptors" | "defaultCodeBlockLanguage" | "appendCodeBlockEditorDescriptor" | "insertCodeBlock" | "codeBlockLanguages" | "insertCodeMirror">(key: K_2) => (value: ValueForKey<{
        codeBlockLanguages: RealmNode<Record<string, string>>;
        insertCodeMirror: RealmNode<{
            language: string;
            code: string;
        }>;
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
        editorRootElementRef: RealmNode<RefObject<HTMLDivElement> | null>;
        contentEditableClassName: RealmNode<string>;
        placeholder: RealmNode<ReactNode>;
        autoFocus: RealmNode<boolean | {
            defaultSelection?: "rootStart" | "rootEnd" | undefined;
            preventScroll?: boolean | undefined;
        }>;
        readOnly: RealmNode<boolean>;
        composerChildren: RealmNode<ComponentType<{}>[]>;
        addComposerChild: RealmNode<ComponentType<{}>>;
        topAreaChildren: RealmNode<ComponentType<{}>[]>;
        addTopAreaChild: RealmNode<ComponentType<{}>>;
        nestedEditorChildren: RealmNode<ComponentType<{}>[]>;
        addNestedEditorChild: RealmNode<ComponentType<{}>>;
        editorWrappers: RealmNode<ComponentType<{
            children: ReactNode;
        }>[]>;
        addEditorWrapper: RealmNode<ComponentType<{
            children: ReactNode;
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
