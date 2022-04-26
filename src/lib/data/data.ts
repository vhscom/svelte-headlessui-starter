import { UserModel } from '$models/classes/user.model';
import { NavItemModel } from '$models/classes/nav-item.model';
import { SiteModel } from '$models/classes/site.model';
import { CalendarEventModel, DbCalendarEventModel } from '$models/classes/calendar-event.model';

export const userData: UserModel[] = [
	{
		name: 'VHS',
		email: 'vhsdev@tutanota.com',
		id: 'vhs'
	},
	{
		name: 'Drew DeVault',
		email: 'sir@cmpwn.com',
		id: 'sir'
	}
].map((value) => new UserModel().deserialize(value));

export const siteData: SiteModel = new SiteModel().deserialize({
	name: 'Svelte Headless UI Starter',
	description: 'Launch your next Svelte app using Headless UI.',
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

export const dbCalendarData: DbCalendarEventModel[] = [
	{
		id: 1,
		created_at: '2022-04-14T09:33:57+00:00',
		start_date: '2022-04-14',
		start_time: '17:34:36+08',
		end_date: '2022-04-14',
		end_time: '18:34:36+08',
		title: 'Supabase test event',
		location: 'Test location',
		url: null
	}
].map((value) => new DbCalendarEventModel().deserialize(value));

export const calendarData: CalendarEventModel[] = [
	{
		start: '2022-03-06T00:00:00Z'
	},
	{
		id: '59380e29-34ae-4e8f-810d-60df566b2095',
		start: '2022-04-04T10:00:00-06:00',
		end: '2022-04-04T10:30:00-06:00',
		title: 'Design review',
		url: 'https://pwa.zoom.us/wc'
	},
	{
		id: '9e2579cc-6f1b-4024-b05a-b99c7f798fc0',
		start: '2022-04-32T14:00:00-06:00',
		end: '2022-04-03T15:00:00-06:00',
		title: 'Sales meeting'
	},
	{
		start: '2022-04-08T18:00:00+08:00',
		title: 'Date night',
		extendedProps: {
			important: true,
			repeat: 'week' as const
		}
	},
	{
		start: '2022-04-13T14:00:00',
		title: "Olivia's birthday party",
		extendedProps: {
			description: 'Pick-up gift beforehand'
		}
	},
	{
		start: '2022-04-23T09:00:00+08:00',
		end: '2022-07-22',
		title: 'Yoga practice',
		extendedProps: {
			repeat: 'week' as const
		}
	},
	{
		start: '2022-04-23T13:30:00+08:00',
		title: 'Vineyard tour'
	},
	{
		start: '2022-04-23T23:00:00+08:00',
		end: '2022-04-24T01:00:00+08:00',
		title: 'Scotch tasting'
	},
	{
		start: '2022-05-05',
		title: 'Cinco de Mayo',
		extendedProps: {
			location: 'Mexico',
			repeat: 'year' as const
		}
	}
].map((value) => new CalendarEventModel().deserialize(value));
