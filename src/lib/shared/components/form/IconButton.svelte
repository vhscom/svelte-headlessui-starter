<script lang="ts">
	import FallbackIcon from '~icons/heroicons-outline/plus-circle';
	export let href: string;
	export let icon = FallbackIcon;
</script>

<a
	{href}
	class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-900 no-underline hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
>
	<svelte:component this={icon} class="mr-2" />
	<slot>Button text</slot>
</a>
