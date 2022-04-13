<script lang="ts">
	import { Calendar } from '$components/calendar';
	import { calendarData as calendarEvents } from '$data';
</script>

<p>Example content for the calendar page.</p>

<Calendar {calendarEvents} initialView="dayGridView" hideOutsideDates={false} />
