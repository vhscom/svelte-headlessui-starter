<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import TagIcon from '~icons/heroicons-outline/tag';
	import LocationMarkerIcon from '~icons/heroicons-outline/location-marker';
	import CalendarIcon from '~icons/heroicons-outline/calendar';
	import ClockIcon from '~icons/heroicons-outline/clock';

	$: isAllDayEvent = true;

	const dispatch = createEventDispatcher();

	const handleCreateButtonClicked = () => dispatch('closeModal');
	const handlePickButtonClick = () => dispatch('closeModal');
	const handleCancelButtonClicked = () => dispatch('closeModal');
</script>

<form on:submit|preventDefault>
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
			<ClockIcon aria-hidden="true" class="w-5 h-5 mr-4 text-gray-400" />
			<label for="event-start" class="sr-only">Start date and time</label>
			<input
				id="event-start"
				class="flex-1 rounded-md"
				name="start"
				type={isAllDayEvent ? 'date' : 'datetime-local'}
				placeholder="Start"
			/>
			<button
				type="button"
				class="btn ml-2 hidden sm:inline-flex"
				on:click|preventDefault={handlePickButtonClick}
			>
				<CalendarIcon class="h-5 w-5" /> Pick
			</button>
		</div>
		<div class="flex flex-row items-center">
			<ClockIcon aria-hidden="true" class="mr-4 h-5 w-5 text-gray-400" />
			<label for="event-end" class="sr-only">End date</label>
			<input
				id="event-end"
				class="flex-1 rounded-md"
				name="end"
				type={isAllDayEvent ? 'date' : 'datetime-local'}
				placeholder="End"
			/>
			<button
				type="button"
				class="btn ml-2 hidden sm:inline-flex"
				on:click|preventDefault={handlePickButtonClick}
			>
				<CalendarIcon class="h-5 w-5" /> Pick
			</button>
		</div>

		<div class="ml-8 mt-2 space-y-3 space-x-1">
			<p class="ml-1 text-sm text-gray-400">End date optional for all-day events.</p>
			<div class="flex flex-row items-center space-x-2">
				<button
					class="btn btn-primary"
					disabled
					type="submit"
					on:click|preventDefault={handleCreateButtonClicked}
				>
					Save
				</button>
				<button class="btn" type="reset" on:click={handleCancelButtonClicked}> Clear </button>
			</div>
		</div>
	</div>
</form>

<style lang="postcss">
	input {
		@apply bg-transparent;
	}

	input[type^='date']:not(:placeholder-shown) {
		@apply before:content-[attr(placeholder)];
		@apply sm:after:content-[attr(placeholder)] sm:before:hidden;
	}

	input[type^='date']::after,
	input[type^='date']::before {
		@apply text-gray-500;
	}

	input[type^='date']::before {
		@apply w-10 mr-1;
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
