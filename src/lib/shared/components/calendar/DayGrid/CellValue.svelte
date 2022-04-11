<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import { classes } from '$utils';

	export let value: Dayjs;
	export let isToday: boolean;
	export let todayPing: boolean;
	export let descriptor: string;
	export let shouldHideValue = false;
</script>

<time class="relative w-full" datetime={value.format()} aria-describedby={descriptor}>
	{#if !shouldHideValue}
		<div
			class="h-full w-full select-none py-1.5 px-2.5 text-right text-xs sm:py-2.5 sm:px-2.5 sm:text-left"
		>
			{#if isToday}
				<div class="relative -mt-0.5 -mr-1 inline-flex h-5 w-5 sm:-mt-1 sm:-ml-1 sm:h-6 sm:w-6">
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
