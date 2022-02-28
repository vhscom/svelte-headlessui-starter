<script lang="ts">
	import { session } from '$app/stores';

	$: user = $session.user;
	$: attributes = Object.keys(user ?? {});

	const styleRowFromIndex = (idx: number) => {
		return idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900';
	};
</script>

{#if attributes}
	<div class="overflow-hidden bg-white shadow dark:bg-gray-900">
		<div class="px-4 py-5 sm:px-6">
			<h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
				GitHub Profile Data
			</h3>
			<p class="mt-1 max-w-2xl text-sm text-gray-400">Data stored on your GitHub profile.</p>
		</div>
		<div class="border-t border-gray-200 dark:border-gray-500">
			<dl>
				{#each attributes as attribute, idx}
					{#if attribute !== 'provider'}
						<div class="{styleRowFromIndex(idx)} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt class="text-sm font-medium text-gray-400">{attribute}</dt>
							<dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
								{#if attribute === 'plan'}
									{JSON.stringify(user[attribute])}
								{:else}
									{user[attribute]}
								{/if}
							</dd>
						</div>
					{/if}
				{/each}
			</dl>
		</div>
	</div>
{/if}
