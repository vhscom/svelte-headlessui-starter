<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import { classes } from '$utils';

	export let value: Dayjs;
	export let isToday: boolean;
	export let todayPing: boolean;
	export let descriptor: string;
	export let shouldHideValue = false;
</script>

<time class="w-full relative" datetime={value.format()} aria-describedby={descriptor}>
	{#if !shouldHideValue}
		<div
			class="select-none py-1.5 sm:py-2.5 px-2.5 sm:px-2.5 h-full w-full text-right text-xs sm:text-left"
		>
			{#if isToday}
				<div class="relative inline-flex h-5 w-5 sm:h-6 sm:w-6">
					<div
						class={classes(
							'absolute inset-0 ml-1.5 sm:-ml-0.5 -mt-0.5 sm:-mt-1 w-full h-full rounded-full bg-indigo-600'
						)}
					/>
					<div
						class={classes(
							'absolute inset-0 ml-1.5 sm:-ml-0.5 -mt-0.5 sm:-mt-1 w-full h-full rounded-full bg-indigo-600',
							todayPing && 'animate-ping'
						)}
					/>
					<span class="absolute inset-0 ml-1.5 font-semibold text-white">
						{value.format('D')}
					</span>
				</div>
			{:else}
				{value.format('D')}
			{/if}
		</div>
	{/if}
</time>
