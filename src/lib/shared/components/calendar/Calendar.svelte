<script lang="ts">
	import dayjs from 'dayjs';

	import HeaderToolbar from './HeaderToolbar.svelte';
	import { DayGrid } from './DayGrid';
	import SelectedView from './SelectedView.svelte';

	export let initialView: string;
	export let hideOutsideDates = false;

	let cursor = dayjs();
	let today = dayjs();
	let todayPing = false;

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
	<HeaderToolbar {cursor} {today} on:cursorChange={handleCursorChange} />
	{#if selected === 'dayGridView'}
		<DayGrid {cursor} {today} {todayPing} {hideOutsideDates} />
	{/if}
</SelectedView>
