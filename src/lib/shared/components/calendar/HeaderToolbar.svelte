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
	class="flex items-center border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 border-b-0 rounded-t-lg py-5 px-6"
>
	<h1 class="text-lg flex-1 font-bold">
		<time datetime={`${cursor.year()}-${cursor.format('MM')}`}>{cursor.format('MMMM YYYY')}</time>
	</h1>
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
