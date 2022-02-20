<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res1 = await fetch(`/api/navigation`);
		const navigationData = await res1.json();

		const res2 = await fetch(`/api/users`);
		const userData = await res2.json();

		return {
			props: { navigationData, userData }
		};
	};
</script>

<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { INavItem } from '$lib/models/interfaces/nav-item.interface';
	import type { IUser } from '$lib/models/interfaces/user.interface';
	import { PageMeta, GlobalNav } from '$components';
	import '../app.css';

	export let navigationData: INavItem[];
	export let userData: IUser[];

	$: navigation = navigationData
		.sort((a, b) => a.weight - b.weight)
		.map((navItem) => {
			return { ...navItem, current: navItem.href === $page.url.pathname };
		});

	$: currentNavItem = navigation.find((navItem) => navItem.current);
	$: [firstUser] = userData;
	$: pageTitle = currentNavItem?.name;

	beforeUpdate(() => {
		const [firstNavItem] = navigation;
		$page.url.pathname === '/' &&
			goto(firstNavItem.href, {
				replaceState: true
			});
	});
</script>

<PageMeta {pageTitle} />
<GlobalNav {navigation} user={firstUser} />

{#if pageTitle}
	<header class="bg-white shadow">
		<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold text-gray-900">
				{pageTitle}
			</h1>
		</div>
	</header>
{/if}

<main>
	<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 prose">
		<slot />
	</div>
</main>
