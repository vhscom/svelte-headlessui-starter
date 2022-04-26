<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import dayjs, { type Dayjs } from 'dayjs';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
	dayjs.extend(isSameOrAfter);

	import TagIcon from '~icons/heroicons-outline/tag';
	import LocationMarkerIcon from '~icons/heroicons-outline/location-marker';
	import CalendarIcon from '~icons/heroicons-outline/calendar';
	import ClockIcon from '~icons/heroicons-outline/clock';
	import LinkIcon from '~icons/heroicons-outline/link';

	import type { AddEventFormData } from '$models/interfaces/calendar-event.interface';
	import { picks, draft } from '../store';

	let startValue: string, endValue: string;
	let isSaving = false;

	$: drafting = $draft instanceof FormData;
	$: isAllDay = drafting ? $draft.get('allday') === 'on' : true;
	$: urlValue = drafting ? $draft.get('url') : '';

	$: isAllDay, (startValue = format($picks.start));
	$: isAllDay, (endValue = format($picks.end));

	const format = (input: Dayjs | null) => {
		if (!input) return '';
		return isAllDay ? input.format('YYYY-MM-DD') : input.format('YYYY-MM-DDTHH:mm');
	};

	const dispatch = createEventDispatcher();
	const handlePickButtonClick = ({ currentTarget }) => dispatch('pickDay', currentTarget);

	const handleClearButtonClick = () => {
		draft.set(null);
		picks.set({ start: null, end: null });
		dispatch('closeModal');
	};

	let hiddenEventUrlInput: HTMLInputElement;
	const handleLocationInputEvent = ({ currentTarget }) => {
		try {
			hiddenEventUrlInput.value = new URL(currentTarget.value).href;
		} catch {
			hiddenEventUrlInput.value = '';
		}
	};

	const handleDateChange = ({ currentTarget }) => {
		picks.set({ ...$picks, [currentTarget.name]: dayjs(currentTarget.value) });
		checkCustomValidity(currentTarget.form.end as HTMLInputElement);
	};

	const checkCustomValidity = (endInput: HTMLInputElement) => {
		if (endInput.validity.valueMissing) return;

		const startInput = endInput.form.start as HTMLInputElement;
		endInput.value && dayjs(endInput.value).isSameOrAfter(startInput.value)
			? endInput.setCustomValidity('')
			: endInput.setCustomValidity('Event cannot end before it starts.');

		!endInput.value && endInput.setCustomValidity('');
		return endInput.validity.valid;
	};

	const handleFormSubmit = async (evt: SubmitEvent) => {
		const form = evt.target as HTMLFormElement;

		checkCustomValidity(form.end as HTMLInputElement);
		if (!form.checkValidity()) return form.reportValidity();

		const formData = new FormData(form) as unknown as Iterable<
			[AddEventFormData, FormDataEntryValue]
		>;
		const requestData: AddEventFormData = Object.fromEntries(formData);

		isSaving = true;
		const res = await fetch('/api/events', {
			method: 'post',
			body: JSON.stringify(requestData)
		});
		dispatch('eventCreated', await res.json());
	};
</script>

<form on:submit|preventDefault={handleFormSubmit}>
	<div class="mt-4 flex flex-col space-y-3">
		<div class="flex flex-row items-center">
			<TagIcon aria-hidden="true" class="mr-4 h-5 w-5 text-gray-400" />
			<label for="event-title" class="sr-only">Title</label>
			<input
				required
				autocomplete="off"
				maxlength="80"
				id="event-title"
				class="flex-1 rounded-md"
				name="title"
				type="text"
				placeholder="Title"
				value={drafting ? $draft.get('title') : ''}
			/>
		</div>
		<div class="flex flex-row items-center">
			{#if hiddenEventUrlInput?.value}
				<LinkIcon aria-hidden="true" class="mr-4 h-5 w-5 text-gray-400" />
			{:else}
				<LocationMarkerIcon aria-hidden="true" class="mr-4 h-5 w-5 text-gray-400" />
			{/if}
			<label for="event-location" class="sr-only">Location</label>
			<input
				autocomplete="on"
				maxlength="255"
				id="event-location"
				class="flex-1 rounded-md"
				on:input={handleLocationInputEvent}
				name="location"
				type="text"
				placeholder="Location"
				value={drafting ? $draft.get('location') : ''}
			/>
			<input
				bind:this={hiddenEventUrlInput}
				id="event-url"
				name="url"
				type="hidden"
				value={urlValue}
			/>
		</div>
		<label class="ml-10">
			<input
				id="event-allday"
				class="mr-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus:ring-offset-gray-900"
				type="checkbox"
				name="allday"
				checked={isAllDay}
				on:change={({ currentTarget: { checked } }) => (isAllDay = checked)}
			/> All day
		</label>
		<div class="flex flex-row items-center">
			<ClockIcon aria-hidden="true" class="mr-4 h-5 w-5 text-gray-400" />
			<label for="event-start" class="sr-only">Start date and time</label>
			<input
				required
				id="event-start"
				class="flex-1 rounded-md"
				name="start"
				type={isAllDay ? 'date' : 'datetime-local'}
				placeholder="Start"
				value={startValue}
				on:change={handleDateChange}
			/>
			<button
				type="button"
				name="pick-start"
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
				required={!isAllDay}
				id="event-end"
				class="flex-1 rounded-md"
				name="end"
				type={isAllDay ? 'date' : 'datetime-local'}
				placeholder="End"
				value={endValue}
				on:change={handleDateChange}
			/>
			<button
				type="button"
				name="pick-end"
				class="btn ml-2 hidden sm:inline-flex"
				on:click|preventDefault={handlePickButtonClick}
			>
				<CalendarIcon class="h-5 w-5" /> Pick
			</button>
		</div>

		<div class="ml-8 mt-2 space-y-3 space-x-1">
			<p class="ml-1 text-sm text-gray-400">End date optional for all-day events.</p>
			<div class="flex flex-row items-center space-x-2">
				{#if isSaving}
					<button disabled class="btn btn-primary justify-center" type="submit">Save</button>
				{:else}
					<button class="btn btn-primary justify-center" type="submit">Save</button>
				{/if}
				<button class="btn" type="reset" on:click={handleClearButtonClick}> Clear </button>
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
		@apply sm:before:hidden sm:after:content-[attr(placeholder)];
	}

	input[type^='date']::after,
	input[type^='date']::before {
		@apply text-gray-500;
	}

	input[type^='date']::before {
		@apply mr-1 w-10;
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
