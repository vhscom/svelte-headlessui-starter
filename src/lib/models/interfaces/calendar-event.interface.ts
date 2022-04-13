import type { EventRepeatOptions } from '$models/types/options.type';
import type { Dictionary } from '$lib/models/types/dictionary.type';

export interface IExtendedProps extends Dictionary {
	description: string;
	location: string;
	important: boolean;
	repeat: EventRepeatOptions;
}

export interface ICalendarEvent extends Dictionary {
	id?: string;
	start: string;
	end?: string;
	title?: string;
	url?: string;
	extendedProps?: Partial<IExtendedProps>;
}
