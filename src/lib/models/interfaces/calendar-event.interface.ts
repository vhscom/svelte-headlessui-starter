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
	url?: string;
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
