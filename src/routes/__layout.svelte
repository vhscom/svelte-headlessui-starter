<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { createApi } from '$core/services/http';
	import type { INavItem } from '$models/interfaces/nav-item.interface';
	import { NavItemModel } from '$models/classes/nav-item.model';
	import type { IUser } from '$models/interfaces/user.interface';
	import { UserModel } from '$models/classes/user.model';

	export const load: Load = async ({ fetch, session }) => {
		const api = createApi(`/api`, fetch);

		const userData: IUser = await api.user(session.user?.name ?? 'sir');
		const user: UserModel = new UserModel().deserialize(userData);

		const navigationData: INavItem[] = await api.navigation();
		const navigation: NavItemModel[] = navigationData.map((value) =>
			new NavItemModel().deserialize(value)
		);

		return {
			props: { navigation, user }
		};
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { DefaultLayout } from '$layouts';

	export let navigation: NavItemModel[];
	export let user: UserModel;

	$: navigation = navigation.map((navItem) => navItem.setCurrent($page.url.pathname));
	$: currentNavItem = navigation.find((navItem) => navItem.current);
	$: pageTitle = currentNavItem?.name;
</script>

<DefaultLayout {navigation} {user} {pageTitle}>
	<slot />
</DefaultLayout>
