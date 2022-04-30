<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { protectRoute } from '$utils/auth';

	export const load: Load = async ({ session, url: { pathname } }) => {
		return protectRoute(session, pathname);
	};
</script>

<script lang="ts">
	import AccountLayout from '$layouts/AccountLayout.svelte';
</script>

<AccountLayout>
	<slot />
</AccountLayout>
