import { DirectiveDescriptor } from '../plugins/directives';
/** @internal */
export declare const ADMONITION_TYPES: readonly ["note", "tip", "danger", "info", "caution"];
/** @internal */
export type AdmonitionKind = (typeof ADMONITION_TYPES)[number];
/**
 * Pass this descriptor to the `directivesPlugin` `directiveDescriptors` parameter to enable {@link https://docusaurus.io/docs/markdown-features/admonitions | markdown admonitions}.
 *
 * @example
 * ```tsx
 * <MDXEditor
 *  plugins={[
 *   directivesPlugin({ directiveDescriptors: [ AdmonitionDirectiveDescriptor] }),
 *  ]} />
 * ```
 */
export declare const AdmonitionDirectiveDescriptor: DirectiveDescriptor;
