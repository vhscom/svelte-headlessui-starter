import type { RequestHandler } from '@sveltejs/kit';
import { calendarData } from '$data';
import { environment } from '$environment';
import { supabase } from '$core/services/supabase';
import { prepareCalendarEvent, transformCalendarEvent } from '$utils/date';
import {
	type CalendarEventModel,
	DbCalendarEventModel
} from '$models/classes/calendar-event.model';
import type { AddEventFormData } from '$models/interfaces/calendar-event.interface';

export const post: RequestHandler = async ({ request }) => {
	if (environment.debug) return { status: 405, body: 'Error debugging enabled.' };

	const json: AddEventFormData = await request.json();
	let payload: DbCalendarEventModel[];

	try {
		payload = [prepareCalendarEvent(json)];
	} catch {
		return {
			status: 400,
			body: 'Error transforming events received from client.'
		};
	}

	const { data: events, error } = await supabase.from('event').insert(payload);

	if (error) {
		return {
			status: 404,
			body: 'Error inserting transformed event reported by server.'
		};
	}

	const dbCalendarEvents = events.map((value) => new DbCalendarEventModel().deserialize(value));
	let calendarEvents: CalendarEventModel[];

	try {
		calendarEvents = dbCalendarEvents.map(transformCalendarEvent);
	} catch {
		return {
			status: 404,
			body: 'Error transforming events received from server.'
		};
	}

	return {
		status: 201,
		body: JSON.stringify(calendarEvents)
	};
};

export const GET: RequestHandler = async () => {
	if (environment.debug) return { body: JSON.stringify(calendarData) };

	const { data: events, error } = await supabase.from('event').select('*');

	if (error) {
		return {
			status: 404,
			body: 'Error selecting events from server.'
		};
	}

	const dbCalendarEvents = events.map((value) => new DbCalendarEventModel().deserialize(value));
	let calendarEvents: CalendarEventModel[];

	try {
		calendarEvents = dbCalendarEvents.map(transformCalendarEvent);
	} catch {
		return {
			status: 404,
			body: 'Error transforming dates received from server.'
		};
	}

	return {
		body: JSON.stringify(calendarEvents)
	};
};
