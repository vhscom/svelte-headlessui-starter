import type { INavItem } from '$lib/models/interfaces/inav-item.interface';
import type { IDeserializable } from '$models/interfaces/ideserializable.interface';

export class NavItem implements IDeserializable<INavItem>, INavItem {
	public name: string;
	public href: string;
	public current: boolean;
	public weight: number;

	deserialize(input: INavItem): this {
		Object.assign(this, input);
		return this;
	}
}
