<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ error, status }) => ({ props: { status, error } });
</script>

<script lang="ts">
	export let status: number;
	export let error: Error;

	const summary = error.message.replace(/:(.*?)$/, '');
</script>

<div class="items-top relative flex min-h-screen justify-center sm:items-center sm:pt-0">
	<div class="mx-auto max-w-xl sm:px-6 lg:px-8">
		<div class="flex items-center pt-8 sm:justify-start sm:pt-0">
			<div class="border-r border-gray-400 px-4 text-lg tracking-wider text-gray-500">
				{status}
			</div>
			<div class="ml-4 text-lg uppercase tracking-wider text-gray-500">
				{summary}
			</div>
		</div>
	</div>
</div>
