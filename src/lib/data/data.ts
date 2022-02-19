import { UserModel } from '$models/classes/user.model';
import { NavItem } from '$lib/models/classes/navitem.model';

export const userData: UserModel[] = [
	{
		name: 'VHS',
		email: 'vhsdev@tutanota.com',
		id: 'vhs'
	}
].map((value) => new UserModel().deserialize(value));

export const navigationData: NavItem[] = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		current: null,
		weight: 1
	},
	{
		name: 'Team',
		href: '/team',
		current: null,
		weight: 2
	},
	{
		name: 'Projects',
		href: '/projects',
		current: null,
		weight: 3
	},
	{
		name: 'Calendar',
		href: '/calendar',
		current: null,
		weight: 4
	}
].map((value) => new NavItem().deserialize(value));
