import type { Dictionary } from '$models/types/dictionary.type';

export interface IImageMetaTagProperties extends Dictionary {
	url: string;
	width?: number;
	height?: number;
	alt?: string;
}
