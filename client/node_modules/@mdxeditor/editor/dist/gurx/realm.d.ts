import { LongTuple } from './realmFactory';
/** @internal */
export type NodeKey = string;
/** @internal */
export interface RealmNode<_T = unknown> {
    key: NodeKey;
    toString(): string;
}
/** @internal */
type RN<T = unknown> = RealmNode<T>;
/** @internal **/
export type Subscription<T = any> = (value: T) => unknown;
/** @internal */
export type UnsubscribeHandle = () => void;
type ProjectionFunc<T extends unknown[] = unknown[]> = (done: (...values: unknown[]) => void) => (...args: T) => void;
/** @internal */
export interface RealmProjection<T extends unknown[] = unknown[]> {
    sources: Set<NodeKey>;
    pulls: Set<NodeKey>;
    sink: NodeKey;
    map: ProjectionFunc<T>;
}
/** @internal */
export interface RealmProjectionSpec<T extends unknown[] = unknown[]> {
    sources: RealmNode[];
    pulls?: RealmNode[];
    sink: RealmNode;
    map: ProjectionFunc<T>;
}
/**
 * A function which determines if two values are equal.
 * Implement custom comparators when the distinctUntilChanged operator needs to work on non-primitive objects.
 * @returns true if values should be considered equal.
 */
export interface Comparator<T = any> {
    (current: T, next: T): boolean;
}
type NodesFromValuesRec<T extends unknown[], Acc extends unknown[]> = T extends [infer Head, ...infer Tail] ? NodesFromValuesRec<Tail, [...Acc, Head extends unknown ? RealmNode<Head> : never]> : Acc;
/** @internal */
export type NodesFromValues<T extends unknown[]> = T extends unknown[] ? NodesFromValuesRec<T, []> : never;
/**
 * A comparator function to determine if two values are equal. Used by distinctUntilChanged  operator.
 */
export declare function defaultComparator<T>(current: T, next: T): boolean;
declare class SetMap<T> {
    map: Map<string, Set<T>>;
    getOrCreate(key: NodeKey): Set<T>;
    get(key: NodeKey): Set<T> | undefined;
    use(key: NodeKey, cb: (value: Set<T>) => unknown): void;
    delete(key: NodeKey): boolean;
}
/**
 * @internal
 */
