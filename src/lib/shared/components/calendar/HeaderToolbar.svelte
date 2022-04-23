<script lang="ts">
	import type { Dayjs } from 'dayjs';

	import { createEventDispatcher } from 'svelte';
	import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@rgossiaux/svelte-headlessui';
	import { classes } from '$utils';

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

	let previousButton: HTMLButtonElement;
	const handlePreviousButtonKeydown = (evt: KeyboardEvent): void => {
		evt.key === 'ArrowRight' && todayButton.focus();
	};
	let todayButton: HTMLButtonElement;
	const handleTodayButtonKeydown = (evt: KeyboardEvent): void => {
		evt.key === 'ArrowRight' && nextButton.focus();
		evt.key === 'ArrowLeft' && previousButton.focus();
	};
	let nextButton: HTMLButtonElement;
	const handleNextButtonKeydown = (evt: KeyboardEvent): void => {
		evt.key === 'ArrowLeft' && todayButton.focus();
	};

	const handleAddEventClick = () => dispatch('addEventClick');
</script>

<header
	class="flex items-center rounded-t-lg border border-b-0 bg-gray-50 py-5 px-6 dark:border-gray-700 dark:bg-gray-850"
>
	<h1 class="flex-1 text-lg font-bold">
		<time datetime={`${cursor.year()}-${cursor.format('MM')}`}>{cursor.format('MMMM YYYY')}</time>
	</h1>
	<div class="flex items-center space-x-4">
		<div
			class="flex items-center rounded-md border border-gray-300 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800"
		>
			<button
				bind:this={previousButton}
				class="mr-0.5 rounded-l-md px-3 py-2.5 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white"
				on:click={handlePreviousButtonClick}
				on:keydown={handlePreviousButtonKeydown}
			>
				<span class="sr-only">View previous month</span>
				<ChevronLeftIcon class="h-4 w-4" />
			</button>
			<button
				bind:this={todayButton}
				class="hidden px-1 py-1 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white sm:flex md:px-4"
				on:click={handleTodayButtonClick}
				on:keydown={handleTodayButtonKeydown}
			>
				Today
			</button>
			<button
				bind:this={nextButton}
				class="ml-0.5 rounded-r-md px-3 py-2.5 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white"
				on:click={handleNextButtonClick}
				on:keydown={handleNextButtonKeydown}
			>
				<span class="sr-only">View next month</span>
				<ChevronRightIcon class="h-4 w-4" />
			</button>
		</div>

		<button
			disabled
			class="hidden cursor-not-allowed items-center rounded-md border border-gray-300 bg-white py-1 px-4 shadow-sm dark:border-gray-600 dark:bg-gray-800 sm:flex"
		>
			Month view <ChevronDownIcon class="ml-3 h-4 w-4" />
		</button>
		<div class="hidden items-center sm:flex">
			<span class="mr-5 ml-2 h-6 w-1 border-l border-gray-300 dark:border-gray-600" />
			<button on:click={handleAddEventClick} class="btn btn-primary">Add event</button>
		</div>

		<!-- Calendar dropdown -->
		<Menu class="relative sm:hidden">
			<MenuButton
				class="flex rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-gray-800"
			>
				<span class="sr-only">Open calendar menu</span>
				<DotsHorizontalIcon />
			</MenuButton>

			<!-- Dropdown menu, show/hide based on menu state. -->
			<Transition
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems
					class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900"
				>
					<MenuItem
						let:disabled
						on:click={handleAddEventClick}
						class={({ active }) =>
							classes(
								active ? 'bg-gray-100 dark:bg-gray-800' : '',
								'text-sm text-gray-700 dark:text-white'
							)}
					>
						<span class={classes('block px-4 py-2', disabled && 'cursor-not-allowed opacity-20')}>
							Add event
						</span>
					</MenuItem>
					<MenuItem
						on:click={handleTodayButtonClick}
						class={({ active }) =>
							classes(
								active ? 'bg-gray-100 dark:bg-gray-800' : '',
								'block px-4 py-2 text-sm text-gray-700 dark:text-white'
							)}
					>
						<span>Show today</span>
					</MenuItem>
					<MenuItem
						disabled
						let:disabled
						class={({ active }) =>
							classes(
								active ? 'bg-gray-100 dark:bg-gray-800' : '',
								'text-sm text-gray-700 dark:text-white'
							)}
					>
						<span class={classes('block px-4 py-2', disabled && 'cursor-not-allowed opacity-20')}>
							Weekly view
						</span>
					</MenuItem>
				</MenuItems>
			</Transition>
		</Menu>
	</div>
</header>
