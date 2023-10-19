/// <reference types="react" />
export interface ImageEditorProps {
    nodeKey: string;
    src: string;
    alt?: string;
    title?: string;
    width: number | 'inherit';
    height: number | 'inherit';
}
export declare function ImageEditor({ src, title, alt, nodeKey, width, height }: ImageEditorProps): JSX.Element | null;
