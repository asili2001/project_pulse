import type { Options } from 'mdast-util-to-markdown';
import type { Config } from 'mdast-util-from-markdown/lib';
import type { Extension } from 'micromark-util-types';
import type { Content } from 'mdast';
import type { MdastImportVisitor, LexicalVisitor } from '../..';
import type { EditorSubscription, EditorInFocus, BlockType } from '../core';
import type { InitialEditorStateType } from '@lexical/react/LexicalComposer';
import type { HistoryState } from '@lexical/history';
import type { LexicalEditor, RangeSelection, Klass, LexicalNode, TextFormatType, ElementNode, DecoratorNode } from 'lexical';
import type { SystemSpec, Realm, RealmNode, PluginConstructor, TypedRealm, ValueForKey, SystemKeys, ValuesForKeys, SystemDict } from '../../gurx';
import type { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx';
import React from 'react';
/**
 * @internal
 */
export type MdastJsx = MdxJsxTextElement | MdxJsxFlowElement;
/**
 * Defines the structure of a JSX component property.
 */
export interface JsxPropertyDescriptor {
    /**
     * The name of the property
     */
    name: string;
    /**
     * The type of the property
     */
    type: 'string' | 'number';
    /**
     * Wether the property is required
     */
    required?: boolean;
}
/**
 * Defines the structure of a JSX component that can be used within the markdown document.
 */
export interface JsxComponentDescriptor {
    /**
     * The tag name
     */
    name: string;
    /**
     * Wether the component is a flow or text component (inline or block)
     */
    kind: 'flow' | 'text';
    /**
     * The module path from which the component can be imported
     * Omit to skip injecting an import statement
     */
    source?: string;
    /**
     * Wether the component is the default export of the module
     */
    defaultExport?: boolean;
    /**
     * The properties that can be applied to the component
     */
    props: JsxPropertyDescriptor[];
    /**
     * Wether or not the component has children
     */
    hasChildren?: boolean;
    /**
     * The editor to use for editing the component
     */
    Editor: React.ComponentType<JsxEditorProps>;
}
/**
 * The properties passed to a JSX Editor component.
 */
export interface JsxEditorProps {
    /** The MDAST node to edit */
    mdastNode: MdastJsx;
    descriptor: JsxComponentDescriptor;
}
interface InsertJsxPayload {
    name: string;
    kind: 'flow' | 'text';
    props: Record<string, string>;
}
/** @internal */
export declare const jsxSystem: SystemSpec<[SystemSpec<[], (r: Realm) => {
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
    insertJsx: RealmNode<InsertJsxPayload>;
}>;
/**
 * The parameters of the `jsxPlugin`.
 */
export interface JsxPluginParams {
    /**
     * A set of descriptors that document the JSX elements used in the document.
     */
    jsxComponentDescriptors: JsxComponentDescriptor[];
}
export declare const 
/** @internal */
jsxPlugin: PluginConstructor<SystemSpec<[SystemSpec<[], (r: Realm) => {
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
    insertJsx: RealmNode<InsertJsxPayload>;
}>, JsxPluginParams>, 
/** @internal */
jsxPluginHooks: {
    useRealmContext: () => TypedRealm<{
        insertJsx: RealmNode<InsertJsxPayload>;
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
    }>;
    useEmitter: <K extends "jsxComponentDescriptors" | "jsxIsAvailable" | "toMarkdownOptions" | "toMarkdownExtensions" | "mdastExtensions" | "syntaxExtensions" | "markdown" | "activeEditor" | "inFocus" | "historyState" | "currentSelection" | "initialRootEditorState" | "rootEditor" | "createRootEditorSubscription" | "createActiveEditorSubscription" | "importVisitors" | "usedLexicalNodes" | "addImportVisitor" | "addLexicalNode" | "addSyntaxExtension" | "addMdastExtension" | "addToMarkdownExtension" | "addExportVisitor" | "exportVisitors" | "initialMarkdown" | "setMarkdown" | "editorRootElementRef" | "contentEditableClassName" | "placeholder" | "autoFocus" | "readOnly" | "composerChildren" | "addComposerChild" | "topAreaChildren" | "addTopAreaChild" | "nestedEditorChildren" | "addNestedEditorChild" | "editorWrappers" | "addEditorWrapper" | "currentFormat" | "editorInFocus" | "applyFormat" | "currentBlockType" | "applyBlockType" | "convertSelectionToNode" | "insertDecoratorNode" | "onBlur" | "insertJsx">(key: K, callback: (value: ValueForKey<{
        insertJsx: RealmNode<InsertJsxPayload>;
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
    }, K>) => void) => void;
    useEmitterValues: <K_1 extends SystemKeys<{
        insertJsx: RealmNode<InsertJsxPayload>;
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
    }>>(...keys: K_1) => ValuesForKeys<{
        insertJsx: RealmNode<InsertJsxPayload>;
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
    }, K_1>;
    usePubKeys: () => (values: SystemDict<{
        insertJsx: RealmNode<InsertJsxPayload>;
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
    }>) => void;
    usePublisher: <K_2 extends "jsxComponentDescriptors" | "jsxIsAvailable" | "toMarkdownOptions" | "toMarkdownExtensions" | "mdastExtensions" | "syntaxExtensions" | "markdown" | "activeEditor" | "inFocus" | "historyState" | "currentSelection" | "initialRootEditorState" | "rootEditor" | "createRootEditorSubscription" | "createActiveEditorSubscription" | "importVisitors" | "usedLexicalNodes" | "addImportVisitor" | "addLexicalNode" | "addSyntaxExtension" | "addMdastExtension" | "addToMarkdownExtension" | "addExportVisitor" | "exportVisitors" | "initialMarkdown" | "setMarkdown" | "editorRootElementRef" | "contentEditableClassName" | "placeholder" | "autoFocus" | "readOnly" | "composerChildren" | "addComposerChild" | "topAreaChildren" | "addTopAreaChild" | "nestedEditorChildren" | "addNestedEditorChild" | "editorWrappers" | "addEditorWrapper" | "currentFormat" | "editorInFocus" | "applyFormat" | "currentBlockType" | "applyBlockType" | "convertSelectionToNode" | "insertDecoratorNode" | "onBlur" | "insertJsx">(key: K_2) => (value: ValueForKey<{
        insertJsx: RealmNode<InsertJsxPayload>;
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
    }, K_2>) => void;
};
export {};
