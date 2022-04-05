<script lang="ts">
	import dayjs from 'dayjs';

	import HeaderToolbar from './HeaderToolbar.svelte';
	import DayGrid from './DayGrid.svelte';
	import CalendarView from './CalendarView.svelte';

	export let initialView = 'dayGridView';

	let cursor = dayjs();
	let today = dayjs();

	const handleCursorChange = ({ detail }) => (cursor = detail);
</script>

<CalendarView {initialView} let:view>
	<HeaderToolbar {cursor} {today} on:cursorChange={handleCursorChange} />
	{#if view === 'dayGridView'}
		<DayGrid {cursor} {today} />
	{/if}
</CalendarView>
