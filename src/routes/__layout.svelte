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
	import { page } from '$app/stores';
	import type { INavItem } from '$models/interfaces/nav-item.interface';
	import type { IUser } from '$models/interfaces/user.interface';
	import { formatNavigation } from '$utils';
	import { DefaultLayout } from '$layouts';

	export let navigationData: INavItem[];
	export let userData: IUser;

	$: navigation = formatNavigation(navigationData, $page.url.pathname);
	$: currentNavItem = navigation.find((navItem) => navItem.current);
	$: pageTitle = currentNavItem?.name;
	$: user = userData;
</script>

<DefaultLayout {navigation} {user} {pageTitle}>
	<slot />
</DefaultLayout>
