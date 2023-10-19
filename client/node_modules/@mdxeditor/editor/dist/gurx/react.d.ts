import React from 'react';
import { RealmNode } from './realm';
import type { ValuesForKeys, TypedRealm,  System,  RealmFactory,  ValueForKey,  SystemKeys,  SystemDict,  AnySystemSpec,  SystemOfSpecs } from './realmFactory';
/**
 * Describes the mapping between the system streams and the component properties.
 * Each property uses the keys as the names of the properties and the values as the corresponding stream names.
 * @typeParam SS - the type of the system.
 */
export interface SystemPropsMap<Sys extends System, K = keyof Sys, D = {
    [name: string]: K;
}> {
    /**
     * Specifies the required component properties.
     */
    required?: D;
    /**
     * Specifies the optional component properties.
     */
    optional?: D;
    /**
     * Specifies the component methods, if any. Streams are converted to methods with a single argument.
     * When invoked, the method publishes the value of the argument to the specified stream.
     */
    methods?: D;
    /**
     * Specifies the component "event" properties, if any.
     * Event properties accept callback functions which get executed when the stream emits a new value.
     */
    events?: D;
}
type StringKeys<T> = Extract<keyof T, string>;
/** @internal */
export type PropsFromPropMap<Sys extends System, Map extends SystemPropsMap<Sys>> = {
    [K in StringKeys<Map['required']>]: Map['required'][K] extends string ? Sys[Map['required'][K]] extends RealmNode<infer R> ? R : never : never;
} & {
    [K in StringKeys<Map['optional']>]?: Map['optional'][K] extends string ? Sys[Map['optional'][K]] extends RealmNode<infer R> ? R : never : never;
} & {
    [K in StringKeys<Map['events']>]?: Map['events'][K] extends string ? Sys[Map['events'][K]] extends RealmNode<infer R> ? (value: R) => void : never : never;
};
/** @internal */
export type MethodsFromPropMap<Sys extends System, Map extends SystemPropsMap<Sys>> = {
    [K in StringKeys<Map['methods']>]: Map['methods'][K] extends string ? Sys[Map['methods'][K]] extends RealmNode<infer R> ? (value: R) => void : never : never;
};
/**
 * @internal
 * Used to correctly specify type refs for system components.
 *
 * @example
 * ```tsx
 * const s = system(() => { return { a: statefulStream(0) } })
 * const { Component } = systemToComponent(s)
 *
 * const App = () => {
 *  const ref = useRef<RefHandle<typeof Component>>()
 *  return <Component ref={ref} />
 * }
 * ```
 *
 * @typeParam T - the type of the component
 */
export type RefHandle<T> = T extends React.ForwardRefExoticComponent<React.RefAttributes<infer Handle>> ? Handle : never;
/**
 * Converts a system spec to React component by mapping the system streams to component properties, events and methods. Returns hooks for querying and modifying
 * the system streams from the component's child components.
 * @param realmFactory - The return value from a [[system]] call.
 * @param map - The streams to props / events / methods mapping Check [[SystemPropsMap]] for more details.
 * @param Root - The optional React component to render. By default, the resulting component renders nothing, acting as a logical wrapper for its children.
 * @returns an object containing the following:
 *  - `Component`: the React component.
 *  - `useEmitterValue`: a hook that lets child components use values emitted from the specified output stream.
 *  - `useEmitter`: a hook that calls the provided callback whenever the specified stream emits a value.
 *  - `usePublisher`: a hook which lets child components publish values to the specified stream.
 *  <hr />
 */
