import type { ICalendarEvent, IExtendedProps } from '$models/interfaces/calendar-event.interface';
import type { IDbCalendarEvent } from '$models/interfaces/calendar-event.interface';
import type { IDeserializable } from '$models/interfaces/deserializable.interface';

export class CalendarEventModel implements IDeserializable<ICalendarEvent>, ICalendarEvent {
	id?: string;
	start: string;
	end?: string;
	title?: string;
	url?: string;
	extendedProps?: Partial<IExtendedProps>;

	deserialize(input: ICalendarEvent): this {
		Object.assign(this, input);
		return this;
	}
}

export class DbCalendarEventModel implements IDeserializable<IDbCalendarEvent>, IDbCalendarEvent {
	id: number;
	created_at: string;
	start_date: string;
	start_time: string;
	end_date: string;
	end_time: string;
	title: string;
	location: string;
	url: string;

	deserialize(input: IDbCalendarEvent): this {
		Object.assign(this, input);
		return this;
	}
}
