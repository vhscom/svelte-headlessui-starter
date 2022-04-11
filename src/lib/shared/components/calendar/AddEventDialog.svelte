<script lang="ts">
	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';

	import TagIcon from '~icons/heroicons-outline/tag';
	import LocationMarkerIcon from '~icons/heroicons-outline/location-marker';
	import CalendarIcon from '~icons/heroicons-outline/calendar';
	import ClockIcon from '~icons/heroicons-outline/clock';

	export let isOpen = false;

	let isAllDayEvent = true;
</script>

<Transition appear show={isOpen}>
	<Dialog on:close={() => (isOpen = false)} class="fixed inset-0 z-10 overflow-y-auto">
		<div class="min-h-screen px-4 text-center text-gray-900 dark:text-white">
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<DialogOverlay
					class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity dark:bg-gray-800 dark:bg-opacity-75"
				/>
			</TransitionChild>
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				enterTo="opacity-100 translate-y-0 sm:scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 translate-y-0 sm:scale-100"
				leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			>
				<!-- This element is to trick the browser into centering the modal contents. -->
				<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
					>&#8203;</span
				>
				<div
					class="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900"
				>
					<div class="ml-10">
						<DialogTitle class="text-lg font-medium leading-6">Add event</DialogTitle>
						<DialogDescription class="text-gray-400">
							Create a new calendar event.
						</DialogDescription>
					</div>

					<div class="mt-4 flex flex-col space-y-3">
						<div class="flex flex-row items-center">
							<TagIcon aria-hidden="true" class="mr-4 h-5 w-5 text-gray-400" />
							<label for="event-title" class="sr-only">Title</label>
							<input
								id="event-title"
								class="flex-1 rounded-md"
								name="title"
								type="text"
								placeholder="Title"
							/>
						</div>
						<div class="flex flex-row items-center">
							<LocationMarkerIcon aria-hidden="true" class="mr-4 h-5 w-5 text-gray-400" />
							<label for="event-location" class="sr-only">Location</label>
							<input
								id="event-location"
								class="flex-1 rounded-md"
								name="location"
								type="text"
								placeholder="Location"
							/>
						</div>
						<label class="ml-10">
							<input
								id="event-allday"
								class="mr-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus:ring-offset-gray-900"
								type="checkbox"
								name="allday"
								checked={isAllDayEvent}
								on:click={({ currentTarget: { checked } }) => (isAllDayEvent = checked)}
							/> All day
						</label>
						<div class="flex flex-row items-center">
							{#if isAllDayEvent}
								<ClockIcon aria-hidden="true" class="mr-4 h-5 w-5 text-gray-400" />
								<label for="event-start" class="sr-only">Start date</label>
								<input
									id="event-start"
									class="flex-1 rounded-md"
									name="start"
									type="date"
									placeholder="Start"
								/>
							{:else}
								<ClockIcon aria-hidden="true" class="w-5 h-5 mr-4 text-gray-400" />
								<label for="event-start" class="sr-only">Start date and time</label>
								<input
									id="event-start"
									class="flex-1 rounded-md"
									name="start"
									type="datetime-local"
									placeholder="Start"
								/>
							{/if}
							<button
								class="ml-2 flex flex-row justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-900"
								on:click={() => (isOpen = false)}
							>
								<CalendarIcon class="mr-2 h-5 w-5" /> Pick
							</button>
						</div>
						<div class="flex flex-row items-center">
							{#if isAllDayEvent}
								<ClockIcon aria-hidden="true" class="mr-4 h-5 w-5 text-gray-400" />
								<label for="event-end" class="sr-only">End date</label>
								<input
									id="event-end"
									class="flex-1 rounded-md"
									name="end"
									type="date"
									placeholder="End"
								/>
							{:else}
								<ClockIcon aria-hidden="true" class="w-5 h-5 mr-4 text-gray-400" />
								<label for="event-end" class="sr-only">End date and time</label>
								<input
									id="event-end"
									class="flex-1 rounded-md"
									name="end"
									type="datetime-local"
									placeholder="End"
								/>
							{/if}
							<button
								class="ml-2 flex flex-row justify-center rounded-md	border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-900"
								on:click={() => (isOpen = false)}
							>
								<CalendarIcon class="mr-2 h-5 w-5" /> Pick
							</button>
						</div>

						<div class="ml-8 mt-2 space-y-4 space-x-1">
							<p class="ml-1 text-sm text-gray-400">End date optional for all-day events.</p>
							<button
								disabled
								type="button"
								class="cursor-not-allowed inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
								on:click={() => (isOpen = false)}
							>
								Create
							</button>
							<button
								type="button"
								class="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus-visible:ring-offset-gray-900"
								on:click={() => (isOpen = false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>

<style lang="postcss">
	input {
		@apply bg-transparent;
	}
	::-webkit-calendar-picker-indicator {
		@apply hidden; /* hide native picker icon */
	}
	::-webkit-datetime-edit {
		@apply dark:text-indigo-200;
	}

	::-webkit-datetime-edit-day-field:focus,
	::-webkit-datetime-edit-year-field:focus,
	::-webkit-datetime-edit-month-field:focus,
	::-webkit-datetime-edit-hour-field:focus,
	::-webkit-datetime-edit-minute-field:focus,
	::-webkit-datetime-edit-ampm-field:focus {
		@apply rounded-sm bg-indigo-100 text-indigo-900;
	}
</style>