export declare class RefCount {
    map: Map<NodeKey, number>;
    constructor(map?: Map<string, number>);
    clone(): RefCount;
    increment(key: NodeKey): void;
    decrement(key: NodeKey, ifZero: () => void): void;
}
/** @internal */
export type RealmGraph = SetMap<RealmProjection>;
/** @internal */
export declare function realm(): {
    combine: {
        <T1>(nodes_0: RN<T1>): RN<T1>;
        <T1_1, T2>(nodes_0: RN<T1_1>, nodes_1: RN<T2>): RN<[T1_1, T2]>;
        <T1_2, T2_1, T3>(nodes_0: RN<T1_2>, nodes_1: RN<T2_1>, nodes_2: RN<T3>): RN<[T1_2, T2_1, T3]>;
        <T1_3, T2_2, T3_1, T4>(nodes_0: RN<T1_3>, nodes_1: RN<T2_2>, nodes_2: RN<T3_1>, nodes_3: RN<T4>): RN<[T1_3, T2_2, T3_1, T4]>;
        <T1_4, T2_3, T3_2, T4_1, T5>(nodes_0: RN<T1_4>, nodes_1: RN<T2_3>, nodes_2: RN<T3_2>, nodes_3: RN<T4_1>, nodes_4: RN<T5>): RN<[T1_4, T2_3, T3_2, T4_1, T5]>;
        <T1_5, T2_4, T3_3, T4_2, T5_1, T6>(nodes_0: RN<T1_5>, nodes_1: RN<T2_4>, nodes_2: RN<T3_3>, nodes_3: RN<T4_2>, nodes_4: RN<T5_1>, nodes_5: RN<T6>): RN<[T1_5, T2_4, T3_3, T4_2, T5_1, T6]>;
        <T1_6, T2_5, T3_4, T4_3, T5_2, T6_1, T7>(nodes_0: RN<T1_6>, nodes_1: RN<T2_5>, nodes_2: RN<T3_4>, nodes_3: RN<T4_3>, nodes_4: RN<T5_2>, nodes_5: RN<T6_1>, nodes_6: RN<T7>): RN<[T1_6, T2_5, T3_4, T4_3, T5_2, T6_1, T7]>;
        <T1_7, T2_6, T3_5, T4_4, T5_3, T6_2, T7_1, T8>(nodes_0: RN<T1_7>, nodes_1: RN<T2_6>, nodes_2: RN<T3_5>, nodes_3: RN<T4_4>, nodes_4: RN<T5_3>, nodes_5: RN<T6_2>, nodes_6: RN<T7_1>, nodes_7: RN<T8>): RN<[T1_7, T2_6, T3_5, T4_4, T5_3, T6_2, T7_1, T8]>;
        <T1_8, T2_7, T3_6, T4_5, T5_4, T6_3, T7_2, T8_1, T9>(nodes_0: RN<T1_8>, nodes_1: RN<T2_7>, nodes_2: RN<T3_6>, nodes_3: RN<T4_5>, nodes_4: RN<T5_4>, nodes_5: RN<T6_3>, nodes_6: RN<T7_2>, nodes_7: RN<T8_1>, nodes_8: RN<T9>): RN<[T1_8, T2_7, T3_6, T4_5, T5_4, T6_3, T7_2, T8_1, T9]>;
        <T1_9, T2_8, T3_7, T4_6, T5_5, T6_4, T7_3, T8_2, T9_1, T10>(nodes_0: RN<T1_9>, nodes_1: RN<T2_8>, nodes_2: RN<T3_7>, nodes_3: RN<T4_6>, nodes_4: RN<T5_5>, nodes_5: RN<T6_4>, nodes_6: RN<T7_3>, nodes_7: RN<T8_2>, nodes_8: RN<T9_1>, nodes_9: RN<T10>): RN<[T1_9, T2_8, T3_7, T4_6, T5_5, T6_4, T7_3, T8_2, T9_1, T10]>;
        <T1_10, T2_9, T3_8, T4_7, T5_6, T6_5, T7_4, T8_3, T9_2, T10_1, T11>(nodes_0: RN<T1_10>, nodes_1: RN<T2_9>, nodes_2: RN<T3_8>, nodes_3: RN<T4_7>, nodes_4: RN<T5_6>, nodes_5: RN<T6_5>, nodes_6: RN<T7_4>, nodes_7: RN<T8_3>, nodes_8: RN<T9_2>, nodes_9: RN<T10_1>, nodes_10: RN<T11>): RN<[T1_10, T2_9, T3_8, T4_7, T5_6, T6_5, T7_4, T8_3, T9_2, T10_1, T11]>;
        <T1_11, T2_10, T3_9, T4_8, T5_7, T6_6, T7_5, T8_4, T9_3, T10_2, T11_1, T12, T13>(nodes_0: RN<T1_11>, nodes_1: RN<T2_10>, nodes_2: RN<T3_9>, nodes_3: RN<T4_8>, nodes_4: RN<T5_7>, nodes_5: RN<T6_6>, nodes_6: RN<T7_5>, nodes_7: RN<T8_4>, nodes_8: RN<T9_3>, nodes_9: RN<T10_2>, nodes_10: RN<T11_1>, nodes_11: RN<T12>, nodes_12: RN<T13>): RN<[T1_11, T2_10, T3_9, T4_8, T5_7, T6_6, T7_5, T8_4, T9_3, T10_2, T11_1, T12, T13]>;
        <T1_12, T2_11, T3_10, T4_9, T5_8, T6_7, T7_6, T8_5, T9_4, T10_3, T11_2, T12_1, T13_1, T14>(nodes_0: RN<T1_12>, nodes_1: RN<T2_11>, nodes_2: RN<T3_10>, nodes_3: RN<T4_9>, nodes_4: RN<T5_8>, nodes_5: RN<T6_7>, nodes_6: RN<T7_6>, nodes_7: RN<T8_5>, nodes_8: RN<T9_4>, nodes_9: RN<T10_3>, nodes_10: RN<T11_2>, nodes_11: RN<T12_1>, nodes_12: RN<T13_1>, nodes_13: RN<T14>): RN<[T1_12, T2_11, T3_10, T4_9, T5_8, T6_7, T7_6, T8_5, T9_4, T10_3, T11_2, T12_1, T13_1, T14]>;
        <T1_13, T2_12, T3_11, T4_10, T5_9, T6_8, T7_7, T8_6, T9_5, T10_4, T11_3, T12_2, T13_2, T14_1, T15>(nodes_0: RN<T1_13>, nodes_1: RN<T2_12>, nodes_2: RN<T3_11>, nodes_3: RN<T4_10>, nodes_4: RN<T5_9>, nodes_5: RN<T6_8>, nodes_6: RN<T7_7>, nodes_7: RN<T8_6>, nodes_8: RN<T9_5>, nodes_9: RN<T10_4>, nodes_10: RN<T11_3>, nodes_11: RN<T12_2>, nodes_12: RN<T13_2>, nodes_13: RN<T14_1>, nodes_14: RN<T15>): RN<[T1_13, T2_12, T3_11, T4_10, T5_9, T6_8, T7_7, T8_6, T9_5, T10_4, T11_3, T12_2, T13_2, T14_1, T15]>;
        <T1_14, T2_13, T3_12, T4_11, T5_10, T6_9, T7_8, T8_7, T9_6, T10_5, T11_4, T12_3, T13_3, T14_2, T15_1, T16>(nodes_0: RN<T1_14>, nodes_1: RN<T2_13>, nodes_2: RN<T3_12>, nodes_3: RN<T4_11>, nodes_4: RN<T5_10>, nodes_5: RN<T6_9>, nodes_6: RN<T7_8>, nodes_7: RN<T8_7>, nodes_8: RN<T9_6>, nodes_9: RN<T10_5>, nodes_10: RN<T11_4>, nodes_11: RN<T12_3>, nodes_12: RN<T13_3>, nodes_13: RN<T14_2>, nodes_14: RN<T15_1>, nodes_15: RN<T16>): RN<[T1_14, T2_13, T3_12, T4_11, T5_10, T6_9, T7_8, T8_7, T9_6, T10_5, T11_4, T12_3, T13_3, T14_2, T15_1, T16]>;
    };
    connect: <T extends unknown[] = unknown[]>({ sources, pulls, map, sink: { key: sink } }: RealmProjectionSpec<T>) => void;
    debug: () => void;
    derive: <T_1>(source: RealmNode<T_1>, initial: T_1) => RealmNode<T_1>;
    getKeyValue: (key: string) => unknown;
    getValue: <T_2>(node: RN<T_2>) => T_2;
    getKeyValues: (keys: string[]) => unknown[];
    label: (newLabels: Record<string, RealmNode<unknown>>) => void;
    labels: Record<string, RealmNode<unknown>>;
    link: <T_3>(source: RealmNode<T_3>, sink: RealmNode<T_3>) => void;
    node: <T_4>(value?: symbol | T_4, distinct?: boolean | Comparator<T_4>) => RealmNode<T_4>;
    o: {
        delayWithMicrotask: <I>() => (source: RealmNode<I>) => RealmNode<I>;
        debounceTime: <I_1>(delay: number) => (source: RealmNode<I_1>) => RealmNode<I_1>;
        filter: <I_2, O_1 = I_2>(predicate: (value: I_2) => boolean) => (source: RealmNode<I_2>) => RealmNode<O_1>;
        map: <I_3, O_2>(mapFunction: (value: I_3) => O_2) => (source: RealmNode<I_3>) => RealmNode<O_2>;
        mapTo: <I_4, O_3>(value: O_3) => (source: RealmNode<I_4>) => RealmNode<O_3>;
        onNext: <I_5, O_4>(bufNode: RN<O_4>) => (source: RealmNode<I_5>) => RealmNode<[I_5, O_4]>;
        scan: <I_6, O_5>(accumulator: (current: O_5, value: I_6) => O_5, seed: O_5) => (source: RealmNode<I_6>) => RealmNode<O_5>;
        throttleTime: <I_7>(delay: number) => (source: RealmNode<I_7>) => RealmNode<I_7>;
        withLatestFrom: {
            <I_8, T1_15>(nodes_0: RN<T1_15>): (source: RN<I_8>) => RN<[I_8, T1_15]>;
            <I_9, T1_16, T2_14>(nodes_0: RN<T1_16>, nodes_1: RN<T2_14>): (source: RN<I_9>) => RN<[I_9, T1_16, T2_14]>;
            <I_10, T1_17, T2_15, T3_13>(nodes_0: RN<T1_17>, nodes_1: RN<T2_15>, nodes_2: RN<T3_13>): (source: RN<I_10>) => RN<[I_10, T1_17, T2_15, T3_13]>;
            <I_11, T1_18, T2_16, T3_14, T4_12>(nodes_0: RN<T1_18>, nodes_1: RN<T2_16>, nodes_2: RN<T3_14>, nodes_3: RN<T4_12>): (source: RN<I_11>) => RN<[I_11, T1_18, T2_16, T3_14, T4_12]>;
            <I_12, T1_19, T2_17, T3_15, T4_13, T5_11>(nodes_0: RN<T1_19>, nodes_1: RN<T2_17>, nodes_2: RN<T3_15>, nodes_3: RN<T4_13>, nodes_4: RN<T5_11>): (source: RN<I_12>) => RN<[I_12, T1_19, T2_17, T3_15, T4_13, T5_11]>;
            <I_13, T1_20, T2_18, T3_16, T4_14, T5_12, T6_10>(nodes_0: RN<T1_20>, nodes_1: RN<T2_18>, nodes_2: RN<T3_16>, nodes_3: RN<T4_14>, nodes_4: RN<T5_12>, nodes_5: RN<T6_10>): (source: RN<I_13>) => RN<[I_13, T1_20, T2_18, T3_16, T4_14, T5_12, T6_10]>;
            <I_14, T1_21, T2_19, T3_17, T4_15, T5_13, T6_11, T7_9>(nodes_0: RN<T1_21>, nodes_1: RN<T2_19>, nodes_2: RN<T3_17>, nodes_3: RN<T4_15>, nodes_4: RN<T5_13>, nodes_5: RN<T6_11>, nodes_6: RN<T7_9>): (source: RN<I_14>) => RN<[I_14, T1_21, T2_19, T3_17, T4_15, T5_13, T6_11, T7_9]>;
            <I_15, T1_22, T2_20, T3_18, T4_16, T5_14, T6_12, T7_10, T8_8>(nodes_0: RN<T1_22>, nodes_1: RN<T2_20>, nodes_2: RN<T3_18>, nodes_3: RN<T4_16>, nodes_4: RN<T5_14>, nodes_5: RN<T6_12>, nodes_6: RN<T7_10>, nodes_7: RN<T8_8>): (source: RN<I_15>) => RN<[I_15, T1_22, T2_20, T3_18, T4_16, T5_14, T6_12, T7_10, T8_8]>;
        };
        once: <I_16>() => (source: RealmNode<I_16>) => RealmNode<I_16>;
        passOnlyAfterNodeHasEmittedBefore: <I_17>(starterNode: RN<unknown>, durationNode: RN<number>) => (source: RealmNode<I_17>) => RealmNode<I_17>;
    };
    pipe: {
        <T_5>(s: RealmNode<T_5>): RealmNode<T_5>;
        <T_6, O1>(s: RealmNode<T_6>, o1: (source: RealmNode<T_6>) => RealmNode<O1>): RealmNode<O1>;
        <T_7, O1_1, O2>(s: RealmNode<T_7>, o_0: (source: RealmNode<T_7>) => RealmNode<O1_1>, o_1: (source: RealmNode<O1_1>) => RealmNode<O2>): RealmNode<O2>;
        <T_8, O1_2, O2_1, O3>(s: RealmNode<T_8>, o_0: (source: RealmNode<T_8>) => RealmNode<O1_2>, o_1: (source: RealmNode<O1_2>) => RealmNode<O2_1>, o_2: (source: RealmNode<O2_1>) => RealmNode<O3>): RealmNode<O3>;
        <T_9, O1_3, O2_2, O3_1, O4>(s: RealmNode<T_9>, o_0: (source: RealmNode<T_9>) => RealmNode<O1_3>, o_1: (source: RealmNode<O1_3>) => RealmNode<O2_2>, o_2: (source: RealmNode<O2_2>) => RealmNode<O3_1>, o_3: (source: RealmNode<O3_1>) => RealmNode<O4>): RealmNode<O4>;
        <T_10, O1_4, O2_3, O3_2, O4_1, O5>(s: RealmNode<T_10>, o_0: (source: RealmNode<T_10>) => RealmNode<O1_4>, o_1: (source: RealmNode<O1_4>) => RealmNode<O2_3>, o_2: (source: RealmNode<O2_3>) => RealmNode<O3_2>, o_3: (source: RealmNode<O3_2>) => RealmNode<O4_1>, o_4: (source: RealmNode<O4_1>) => RealmNode<O5>): RealmNode<O5>;
        <T_11, O1_5, O2_4, O3_3, O4_2, O5_1, O6>(s: RealmNode<T_11>, o_0: (source: RealmNode<T_11>) => RealmNode<O1_5>, o_1: (source: RealmNode<O1_5>) => RealmNode<O2_4>, o_2: (source: RealmNode<O2_4>) => RealmNode<O3_3>, o_3: (source: RealmNode<O3_3>) => RealmNode<O4_2>, o_4: (source: RealmNode<O4_2>) => RealmNode<O5_1>, o_5: (source: RealmNode<O5_1>) => RealmNode<O6>): RealmNode<O6>;
        <T_12, O1_6, O2_5, O3_4, O4_3, O5_2, O6_1, O7>(s: RealmNode<T_12>, o_0: (source: RealmNode<T_12>) => RealmNode<O1_6>, o_1: (source: RealmNode<O1_6>) => RealmNode<O2_5>, o_2: (source: RealmNode<O2_5>) => RealmNode<O3_4>, o_3: (source: RealmNode<O3_4>) => RealmNode<O4_3>, o_4: (source: RealmNode<O4_3>) => RealmNode<O5_2>, o_5: (source: RealmNode<O5_2>) => RealmNode<O6_1>, o_6: (source: RealmNode<O6_1>) => RealmNode<O7>): RealmNode<O7>;
    };
    pub: {
        <T1_23>(args_0: RN<T1_23>, args_1: T1_23): void;
        <T1_24, T2_21>(args_0: RN<T1_24>, args_1: T1_24, args_2: RN<T2_21>, args_3: T2_21): void;
        <T1_25, T2_22, T3_19>(args_0: RN<T1_25>, args_1: T1_25, args_2: RN<T2_22>, args_3: T2_22, args_4: RN<T3_19>, args_5: T3_19): void;
        <T1_26, T2_23, T3_20, T4_17>(args_0: RN<T1_26>, args_1: T1_26, args_2: RN<T2_23>, args_3: T2_23, args_4: RN<T3_20>, args_5: T3_20, args_6: T4_17): void;
    };
    pubIn: (values: Record<NodeKey, unknown>) => void;
    pubKey: (key: string, value: unknown) => void;
    pubKeys: (values: Record<string, unknown>) => void;
    resetSingletonSubs: () => void;
    singletonSub: <T_13>({ key }: RealmNode<T_13>, subscription: Subscription<T_13> | undefined) => UnsubscribeHandle;
    singletonSubKey: <T_14>(key: string, subscription: Subscription<T_14> | undefined) => UnsubscribeHandle;
    spread: <T_15 extends LongTuple<unknown>>(source: RealmNode<T_15>, initialValues: T_15) => NodesFromValues<T_15>;
    sub: {
        <T1_27>(args_0: RN<T1_27>, args_1: Subscription<T1_27>): UnsubscribeHandle;
        <T1_28, T2_24>(args_0: RN<T1_28>, args_1: RN<T2_24>, args_2: Subscription<[T1_28, T2_24]>): UnsubscribeHandle;
        <T1_29, T2_25, T3_21>(args_0: RN<T1_29>, args_1: RN<T2_25>, args_2: RN<T3_21>, args_3: Subscription<[T1_29, T2_25, T3_21]>): UnsubscribeHandle;
    };
    subKey: (key: string, subscription: Subscription<unknown>) => UnsubscribeHandle;
    subKeys: (keys: string[], subscription: Subscription<unknown>) => UnsubscribeHandle;
};
/** @internal */
export interface Realm extends ReturnType<typeof realm> {
}
export {};
