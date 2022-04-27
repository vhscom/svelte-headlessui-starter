<script lang="ts">
	import dayjs from 'dayjs';
	import { JsonLd, type JsonLdProps } from 'svelte-meta-tags';
	import type { CalendarEventModel } from '$models/classes/calendar-event.model';

	export let calendarEvent: CalendarEventModel;

	let restProps = {};
	if (calendarEvent.end) {
		restProps['endDate'] = dayjs(calendarEvent.end).format();
	}
	if (calendarEvent.url || calendarEvent.extendedProps?.location) {
		restProps['location'] = calendarEvent.url ?? calendarEvent.extendedProps.location;
	}
	if (calendarEvent.extendedProps?.description) {
		restProps['description'] = calendarEvent.extendedProps.description;
	}

	const jsonld: JsonLdProps = {
		schema: {
			'@context': 'https://schema.org',
			'@type': 'Event',
			name: calendarEvent.title,
			eventStatus: 'https://schema.org/EventScheduled',
			startDate: dayjs(calendarEvent.start).format(),
			...restProps
		}
	};
</script>

<JsonLd {...jsonld} output="body" />
