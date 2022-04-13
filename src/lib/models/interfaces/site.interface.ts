import type { IImageMetaTagProperties } from '$models/interfaces/image-meta-tag-properties.interface';
import type { Dictionary } from '$models/types/dictionary.type';

export interface ISite extends Dictionary {
	name: string;
	description: string;
	keywords: string[];
	images: IImageMetaTagProperties[];
}
