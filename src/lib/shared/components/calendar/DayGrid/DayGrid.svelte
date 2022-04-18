<script lang="ts">
	import dayjs, { type Dayjs } from 'dayjs';
	import weekOfYear from 'dayjs/plugin/weekOfYear.js';
	import isBetween from 'dayjs/plugin/isBetween.js';
	dayjs.extend(weekOfYear);
	dayjs.extend(isBetween);

	import type { CalendarEventModel } from '$models/classes/calendar-event.model';

	import { getDayGridForMonth } from '$utils/date';
	import GridHeader from './GridHeader.svelte';
	import GridCell from './GridCell.svelte';
	import CellValue from './CellValue.svelte';

	export let cursor: Dayjs;
	export let today: Dayjs;
	export let todayPing: boolean;
	export let hideOutsideDates: boolean;
	export let picking: string | null;

	export let calendarEvents: CalendarEventModel[];

	const weeksToShow = 6;

	$: dayGridItems = Array.from(getDayGridForMonth(cursor, weeksToShow).values());
	$: weeksOfMonth = Array.from(dayGridItems, (weekOfMonth: Dayjs[]) => {
		const [firstDayOfWeek] = weekOfMonth;
		return {
			yearNumber: firstDayOfWeek.year(),
			weekNumber: firstDayOfWeek.week(),
			daysOfWeek: weekOfMonth
		};
	});
	$: dayNames = Array.from([...weeksOfMonth][0].daysOfWeek, (day: Dayjs) => day.format('ddd'));
</script>

<GridHeader items={dayNames} />
<div
	class="grid w-full grid-cols-{dayNames.length} grid-rows-{weeksOfMonth.length} rounded-b-lg border border-t-0 bg-white dark:border-gray-700 dark:bg-gray-800"
>
	{#each weeksOfMonth as { yearNumber, weekNumber, daysOfWeek }, rowIndex}
		<div class="contents">
			<time id="week-row-{rowIndex}" datetime={`${yearNumber}-W${weekNumber}`} class="sr-only">
				{`Week ${weekNumber} of ${yearNumber}`}
			</time>
			{#each daysOfWeek as dayOfWeek, columnIndex}
				<GridCell
					hilightOnHover={!!picking}
					let:isCurrentMonth
					let:descriptor
					let:isToday
					{cursor}
					{rowIndex}
					{columnIndex}
					lastRowIndex={weeksOfMonth.length - 1}
					lastColumnIndex={daysOfWeek.length - 1}
					{dayOfWeek}
					{today}
				>
					<CellValue
						{calendarEvents}
						value={dayOfWeek}
						{descriptor}
						{todayPing}
						{isToday}
						shouldHideValue={hideOutsideDates && !isCurrentMonth}
						on:dayClick
					/>
				</GridCell>
			{/each}
		</div>
	{/each}
</div>
