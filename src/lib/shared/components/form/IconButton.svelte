<script lang="ts">
	import { goto } from '$app/navigation';
	import FallbackIcon from '~icons/heroicons-outline/plus-circle';

	export let href: string;
	export let icon = FallbackIcon;

	const activate = (target: EventTarget) => {
		target instanceof HTMLAnchorElement && goto(target.href);
	};

	const handleClick = (event: MouseEvent) => {
		event instanceof PointerEvent && event.pointerType && activate(event.target);
	};

	const handleKeyup = (event: KeyboardEvent) => {
		switch (event.code) {
			case 'Enter':
			case 'Space':
				activate(event.target);
			default:
				return;
		}
	};
</script>

<a
	role="button"
	on:click|preventDefault={handleClick}
	on:keyup={handleKeyup}
	{href}
	class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white no-underline hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
>
	<svelte:component this={icon} class="mr-2" />
	<slot>Button text</slot>
</a>
