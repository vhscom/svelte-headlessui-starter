<script lang="ts">
	import dayjs, { type Dayjs } from 'dayjs';
	import weekOfYear from 'dayjs/plugin/weekOfYear.js';
	import isBetween from 'dayjs/plugin/isBetween.js';
	dayjs.extend(weekOfYear);
	dayjs.extend(isBetween);

	import { classes } from '$utils';
	import { getDayGridForMonth, getDayGridColumnHeaders } from '$utils/date';

	const weeksToShow = 6;

	export let cursor: Dayjs;
	export let today: Dayjs;
	export let todayPing: boolean;

	$: dayGridItems = Array.from(getDayGridForMonth(cursor, weeksToShow).values());

	const dayNames = getDayGridColumnHeaders();
	const gridRows = Array.from({ length: weeksToShow }, (_, idx) => idx);

	const isLastRow = (row: number) => row === weeksToShow - 1;
	const isLastColumn = (column: number) => column === 6;
	const isFirstColumn = (column: number) => column === 0;

	const isToday = (date: Dayjs) => date.isSame(today, 'day');
	const isCurrentMonth = (date: Dayjs) => {
		return date.isBetween(cursor.startOf('month').subtract(1, 'day'), cursor.endOf('month'));
	};
</script>

<div
	class="grid w-full grid-cols-7 items-center border border-y-gray-300 bg-white text-center dark:border-y-gray-600 dark:border-x-gray-700 dark:bg-gray-800"
>
	{#each dayNames as dayName, idx}
		<span
			id="day-col-{idx}"
			class={classes(
				'text-xs font-bold py-3',
				!isLastColumn(idx) && 'border-r dark:border-x-gray-700'
			)}
		>
			{dayName.substring(0, 3)}
		</span>
	{/each}
</div>
<div
	class="grid w-full grid-cols-7 grid-rows-6 rounded-b-lg border border-t-0 bg-white dark:border-gray-700 dark:bg-gray-800"
>
	{#each gridRows as _, rowIndex}
		{@const yearNumber = dayGridItems[rowIndex][0].year()}
		{@const weekNumber = dayGridItems[rowIndex][0].week()}
		<div class="contents">
			<time id="week-row-{rowIndex}" datetime={`${yearNumber}-W${weekNumber}`} class="sr-only">
				Week {weekNumber} of {yearNumber}
			</time>
			{#each dayNames as _, columnIndex}
				{@const dayGridItem = dayGridItems[rowIndex][columnIndex]}
				<time
					datetime={dayGridItem.format()}
					aria-describedby="day-col-{columnIndex} week-row-{rowIndex}"
					class={classes(
						'flex h-12 sm:h-16 md:h-24',
						!isLastColumn(columnIndex) && 'border-r dark:border-gray-700',
						!isLastRow(rowIndex) && 'border-b dark:border-gray-700',
						isLastRow(rowIndex) && isFirstColumn(columnIndex) && 'rounded-bl-lg',
						isLastRow(rowIndex) && isLastColumn(columnIndex) && 'rounded-br-lg',
						!isCurrentMonth(dayGridItem) && 'bg-gray-50 dark:bg-gray-900/50 text-gray-500'
					)}
				>
					<div class="my-2.5 mx-2.5 w-full text-right text-xs sm:text-left">
						{#if isToday(dayGridItem)}
							<div class="relative inline-flex h-5 w-5 sm:h-6 sm:w-6">
								<div
									class={classes(
										'absolute inset-0 ml-1.5 sm:-ml-0.5 -mt-0.5 sm:-mt-1 w-full h-full rounded-full bg-indigo-600'
									)}
								/>
								<div
									class={classes(
										'absolute inset-0 ml-1.5 sm:-ml-0.5 -mt-0.5 sm:-mt-1 w-full h-full rounded-full bg-indigo-600',
										todayPing && 'animate-ping'
									)}
								/>
								<span class="absolute inset-0 ml-1.5 font-semibold text-white">
									{dayGridItem.format('D')}
								</span>
							</div>
						{:else}
							{dayGridItem.format('D')}
						{/if}
					</div>
				</time>
			{/each}
		</div>
	{/each}
</div>