export declare function realmFactoryToComponent<RootComp, RF extends RealmFactory<Sys>, Sys extends System = RF extends RealmFactory<infer S> ? S : never, Realm extends TypedRealm<Sys> = TypedRealm<Sys>, M extends SystemPropsMap<Sys> = SystemPropsMap<Sys>>(realmFactory: RF, map: M, Root?: RootComp): {
    useRealmContext: () => TypedRealm<Sys>;
    useEmitter: <K extends Extract<keyof Sys, string>>(key: K, callback: (value: ValueForKey<Sys, K>) => void) => void;
    useEmitterValues: <K_1 extends SystemKeys<Sys>>(...keys: K_1) => ValuesForKeys<Sys, K_1>;
    usePubKeys: () => (values: SystemDict<Sys>) => void;
    usePublisher: <K_2 extends keyof Sys>(key: K_2) => (value: ValueForKey<Sys, K_2>) => void;
    Component: React.ForwardRefExoticComponent<React.PropsWithoutRef<{ [K_3 in Extract<keyof M["required"], string>]: M["required"][K_3] extends string ? Sys[M["required"][K_3]] extends RealmNode<infer R> ? R : never : never; } & { [K_4 in Extract<keyof M["optional"], string>]?: (M["optional"][K_4] extends string ? Sys[M["optional"][K_4]] extends RealmNode<infer R_1> ? R_1 : never : never) | undefined; } & { [K_5 in Extract<keyof M["events"], string>]?: (M["events"][K_5] extends string ? Sys[M["events"][K_5]] extends RealmNode<infer R_2> ? (value: R_2) => void : never : never) | undefined; } & (RootComp extends React.ComponentType<infer RP> ? RP : {
        children?: React.ReactNode;
    })> & React.RefAttributes<MethodsFromPropMap<Sys, M>>>;
};
/** @internal */
export declare function sysHooks<Sys extends System>(): {
    useRealmContext: () => TypedRealm<Sys>;
    useEmitter: <K extends Extract<keyof Sys, string>>(key: K, callback: (value: ValueForKey<Sys, K>) => void) => void;
    useEmitterValues: <K_1 extends SystemKeys<Sys>>(...keys: K_1) => ValuesForKeys<Sys, K_1>;
    usePubKeys: () => (values: SystemDict<Sys>) => void;
    usePublisher: <K_2 extends keyof Sys>(key: K_2) => (value: ValueForKey<Sys, K_2>) => void;
};
type SystemAndDependencies<Spec extends AnySystemSpec> = SystemOfSpecs<[Spec]> & SystemOfSpecs<Spec['dependencies']>;
/**
 * The parameters of a plugin declaration. THe best way to understand what each one does is to examine the source code of the existing plugins.
 */
export interface RealmPluginParams<Spec extends AnySystemSpec, Params extends object> {
    /**
     * The id of the plugin. Used to declare conditional features that are activated only if the plugin is present.
     */
    id: string;
    /**
     * The ids of the plugins that this plugin depends on. The plugin will not be activated if any of the dependencies is not present.
     */
    dependencies?: string[];
    /**
     * The system spec of the plugin. Construct one using {@link system}.
     */
    systemSpec: Spec;
    /**
     * The callback is executed every time the react component is re-rendered.
     */
    applyParamsToSystem?: (realm: TypedRealm<SystemAndDependencies<Spec>>, props: Params) => void;
    /**
     * Executed when the component mounts. Use this to register import/export visitors, add lexical nodes to the editor, etc.
     * @param realm - the realm instance
     * @param params - the parameters passed to the plugin in the component declaration
     * @param pluginIds - the ids of all the plugins that are present in the component declaration
     */
    init?: (realm: TypedRealm<SystemAndDependencies<Spec>>, params: Params, pluginIds: string[]) => void;
}
/** @internal */
export interface PluginConstructor<Spec extends AnySystemSpec, Params extends object> {
    (params?: Params): {
        pluginParams?: Params;
    } & RealmPluginParams<Spec, Params>;
}
/**
 * Declares a new MDXEditor plugin.
 */
export declare function realmPlugin<Spec extends AnySystemSpec, Params extends object>(params: RealmPluginParams<Spec, Params>): readonly [PluginConstructor<Spec, Params>, {
    useRealmContext: () => TypedRealm<SystemAndDependencies<Spec>>;
    useEmitter: <K extends Extract<keyof (Spec extends AnySystemSpec ? {} & ReturnType<Spec["constructor"]> : never), string> | Extract<keyof SystemOfSpecs<Spec["dependencies"]>, string>>(key: K, callback: (value: ValueForKey<SystemAndDependencies<Spec>, K>) => void) => void;
    useEmitterValues: <K_1 extends SystemKeys<SystemAndDependencies<Spec>>>(...keys: K_1) => ValuesForKeys<SystemAndDependencies<Spec>, K_1>;
    usePubKeys: () => (values: SystemDict<SystemAndDependencies<Spec>>) => void;
    usePublisher: <K_2 extends keyof (Spec extends AnySystemSpec ? {} & ReturnType<Spec["constructor"]> : never) | keyof SystemOfSpecs<Spec["dependencies"]>>(key: K_2) => (value: ValueForKey<SystemAndDependencies<Spec>, K_2>) => void;
}];
/** @internal */
export declare const RealmPluginInitializer: <P extends ({
    pluginParams?: any;
} & RealmPluginParams<AnySystemSpec, any>)[]>({ plugins, children }: {
    plugins: P;
    children?: React.ReactNode;
}) => React.FunctionComponentElement<React.ProviderProps<TypedRealm<any>>>;
/** @internal */
export declare function useHasPlugin(id: string): boolean;
/** @internal */
export declare const RequirePlugin: React.FC<{
    id: string;
    children: React.ReactNode;
}>;
export {};
