import type { Options } from 'mdast-util-to-markdown/lib/types';
import type { Config } from 'mdast-util-from-markdown/lib';
import type { Extension } from 'micromark-util-types';
import type { HistoryState } from '@lexical/history';
import { InitialEditorStateType } from '@lexical/react/LexicalComposer.js';
import { HeadingTagType } from '@lexical/rich-text';
import type { LexicalCommand, DecoratorNode,  ElementNode,  Klass,  LexicalEditor,  LexicalNode,  RangeSelection,  TextFormatType } from 'lexical';
import * as Mdast from 'mdast';
import React from 'react';
import type { LexicalVisitor, LexicalConvertOptions } from '../../exportMarkdownFromLexical';
import type { SystemSpec, Realm, PluginConstructor, TypedRealm, ValueForKey, SystemKeys, ValuesForKeys, SystemDict, RealmNode } from '../../gurx';
import { MdastImportVisitor } from '../../importMarkdownToLexical';
import type { JsxComponentDescriptor } from '../jsx';
/** @internal */
export type EditorSubscription = (activeEditor: LexicalEditor) => () => void;
/** @internal */
export type BlockType = 'paragraph' | 'quote' | HeadingTagType | '';
/**
 * The type of the editor being edited currently. Custom editors can override this, so that the toolbar can change contents.
 */
export interface EditorInFocus {
    editorType: string;
    rootNode: LexicalNode | null;
}
/** @internal */
export declare const NESTED_EDITOR_UPDATED_COMMAND: LexicalCommand<void>;
/**
 * Add the the core system when creating systemf for your own plugins.
 * This gives you access to the component core state and logic, like the visitors, the lexical nodes, and the publishers used to insert nodes in the editor.
 */
export declare const coreSystem: SystemSpec<[], (r: Realm) => {
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
    importVisitors: RealmNode<MdastImportVisitor<Mdast.Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Mdast.Content>>;
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
}>;
interface CorePluginParams {
    initialMarkdown: string;
    contentEditableClassName: string;
    placeholder?: React.ReactNode;
    autoFocus: boolean | {
        defaultSelection?: 'rootStart' | 'rootEnd';
        preventScroll?: boolean | undefined;
    };
    onChange: (markdown: string) => void;
    onBlur?: (e: FocusEvent) => void;
    toMarkdownOptions: NonNullable<LexicalConvertOptions['toMarkdownOptions']>;
    readOnly: boolean;
}
export declare const 
/** @internal */
corePlugin: PluginConstructor<SystemSpec<[], (r: Realm) => {
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
    importVisitors: RealmNode<MdastImportVisitor<Mdast.Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Mdast.Content>>;
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
}>, CorePluginParams>, 
/** @internal */
corePluginHooks: {
    useRealmContext: () => TypedRealm<{
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
        importVisitors: RealmNode<MdastImportVisitor<Mdast.Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Mdast.Content>>;
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
    }>;
    useEmitter: <K extends "jsxComponentDescriptors" | "jsxIsAvailable" | "toMarkdownOptions" | "toMarkdownExtensions" | "mdastExtensions" | "syntaxExtensions" | "markdown" | "activeEditor" | "inFocus" | "historyState" | "currentSelection" | "initialRootEditorState" | "rootEditor" | "createRootEditorSubscription" | "createActiveEditorSubscription" | "importVisitors" | "usedLexicalNodes" | "addImportVisitor" | "addLexicalNode" | "addSyntaxExtension" | "addMdastExtension" | "addToMarkdownExtension" | "addExportVisitor" | "exportVisitors" | "initialMarkdown" | "setMarkdown" | "editorRootElementRef" | "contentEditableClassName" | "placeholder" | "autoFocus" | "readOnly" | "composerChildren" | "addComposerChild" | "topAreaChildren" | "addTopAreaChild" | "nestedEditorChildren" | "addNestedEditorChild" | "editorWrappers" | "addEditorWrapper" | "currentFormat" | "editorInFocus" | "applyFormat" | "currentBlockType" | "applyBlockType" | "convertSelectionToNode" | "insertDecoratorNode" | "onBlur">(key: K, callback: (value: ValueForKey<{
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
        importVisitors: RealmNode<MdastImportVisitor<Mdast.Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Mdast.Content>>;
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
    }, K>) => void) => void;
    useEmitterValues: <K_1 extends SystemKeys<{
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
        importVisitors: RealmNode<MdastImportVisitor<Mdast.Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Mdast.Content>>;
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
    }>>(...keys: K_1) => ValuesForKeys<{
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
        importVisitors: RealmNode<MdastImportVisitor<Mdast.Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Mdast.Content>>;
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
    }, K_1>;
    usePubKeys: () => (values: SystemDict<{
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
        importVisitors: RealmNode<MdastImportVisitor<Mdast.Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Mdast.Content>>;
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
    }>) => void;
    usePublisher: <K_2 extends "jsxComponentDescriptors" | "jsxIsAvailable" | "toMarkdownOptions" | "toMarkdownExtensions" | "mdastExtensions" | "syntaxExtensions" | "markdown" | "activeEditor" | "inFocus" | "historyState" | "currentSelection" | "initialRootEditorState" | "rootEditor" | "createRootEditorSubscription" | "createActiveEditorSubscription" | "importVisitors" | "usedLexicalNodes" | "addImportVisitor" | "addLexicalNode" | "addSyntaxExtension" | "addMdastExtension" | "addToMarkdownExtension" | "addExportVisitor" | "exportVisitors" | "initialMarkdown" | "setMarkdown" | "editorRootElementRef" | "contentEditableClassName" | "placeholder" | "autoFocus" | "readOnly" | "composerChildren" | "addComposerChild" | "topAreaChildren" | "addTopAreaChild" | "nestedEditorChildren" | "addNestedEditorChild" | "editorWrappers" | "addEditorWrapper" | "currentFormat" | "editorInFocus" | "applyFormat" | "currentBlockType" | "applyBlockType" | "convertSelectionToNode" | "insertDecoratorNode" | "onBlur">(key: K_2) => (value: ValueForKey<{
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
        importVisitors: RealmNode<MdastImportVisitor<Mdast.Content>[]>;
        syntaxExtensions: RealmNode<Extension[]>;
        mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
        usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
        addImportVisitor: RealmNode<MdastImportVisitor<Mdast.Content>>;
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
    }, K_2>) => void;
};
export {};
