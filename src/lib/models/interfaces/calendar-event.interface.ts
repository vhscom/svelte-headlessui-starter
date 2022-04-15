import type { EventRepeatOptions } from '$models/types/options.type';
import type { Dictionary } from '$lib/models/types/dictionary.type';

export interface IExtendedProps extends Dictionary {
	description: string;
	location: string;
	important: boolean;
	repeat: EventRepeatOptions;
}

export interface AddEventFormData {
	start: string;
	end: string;
	allday?: 'on';
	location: string;
	title: string;
}

export interface ICalendarEvent extends Dictionary {
	id?: string;
	start: string;
	end?: string;
	title?: string;
	url?: string;
	extendedProps?: Partial<IExtendedProps>;
}

export interface IDbCalendarEvent extends Dictionary {
	id: number;
	created_at: string;
	start_date: string;
	start_time: string;
	end_date: string;
	end_time: string;
	title: string;
	location: string;
	url: string;
}

// {
// 	id: 1,
// 	created_at: '2022-04-14T09:33:57+00:00',
// 	start_date: '2022-04-14',
// 	start_time: '17:34:36+08',
// 	end_date: '2022-04-14',
// 	end_time: '18:34:36+08',
// 	title: 'Supabase test event',
// 	url: null
// }
