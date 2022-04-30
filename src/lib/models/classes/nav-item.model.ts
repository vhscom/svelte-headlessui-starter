import type { INavItem } from '$lib/models/interfaces/nav-item.interface';
import type { IDeserializable } from '$models/interfaces/deserializable.interface';

export class NavItemModel implements IDeserializable<INavItem>, INavItem {
	protected id: number;
	protected created_at: string;

	public name: string;
	public href: string;
	public current: boolean;
	public weight: number;

	setCurrent(currentUrl: string): this {
		this.current = currentUrl === this.href;
		return this;
	}

	deserialize(input: INavItem): this {
		Object.assign(this, input);
		return this;
	}
}
