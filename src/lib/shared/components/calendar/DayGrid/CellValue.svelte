<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import dayjs, { type Dayjs } from 'dayjs';
	import type { CalendarEventModel } from '$models/classes/calendar-event.model';
	import { EventJsonLd } from '$components/meta';
	import { classes } from '$utils';

	export let value: Dayjs;
	export let isToday: boolean;
	export let todayPing: boolean;
	export let descriptor: string;
	export let shouldHideValue = false;

	export let calendarEvents: CalendarEventModel[];

	$: eventsForDay = ((dayOfWeek: Dayjs) =>
		calendarEvents.filter((event) =>
			dayjs(event.start).isBetween(dayOfWeek, dayOfWeek.endOf('day'), null, '[)')
		))(value);

	const dispatch = createEventDispatcher();
	const handleDayClick = () => dispatch('dayClick', value);
</script>

<div class="h-full w-full" on:click={handleDayClick}>
	<time class="relative w-full" datetime={value.format()} aria-describedby={descriptor}>
		{#if !shouldHideValue}
			<div
				class="h-full w-full select-none py-1.5 px-2.5 text-right text-xs sm:py-2.5 sm:px-2.5 sm:text-left"
			>
				{#if isToday}
					<div
						class="relative -mt-0.5 -mb-2 -mr-1 inline-flex h-5 w-5 sm:-mt-1 sm:-ml-1 sm:h-6 sm:w-6"
					>
						<div class="absolute h-full w-full rounded-full bg-indigo-600" />
						<div
							class={classes(
								'absolute w-full h-full rounded-full bg-indigo-600',
								todayPing && 'animate-ping'
							)}
						/>
						<span
							class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-white sm:font-semibold"
						>
							{value.format('D')}
						</span>
					</div>
				{:else}
					{value.format('D')}
				{/if}
			</div>
		{/if}
	</time>

	{#if eventsForDay.length !== 0}
		<dl
			class="absolute inset-x-0 top-6 flex space-y-1.5 px-2.5 text-xs sm:top-9 sm:-mt-1 md:top-8 md:mt-1 md:flex-col"
		>
			{#each eventsForDay as calendarEvent}
				{@const startTime = dayjs(calendarEvent.start)}
				{@const eventTitle = calendarEvent.title ?? 'Untitled event'}
				<EventJsonLd {calendarEvent} />
				<div class="hidden md:flex">
					<dt
						class="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap font-medium text-gray-900 dark:text-white"
					>
						{eventTitle}
					</dt>
					<dd class="ml-1.5 whitespace-nowrap text-gray-500 dark:text-gray-400">
						<time datetime={startTime.format()}>
							{startTime.format('mm') === '00' ? startTime.format('hA') : startTime.format('h:mmA')}
						</time>
					</dd>
				</div>
				<div
					title={eventTitle}
					class="mr-0.5 flex rounded-full bg-indigo-300 p-1 sm:mr-1.5 sm:p-1.5 md:hidden"
				>
					<time datetime={startTime.format()} class="sr-only">{startTime.format('h:mmA')}</time>
				</div>
			{/each}
		</dl>
	{/if}
</div>
