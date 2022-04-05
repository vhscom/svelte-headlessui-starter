<script lang="ts">
	import type { Dayjs } from 'dayjs';

	import { createEventDispatcher } from 'svelte';
	import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@rgossiaux/svelte-headlessui';
	import { classes } from '$utils';

	import ChevronLeftIcon from '~icons/heroicons-outline/chevron-left';
	import ChevronRightIcon from '~icons/heroicons-outline/chevron-right';
	import ChevronDownIcon from '~icons/heroicons-outline/chevron-down';
	import DotsHorizontalIcon from '~icons/heroicons-outline/dots-horizontal';

	import CalendarIcon from '~icons/heroicons-outline/calendar';
	import TemplateIcon from '~icons/heroicons-outline/template';
	import PencilIcon from '~icons/heroicons-outline/pencil';

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
	<div class="flex items-center space-x-6 sm:space-x-3 pr-10 sm:pr-0">
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

		<!-- Calendar dropdown -->
		<div class="absolute right-0 pr-8 flex items-center sm:hidden">
			<Menu class="relative">
				<MenuButton class="p-2">
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
						class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900"
					>
						<MenuItem
							class={({ active }) =>
								classes(
									active ? 'bg-gray-100 dark:bg-gray-800' : '',
									'block px-4 py-2 text-sm text-gray-700 dark:text-white'
								)}
						>
							<MenuButton on:click={handleTodayButtonClick}>
								<CalendarIcon class="inline mr-1 mb-1" />
								Go to today
							</MenuButton>
						</MenuItem>
						<MenuItem
							disabled
							let:disabled
							class={({ active }) =>
								classes(
									active ? 'bg-gray-100 dark:bg-gray-800' : '',
									'block px-4 py-2 text-sm text-gray-700 dark:text-white'
								)}
						>
							{#if disabled}
								<MenuButton class="cursor-not-allowed">
									<TemplateIcon class="inline mr-1 mb-1" />
									<s>Show weekly view</s>
								</MenuButton>
							{:else}
								<MenuButton>
									<TemplateIcon class="inline mr-1 mb-1" />
									Show weekly view
								</MenuButton>
							{/if}
						</MenuItem>
						<MenuItem
							disabled
							let:disabled
							class={({ active }) =>
								classes(
									active ? 'bg-gray-100 dark:bg-gray-800' : '',
									'block px-4 py-2 text-sm text-gray-700 dark:text-white'
								)}
						>
							{#if disabled}
								<MenuButton class="cursor-not-allowed">
									<PencilIcon class="inline mr-1 mb-1" />
									<s>Add event</s>
								</MenuButton>
							{:else}
								<MenuButton>
									<PencilIcon class="inline mr-1 mb-1" />
									Add event
								</MenuButton>
							{/if}
						</MenuItem>
					</MenuItems>
				</Transition>
			</Menu>
		</div>

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
