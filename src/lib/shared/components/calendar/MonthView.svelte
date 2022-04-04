<script lang="ts">
	import dayjs, { type Dayjs } from 'dayjs';
	import weekOfYear from 'dayjs/plugin/weekOfYear.js';
	import isBetween from 'dayjs/plugin/isBetween.js';
	dayjs.extend(weekOfYear);
	dayjs.extend(isBetween);

	import ChevronLeftIcon from '~icons/heroicons-outline/chevron-left';
	import ChevronRightIcon from '~icons/heroicons-outline/chevron-right';
	import ChevronDownIcon from '~icons/heroicons-outline/chevron-down';
	import DotsHorizontalIcon from '~icons/heroicons-outline/dots-horizontal';

	import { classes } from '$utils';
	import { getDayGridForMonth, getDayGridColumnHeaders } from '$utils/date';

	const weeksToShow = 6;

	$: cursor = dayjs();
	$: dayGridItems = Array.from(getDayGridForMonth(cursor, weeksToShow).values());

	const dayNames = getDayGridColumnHeaders();
	const gridRows = Array.from({ length: weeksToShow }, (_, idx) => idx);

	const isLastRow = (row: number) => row === weeksToShow - 1;
	const isLastColumn = (column: number) => column === 6;
	const isFirstColumn = (column: number) => column === 0;

	const isToday = (date: Dayjs) => date.isSame(dayjs(), 'day');
	const isCurrentMonth = (date: Dayjs) => {
		return date.isBetween(cursor.startOf('month').subtract(1, 'day'), cursor.endOf('month'));
	};

	const handlePreviousButtonClick = () => (cursor = cursor.subtract(1, 'month'));
	const handleTodayButtonClick = () => (cursor = dayjs());
	const handleNextButtonClick = () => (cursor = cursor.add(1, 'month'));
</script>

<section class="not-prose">
	<header
		class="flex items-center border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 border-b-0 rounded-t-lg py-5 px-6"
	>
		<h1 class="text-lg flex-1 font-bold">{cursor.format('MMMM YYYY')}</h1>
		<div class="flex space-x-6 sm:space-x-3 items-center">
			<div
				class="flex items-center border border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-800 rounded-md"
			>
				<button
					class="hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2.5 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-700"
					on:click={handlePreviousButtonClick}
				>
					<span class="sr-only">View previous month</span>
					<ChevronLeftIcon class="h-4 w-4" />
				</button>
				<button
					class="hidden sm:flex hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-4 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-700"
					on:click={handleTodayButtonClick}
				>
					Today
				</button>
				<button
					class="hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2.5 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-700"
					on:click={handleNextButtonClick}
				>
					<span class="sr-only">View next month</span>
					<ChevronRightIcon class="h-4 w-4" />
				</button>
			</div>
			<button class="sm:hidden cursor-not-allowed" disabled>
				<DotsHorizontalIcon />
			</button>
			<button
				disabled
				class="hidden sm:flex cursor-not-allowed items-center border border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-800 py-1 px-4 rounded-md"
			>
				Month view <ChevronDownIcon class="h-4 w-4 ml-3" />
			</button>
			<div class="hidden sm:flex items-center">
				<span class="border-l border-gray-300 dark:border-gray-600 w-1 h-6 mr-5 ml-3" />
				<button
					disabled
					class="bg-indigo-600 shadow-sm cursor-not-allowed py-1 px-4 rounded-md text-white"
				>
					Add event
				</button>
			</div>
		</div>
	</header>
	<div
		class="w-full grid bg-white dark:bg-gray-800 border border-y-gray-300 dark:border-y-gray-600 dark:border-x-gray-700 text-center items-center grid-cols-7"
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
		class="w-full grid border dark:border-gray-700 border-t-0 bg-white dark:bg-gray-800 rounded-b-lg grid-cols-7 grid-rows-6"
	>
		{#each gridRows as _, rowIndex}
			<div class="contents">
				<time id="week-row-{rowIndex}" class="sr-only">
					{`Week ${dayGridItems[rowIndex][0].week()}`}
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
						<div class="w-full my-2.5 mx-2.5 text-xs text-right sm:text-left">
							{#if isToday(dayGridItem)}
								<div
									class="bg-indigo-600 -m-1 inline-flex items-center text-center text-white font-semibold rounded-full w-6 h-6"
								>
									<span class="w-full">{dayGridItem.format('D')}</span>
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
</section>
