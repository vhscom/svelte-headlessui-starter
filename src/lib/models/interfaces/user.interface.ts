import type { Dictionary } from '$models/types/dictionary.type';

export interface IUser extends Dictionary {
	id: string;
	email: string;
	name: string;
}
