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
import type { SystemSpec, Realm, RealmNode, PluginConstructor, TypedRealm, ValueForKey, SystemKeys, ValuesForKeys, SystemDict } from '../../gurx';
/// <reference types="react" />
import type { RangeSelection, Klass, LexicalNode, TextFormatType, ElementNode, DecoratorNode, LexicalCommand,  LexicalEditor } from 'lexical';
import { CreateImageNodeOptions } from './ImageNode';
export * from './ImageNode';
export type ImageUploadHandler = ((image: File) => Promise<string>) | null;
export type ImagePreviewHandler = ((imageSource: string) => Promise<string>) | null;
export interface InsertImageFormValues {
    src?: string;
    altText?: string;
    title?: string;
    file: FileList;
}
type InactiveImageDialogState = {
    type: 'inactive';
};
type NewImageDialogState = {
    type: 'new';
};
type EditingImageDialogState = {
    type: 'editing';
    nodeKey: string;
    initialValues: Omit<InsertImageFormValues, 'file'>;
};
/** @internal */
export declare const imageSystem: SystemSpec<[SystemSpec<[], (r: Realm) => {
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
}>], (r: Realm, [{ rootEditor }]: [{
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
    imageDialogState: RealmNode<InactiveImageDialogState | NewImageDialogState | EditingImageDialogState>;
    saveImage: RealmNode<InsertImageFormValues>;
    openNewImageDialog: RealmNode<true>;
    openEditImageDialog: RealmNode<Omit<EditingImageDialogState, "type">>;
    closeImageDialog: RealmNode<true>;
    imageUploadHandler: RealmNode<ImageUploadHandler>;
    imageAutocompleteSuggestions: RealmNode<string[]>;
    disableImageResize: RealmNode<boolean>;
    insertImage: RealmNode<InsertImageFormValues>;
    imagePreviewHandler: RealmNode<ImagePreviewHandler>;
}>;
interface ImagePluginParams {
    imageUploadHandler?: ImageUploadHandler;
    imageAutocompleteSuggestions?: string[];
    disableImageResize?: boolean;
    imagePreviewHandler?: ImagePreviewHandler;
}
export declare const 
/** @internal */
imagePlugin: PluginConstructor<SystemSpec<[SystemSpec<[], (r: Realm) => {
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
}>], (r: Realm, [{ rootEditor }]: [{
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
    imageDialogState: RealmNode<InactiveImageDialogState | NewImageDialogState | EditingImageDialogState>;
    saveImage: RealmNode<InsertImageFormValues>;
    openNewImageDialog: RealmNode<true>;
    openEditImageDialog: RealmNode<Omit<EditingImageDialogState, "type">>;
    closeImageDialog: RealmNode<true>;
    imageUploadHandler: RealmNode<ImageUploadHandler>;
    imageAutocompleteSuggestions: RealmNode<string[]>;
    disableImageResize: RealmNode<boolean>;
    insertImage: RealmNode<InsertImageFormValues>;
    imagePreviewHandler: RealmNode<ImagePreviewHandler>;
}>, ImagePluginParams>, 
/** @internal */
imagePluginHooks: {
    useRealmContext: () => TypedRealm<{
        imageDialogState: RealmNode<InactiveImageDialogState | NewImageDialogState | EditingImageDialogState>;
        saveImage: RealmNode<InsertImageFormValues>;
        openNewImageDialog: RealmNode<true>;
        openEditImageDialog: RealmNode<Omit<EditingImageDialogState, "type">>;
        closeImageDialog: RealmNode<true>;
        imageUploadHandler: RealmNode<ImageUploadHandler>;
        imageAutocompleteSuggestions: RealmNode<string[]>;
        disableImageResize: RealmNode<boolean>;
        insertImage: RealmNode<InsertImageFormValues>;
        imagePreviewHandler: RealmNode<ImagePreviewHandler>;
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
    }>;
    useEmitter: <K extends "jsxComponentDescriptors" | "jsxIsAvailable" | "toMarkdownOptions" | "toMarkdownExtensions" | "mdastExtensions" | "syntaxExtensions" | "markdown" | "activeEditor" | "inFocus" | "historyState" | "currentSelection" | "initialRootEditorState" | "rootEditor" | "createRootEditorSubscription" | "createActiveEditorSubscription" | "importVisitors" | "usedLexicalNodes" | "addImportVisitor" | "addLexicalNode" | "addSyntaxExtension" | "addMdastExtension" | "addToMarkdownExtension" | "addExportVisitor" | "exportVisitors" | "initialMarkdown" | "setMarkdown" | "editorRootElementRef" | "contentEditableClassName" | "placeholder" | "autoFocus" | "readOnly" | "composerChildren" | "addComposerChild" | "topAreaChildren" | "addTopAreaChild" | "nestedEditorChildren" | "addNestedEditorChild" | "editorWrappers" | "addEditorWrapper" | "currentFormat" | "editorInFocus" | "applyFormat" | "currentBlockType" | "applyBlockType" | "convertSelectionToNode" | "insertDecoratorNode" | "onBlur" | "imageDialogState" | "saveImage" | "openNewImageDialog" | "openEditImageDialog" | "closeImageDialog" | "imageUploadHandler" | "imageAutocompleteSuggestions" | "disableImageResize" | "insertImage" | "imagePreviewHandler">(key: K, callback: (value: ValueForKey<{
        imageDialogState: RealmNode<InactiveImageDialogState | NewImageDialogState | EditingImageDialogState>;
        saveImage: RealmNode<InsertImageFormValues>;
        openNewImageDialog: RealmNode<true>;
        openEditImageDialog: RealmNode<Omit<EditingImageDialogState, "type">>;
        closeImageDialog: RealmNode<true>;
        imageUploadHandler: RealmNode<ImageUploadHandler>;
        imageAutocompleteSuggestions: RealmNode<string[]>;
        disableImageResize: RealmNode<boolean>;
        insertImage: RealmNode<InsertImageFormValues>;
        imagePreviewHandler: RealmNode<ImagePreviewHandler>;
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
    }, K>) => void) => void;
    useEmitterValues: <K_1 extends SystemKeys<{
        imageDialogState: RealmNode<InactiveImageDialogState | NewImageDialogState | EditingImageDialogState>;
        saveImage: RealmNode<InsertImageFormValues>;
        openNewImageDialog: RealmNode<true>;
        openEditImageDialog: RealmNode<Omit<EditingImageDialogState, "type">>;
        closeImageDialog: RealmNode<true>;
        imageUploadHandler: RealmNode<ImageUploadHandler>;
        imageAutocompleteSuggestions: RealmNode<string[]>;
        disableImageResize: RealmNode<boolean>;
        insertImage: RealmNode<InsertImageFormValues>;
        imagePreviewHandler: RealmNode<ImagePreviewHandler>;
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
    }>>(...keys: K_1) => ValuesForKeys<{
        imageDialogState: RealmNode<InactiveImageDialogState | NewImageDialogState | EditingImageDialogState>;
        saveImage: RealmNode<InsertImageFormValues>;
        openNewImageDialog: RealmNode<true>;
        openEditImageDialog: RealmNode<Omit<EditingImageDialogState, "type">>;
        closeImageDialog: RealmNode<true>;
        imageUploadHandler: RealmNode<ImageUploadHandler>;
        imageAutocompleteSuggestions: RealmNode<string[]>;
        disableImageResize: RealmNode<boolean>;
        insertImage: RealmNode<InsertImageFormValues>;
        imagePreviewHandler: RealmNode<ImagePreviewHandler>;
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
    }, K_1>;
    usePubKeys: () => (values: SystemDict<{
        imageDialogState: RealmNode<InactiveImageDialogState | NewImageDialogState | EditingImageDialogState>;
        saveImage: RealmNode<InsertImageFormValues>;
        openNewImageDialog: RealmNode<true>;
        openEditImageDialog: RealmNode<Omit<EditingImageDialogState, "type">>;
        closeImageDialog: RealmNode<true>;
        imageUploadHandler: RealmNode<ImageUploadHandler>;
        imageAutocompleteSuggestions: RealmNode<string[]>;
        disableImageResize: RealmNode<boolean>;
        insertImage: RealmNode<InsertImageFormValues>;
        imagePreviewHandler: RealmNode<ImagePreviewHandler>;
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
    }>) => void;
    usePublisher: <K_2 extends "jsxComponentDescriptors" | "jsxIsAvailable" | "toMarkdownOptions" | "toMarkdownExtensions" | "mdastExtensions" | "syntaxExtensions" | "markdown" | "activeEditor" | "inFocus" | "historyState" | "currentSelection" | "initialRootEditorState" | "rootEditor" | "createRootEditorSubscription" | "createActiveEditorSubscription" | "importVisitors" | "usedLexicalNodes" | "addImportVisitor" | "addLexicalNode" | "addSyntaxExtension" | "addMdastExtension" | "addToMarkdownExtension" | "addExportVisitor" | "exportVisitors" | "initialMarkdown" | "setMarkdown" | "editorRootElementRef" | "contentEditableClassName" | "placeholder" | "autoFocus" | "readOnly" | "composerChildren" | "addComposerChild" | "topAreaChildren" | "addTopAreaChild" | "nestedEditorChildren" | "addNestedEditorChild" | "editorWrappers" | "addEditorWrapper" | "currentFormat" | "editorInFocus" | "applyFormat" | "currentBlockType" | "applyBlockType" | "convertSelectionToNode" | "insertDecoratorNode" | "onBlur" | "imageDialogState" | "saveImage" | "openNewImageDialog" | "openEditImageDialog" | "closeImageDialog" | "imageUploadHandler" | "imageAutocompleteSuggestions" | "disableImageResize" | "insertImage" | "imagePreviewHandler">(key: K_2) => (value: ValueForKey<{
        imageDialogState: RealmNode<InactiveImageDialogState | NewImageDialogState | EditingImageDialogState>;
        saveImage: RealmNode<InsertImageFormValues>;
        openNewImageDialog: RealmNode<true>;
        openEditImageDialog: RealmNode<Omit<EditingImageDialogState, "type">>;
        closeImageDialog: RealmNode<true>;
        imageUploadHandler: RealmNode<ImageUploadHandler>;
        imageAutocompleteSuggestions: RealmNode<string[]>;
        disableImageResize: RealmNode<boolean>;
        insertImage: RealmNode<InsertImageFormValues>;
        imagePreviewHandler: RealmNode<ImagePreviewHandler>;
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
    }, K_2>) => void;
};
/** @internal */
export type InsertImagePayload = Readonly<CreateImageNodeOptions>;
/**
 * @internal
 */
export declare const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload>;
declare global {
    interface DragEvent {
        rangeOffset?: number;
        rangeParent?: Node;
    }
}
