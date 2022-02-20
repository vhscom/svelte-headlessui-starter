import type { ISite } from '$models/interfaces/site.interface';
import type { IDeserializable } from '$models/interfaces/deserializable.interface';
import type { IImageMetaTagProperties } from '$models/interfaces/image-meta-tag-properties.interface';

export class SiteModel implements IDeserializable<ISite>, ISite {
	public name: string;
	public description: string;
	public keywords: string[];
	public images: IImageMetaTagProperties[];

	deserialize(input: ISite): this {
		Object.assign(this, input);
		return this;
	}
}
