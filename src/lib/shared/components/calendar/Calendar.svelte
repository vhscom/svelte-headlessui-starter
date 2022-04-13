<script lang="ts">
	import dayjs from 'dayjs';

	import type { CalendarEventModel } from '$models/classes/calendar-event.model';
	import HeaderToolbar from './HeaderToolbar.svelte';
	import { DayGrid } from './DayGrid';
	import SelectedView from './SelectedView.svelte';
	import AddEventDialog from './AddEventDialog.svelte';

	export let calendarEvents: CalendarEventModel[];
	export let initialView: string;
	export let hideOutsideDates = false;

	let cursor = dayjs();
	let today = dayjs();
	let todayPing = false;

	let isAddingEvent = false;
	const handleAddEventClick = () => (isAddingEvent = true);

	const pingTodayIndicator = () => {
		todayPing = true;
		setTimeout(() => (todayPing = false), 700);
	};

	const handleCursorChange = ({ detail }) => {
		if (detail === today) pingTodayIndicator();
		return (cursor = detail);
	};
</script>

<SelectedView {initialView} let:selected>
	<HeaderToolbar
		{cursor}
		{today}
		on:cursorChange={handleCursorChange}
		on:addEventClick={handleAddEventClick}
	/>
	{#if selected === 'dayGridView'}
		<DayGrid {calendarEvents} {cursor} {today} {todayPing} {hideOutsideDates} />
	{/if}
	<AddEventDialog bind:isOpen={isAddingEvent} />
</SelectedView>
