import { CalendarEventModel, DbCalendarEventModel } from '$models/classes/calendar-event.model';
import type { AddEventFormData } from '$models/interfaces/calendar-event.interface';
import dayjs, { type Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';

dayjs.extend(weekOfYear);

export const getDayGridForMonth = (date: Dayjs = dayjs(), weeksToShow = 6) => {
	const startOfMonth = date.startOf('month');
	const startOfGrid = startOfMonth.subtract(startOfMonth.day(), 'day');

	const dayGrid = new Map();
	[...Array(weeksToShow).keys()].forEach((week) => {
		dayGrid.set(
			week,
			[...Array(7).keys()].map((day) => startOfGrid.add(week, 'week').add(day, 'day'))
		);
	});

	return dayGrid;
};

/**
 * Calendar event transformer. Takes input calendar event from database
 * and transforms it for use with the Calendar.
 *
 * @param input Raw event from database
 * @returns Event matching FullCalendar Event Object model
 */
export const transformCalendarEvent = (input: DbCalendarEventModel): CalendarEventModel => {
	const event = new CalendarEventModel();
	event.start = `${input.start_date}`;
	if (input.start_time) {
		event.start += `T${input.start_time}:00`;
	}
	if (input.end_date) {
		event.end = input.end_date;
		if (input.end_time) {
			event.end += `T${input.end_time}:00`;
		}
	}
	if (input.url) {
		event.url = input.url;
	}
	event.title = input.title;

	if (input.location) {
		event.extendedProps = event.extendedProps ?? {};
		event.extendedProps.location = input.location;
	}

	return event;
};

/**
 * Calendar event transformer. Takes input calendar event from client
 * and transforms it for use with the database.
 *
 * @param input Add event form data from client
 * @returns Event matching expected database schema
 */
export const prepareCalendarEvent = (input: AddEventFormData): DbCalendarEventModel => {
	const event = new DbCalendarEventModel();
	event.start_date = dayjs(input.start).format('YYYY-MM-DD');
	if (!input.allday) {
		event.start_time = dayjs(input.start).format('HH:mm:ssZZ');
	}
	if (input.end) {
		event.end_date = dayjs(input.end).format('YYYY-MM-DD');
		if (!input.allday) {
			event.end_time = dayjs(input.end).format('HH:mm:ssZZ');
		}
	}
	if (input.title) {
		event.title = input.title;
	}
	if (input.location) {
		event.location = input.location;
	}
	if (input.url) {
		event.url = input.url;
		delete event.location;
	}

	return event;
};
