<script lang="ts">
	import { classes } from '$utils';
	export let items: string[];
</script>

<div
	class="grid w-full grid-cols-7 items-center border border-y-gray-300 bg-white text-center dark:border-y-gray-600 dark:border-x-gray-700 dark:bg-gray-800"
>
	{#each items as item, idx}
		<span
			id="day-col-{idx}"
			class={classes(
				'text-xs font-bold py-3',
				!(idx === items.length - 1) && 'border-r dark:border-x-gray-700'
			)}
		>
			{item.substring(0, 3)}
		</span>
	{/each}
</div>
