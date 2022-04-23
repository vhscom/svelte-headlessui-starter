<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { createApi } from '$core/services/http';
	import { CalendarEventModel } from '$models/classes/calendar-event.model';

	export const load: Load = async ({ fetch }) => {
		const api = createApi(`/api`, fetch);

		const eventData: CalendarEventModel[] = await api.events();
		const events = eventData.map((value) => new CalendarEventModel().deserialize(value));

		return {
			props: { events },
			cache: { maxage: 300, private: true }
		};
	};
</script>

<script lang="ts">
	import { Calendar } from '$components/calendar';

	export let events: CalendarEventModel[];
</script>

<p>Example content for the calendar page.</p>

<Calendar calendarEvents={events} initialView="dayGridView" hideOutsideDates={false} />
