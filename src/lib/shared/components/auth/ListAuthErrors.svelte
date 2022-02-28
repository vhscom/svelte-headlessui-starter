<script lang="ts">
	import { session, page } from '$app/stores';

	const params: URLSearchParams = $page.url.searchParams;
	const errorParam = params.get('error');

	$: user = $session.user;
	$: badCredentials = user?.provider === 'github' && user?.message === 'Bad credentials';
</script>

{#if errorParam}
	<aside class="not-prose mb-4 bg-red-50 p-4 text-sm shadow-inner dark:bg-red-900/70">
		<h1 class="font-semibold">Authorization request error</h1>
		<p>
			{params.get('error_description')}
			<a target="_blank" class="underline" href={params.get('error_uri')}>More info</a>
		</p>
	</aside>
{/if}

{#if badCredentials}
	<aside class="not-prose mb-4 bg-red-50 p-4 text-sm shadow-inner dark:bg-red-900/70">
		<h1 class="font-semibold">Authorization error</h1>
		<p>
			{user.message}
			<a target="_blank" class="underline" href={user.documentation_url}>More info</a>
		</p>
	</aside>
{/if}
