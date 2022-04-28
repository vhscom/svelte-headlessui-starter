<script lang="ts">
	import { goto } from '$app/navigation';
	import FallbackIcon from '~icons/heroicons-outline/plus-circle';

	export let href: string;
	export let icon = FallbackIcon;

	const activate = (target: EventTarget) => {
		target instanceof HTMLAnchorElement && goto(target.href);
	};

	const handleClick = (event: MouseEvent) => {
		event instanceof MouseEvent && activate(event.target);
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
	class="btn no-underline"
	{...$$restProps}
>
	<svelte:component this={icon} class="mr-2" />
	<slot>Button text</slot>
</a>
