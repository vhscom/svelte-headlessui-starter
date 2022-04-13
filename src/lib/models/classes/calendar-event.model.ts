import type { ICalendarEvent, IExtendedProps } from '$models/interfaces/calendar-event.interface';
import type { IDeserializable } from '$models/interfaces/deserializable.interface';

export class CalendarEventModel implements IDeserializable<ICalendarEvent>, ICalendarEvent {
	id?: string;
	start: string;
	end?: string;
	title?: string;
	url?: string;
	extendedProps?: IExtendedProps;

	deserialize(input: ICalendarEvent): this {
		Object.assign(this, input);

		if (input.extendedProps) {
			Object.assign(this.extendedProps, input.extendedProps);
		}

		return this;
	}
}
