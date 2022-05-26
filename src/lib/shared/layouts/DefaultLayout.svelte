<script lang="ts">
	import { session } from '$app/stores';
	import type { INavItem } from '$models/interfaces/nav-item.interface';
	import type { IUser } from '$models/interfaces/user.interface';
	import { PageMeta, GlobalNav } from '$components';
	import '../../../app.css';

	export let navigation: INavItem[];
	export let user: IUser;
	export let pageTitle: string | null;
</script>

{#key pageTitle}
	<PageMeta {pageTitle} />
{/key}

{#if $session.error}
	<slot />
{:else}
	<GlobalNav {navigation} {user} />

	{#if pageTitle}
		<header class="bg-white shadow dark:bg-gray-850">
			<div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
				<h1 class="text-3xl font-bold text-gray-900 dark:text-white">
					{pageTitle}
				</h1>
			</div>
		</header>
	{/if}

	<main>
		<div class="prose mx-auto max-w-7xl py-6 px-4 dark:prose-invert sm:px-6 lg:px-8">
			<slot />
		</div>
	</main>
{/if}
