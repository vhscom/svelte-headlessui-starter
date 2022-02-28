<script lang="ts">
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { ListAuthErrors } from '$components';

	const signinUrl = '/account/signin';

	$: user = $session.user;
	$: path = $page.url.pathname;

	// Redirect unauthenticated users to sign-in page.
	beforeUpdate(() => {
		if (path === signinUrl) return;
		!user && goto(signinUrl, { replaceState: true });
	});
</script>

{#if user || path === signinUrl}
	<ListAuthErrors />
	<slot />
{/if}
