<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { fade } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { navigationData } from '$data';
	import { GlobalNav } from '$components/navigation';
	import '../app.css';

	$: navigation = navigationData
		.sort((a, b) => a.weight - b.weight)
		.map((navItem) => {
			return { ...navItem, current: navItem.href === $page.url.pathname };
		});

	$: [currentNavItem] = navigation.filter((navItem) => navItem.current);

	beforeUpdate(() => {
		const [firstNavItem] = navigation;
		$page.url.pathname === '/' &&
			goto(firstNavItem.href, {
				replaceState: true
			});
	});
</script>

<GlobalNav {navigation} />

{#if currentNavItem}
	<header class="bg-white shadow">
		<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold text-gray-900">
				{currentNavItem.name}
			</h1>
		</div>
	</header>
{/if}

<main in:fade={{ easing: quintIn }}>
	<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 prose">
		<slot />
	</div>
</main>
