<script lang="ts">
	import type { Dayjs } from 'dayjs';

	import { createEventDispatcher } from 'svelte';

	import ChevronLeftIcon from '~icons/heroicons-outline/chevron-left';
	import ChevronRightIcon from '~icons/heroicons-outline/chevron-right';
	import ChevronDownIcon from '~icons/heroicons-outline/chevron-down';
	import DotsHorizontalIcon from '~icons/heroicons-outline/dots-horizontal';

	export let cursor: Dayjs;
	export let today: Dayjs;

	const dispatch = createEventDispatcher();

	const handlePreviousButtonClick = () => dispatch('cursorChange', cursor.subtract(1, 'month'));
	const handleTodayButtonClick = () => dispatch('cursorChange', today);
	const handleNextButtonClick = () => dispatch('cursorChange', cursor.add(1, 'month'));
</script>

<header
	class="flex items-center rounded-t-lg border border-b-0 bg-gray-50 py-5 px-6 dark:border-gray-700 dark:bg-gray-800/50"
>
	<h1 class="flex-1 text-lg font-bold">
		<time datetime={`${cursor.year()}-${cursor.format('MM')}`}>{cursor.format('MMMM YYYY')}</time>
	</h1>
	<div class="flex items-center space-x-6 sm:space-x-3">
		<div
			class="flex items-center rounded-md border border-gray-300 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800"
		>
			<button
				class="rounded-l-md px-3 py-2.5 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700 dark:hover:bg-gray-700 dark:hover:text-white"
				on:click={handlePreviousButtonClick}
			>
				<span class="sr-only">View previous month</span>
				<ChevronLeftIcon class="h-4 w-4" />
			</button>
			<button
				class="hidden px-4 py-1 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700 dark:hover:bg-gray-700 dark:hover:text-white sm:flex"
				on:click={handleTodayButtonClick}
			>
				Today
			</button>
			<button
				class="rounded-r-md px-3 py-2.5 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700 dark:hover:bg-gray-700 dark:hover:text-white"
				on:click={handleNextButtonClick}
			>
				<span class="sr-only">View next month</span>
				<ChevronRightIcon class="h-4 w-4" />
			</button>
		</div>
		<button class="cursor-not-allowed sm:hidden" disabled>
			<DotsHorizontalIcon />
		</button>
		<button
			disabled
			class="hidden cursor-not-allowed items-center rounded-md border border-gray-300 bg-white py-1 px-4 shadow-sm dark:border-gray-600 dark:bg-gray-800 sm:flex"
		>
			Month view <ChevronDownIcon class="ml-3 h-4 w-4" />
		</button>
		<div class="hidden items-center sm:flex">
			<span class="mr-5 ml-3 h-6 w-1 border-l border-gray-300 dark:border-gray-600" />
			<button
				disabled
				class="cursor-not-allowed rounded-md bg-indigo-600 py-1 px-4 text-white shadow-sm"
			>
				Add event
			</button>
		</div>
	</div>
</header>
