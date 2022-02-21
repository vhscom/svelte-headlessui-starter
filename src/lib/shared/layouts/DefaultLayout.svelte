<script lang="ts">
	import type { INavItem } from '$models/interfaces/nav-item.interface';
	import type { IUser } from '$models/interfaces/user.interface';
	import { PageMeta, GlobalNav } from '$components';
	import '../../../app.css';

	export let navigation: INavItem[];
	export let user: IUser;
	export let pageTitle: string | undefined;
</script>

<PageMeta {pageTitle} />
<GlobalNav {navigation} {user} />

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
