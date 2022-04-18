<script lang="ts">
	import { classes } from '$utils';
	import type { Dayjs } from 'dayjs';

	export let columnIndex: number;
	export let rowIndex: number;
	export let dayOfWeek: Dayjs;
	export let cursor: Dayjs;
	export let today: Dayjs;
	export let lastRowIndex: number;
	export let lastColumnIndex: number;
	export let hilightOnHover: boolean;

	const isFirstRow = (column: number) => column === 0;
	const isLastColumn = (column: number) => column === lastColumnIndex;
	const isLastRow = (row: number) => row === lastRowIndex;

	const isCurrentMonth = (date: Dayjs) => {
		return date.isBetween(cursor.startOf('month').subtract(1, 'day'), cursor.endOf('month'));
	};
	const isToday = (date: Dayjs) => date.isSame(today, 'day');
</script>

<div
	class={classes(
		'relative flex flex-col h-12 sm:h-16 md:h-24 lg:h-28 overflow-y-hidden',
		!isLastColumn(columnIndex) && 'border-r dark:border-gray-700',
		!isLastRow(rowIndex) && 'border-b dark:border-gray-700',
		isLastRow(rowIndex) && isFirstRow(columnIndex) && 'rounded-bl-lg',
		isLastRow(rowIndex) && isLastColumn(columnIndex) && 'rounded-br-lg',
		!isCurrentMonth(dayOfWeek) && 'bg-gray-50 dark:bg-gray-850 text-gray-500',
		hilightOnHover &&
			'hover:bg-gray-100 hover:dark:bg-gray-700 cursor-pointer transition ease-in-out duration-75'
	)}
>
	<slot
		descriptor={`day-col-${columnIndex} week-row-${rowIndex}`}
		isCurrentMonth={isCurrentMonth(dayOfWeek)}
		isToday={isToday(dayOfWeek)}
	/>
	<div class="pointer-events-none absolute inset-0">
		<div
			class={classes(
				'pointer-events-none hidden md:flex absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t to-transparent',
				isCurrentMonth(dayOfWeek) && !hilightOnHover && 'from-white dark:from-gray-800/80',
				!isCurrentMonth(dayOfWeek) && !hilightOnHover && 'from-gray-50 dark:from-gray-850'
			)}
		/>
	</div>
</div>
