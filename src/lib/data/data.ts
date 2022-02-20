import { UserModel } from '$models/classes/user.model';
import { NavItemModel } from '$models/classes/nav-item.model';
import { SiteModel } from '$models/classes/site.model';

export const userData: UserModel[] = [
	{
		name: 'VHS',
		email: 'vhsdev@tutanota.com',
		id: 'vhs'
	}
].map((value) => new UserModel().deserialize(value));

export const siteData: SiteModel = new SiteModel().deserialize({
	name: 'SvelteKit Headless UI Starter',
	description: 'Launch your SvelteKit app using Tailwind and Headless UI.',
	keywords: ['svelte', 'sveltekit', 'tailwindcss', 'headlessui'],
	images: [{ url: 'social.png' }]
});

export const navigationData: NavItemModel[] = [
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
].map((value) => new NavItemModel().deserialize(value));
