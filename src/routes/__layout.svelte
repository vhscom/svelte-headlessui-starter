<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { createApi } from '$core/services/http';

	export const load: Load = async ({ fetch, session }) => {
		const api = createApi(`/api`, fetch);

		const user = session.user;

		return {
			props: {
				navigationData: await api.navigation(),
				userData: await api.user(user?.name ?? 'sir')
			}
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
	export let userData: IUser;

	$: navigation = navigationData
		.sort((a, b) => a.weight - b.weight)
		.map((navItem) => {
			return { ...navItem, current: navItem.href === $page.url.pathname };
		});

	$: currentNavItem = navigation.find((navItem) => navItem.current);
	$: pageTitle = currentNavItem?.name;
	$: user = userData;

	beforeUpdate(() => {
		const [firstNavItem] = navigation;
		$page.url.pathname === '/' &&
			goto(firstNavItem.href, {
				replaceState: true
			});
	});
</script>

<DefaultLayout {navigation} {user} {pageTitle}>
	<slot />
</DefaultLayout>
