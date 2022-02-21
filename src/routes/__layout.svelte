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
	import type { INavItem } from '$models/interfaces/nav-item.interface';
	import type { IUser } from '$models/interfaces/user.interface';
	import { DefaultLayout } from '$layouts';

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

<DefaultLayout {navigation} user={firstUser} {pageTitle}>
	<slot />
</DefaultLayout>
