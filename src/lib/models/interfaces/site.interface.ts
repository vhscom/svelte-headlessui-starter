import type { IImageMetaTagProperties } from './image-meta-tag-properties.interface';

export interface ISite {
	name: string;
	description: string;
	keywords: string[];
	images: IImageMetaTagProperties[];
}
