<script lang="ts">
	import dayjs, { type Dayjs } from 'dayjs';

	import type { CalendarEventModel } from '$models/classes/calendar-event.model';

	import HeaderToolbar from './HeaderToolbar.svelte';
	import { DayGrid } from './DayGrid';
	import SelectedView from './SelectedView.svelte';
	import { AddEventDialog } from './AddEventDialog';
	import { picks, draft } from './store';

	export let calendarEvents: CalendarEventModel[];
	export let initialView: string;
	export let hideOutsideDates = false;

	let cursor = dayjs();
	let today = dayjs();
	let todayPing = false;
	let picking = null;

	let isDialogOpen = false;
	const handleAddEventClick = () => (isDialogOpen = true);

	const pingTodayIndicator = () => {
		todayPing = true;
		setTimeout(() => (todayPing = false), 700);
	};

	const handleCursorChange = ({ detail }) => {
		if (detail === today) pingTodayIndicator();
		return (cursor = detail);
	};

	const handlePickDay = ({ detail }: { detail: HTMLButtonElement }) => {
		picking = `${detail.name}-${dayjs().valueOf()}`;
		draft.set(new FormData(detail.form));
		isDialogOpen = false;
	};

	const handleDayClick = ({ detail }: { detail: Dayjs }) => {
		if (!picking) return;
		const key = picking.match(/-(.*)-/)[1];
		picks.set({ ...$picks, [key]: detail });
		picking = null;
		isDialogOpen = true;
	};

	const handleEventCreated = ({ detail: newEvents }) => {
		picks.set({ start: null, end: null });
		draft.set(null);
		const [onlyNewEvent] = newEvents as CalendarEventModel[];
		calendarEvents.push(onlyNewEvent);
		isDialogOpen = false;
		cursor = dayjs(onlyNewEvent.start);
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
		<DayGrid
			on:dayClick={handleDayClick}
			{picking}
			{calendarEvents}
			{cursor}
			{today}
			{todayPing}
			{hideOutsideDates}
		/>
	{/if}
	<AddEventDialog
		on:eventCreated={handleEventCreated}
		on:pickDay={handlePickDay}
		bind:isOpen={isDialogOpen}
	/>
</SelectedView>
