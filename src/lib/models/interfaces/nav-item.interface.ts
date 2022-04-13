import type { Dictionary } from '$models/types/dictionary.type';

export interface INavItem extends Dictionary {
	name: string;
	href: string;
	current: boolean;
	weight: number;
}
