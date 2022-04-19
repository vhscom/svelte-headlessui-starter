<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui';
	import ChevronUpIcon from '~icons/heroicons-solid/chevron-up';
	import CodebergIcon from '~icons/custom/codeberg';
	import GitHubIcon from '~icons/cib/github';
	import { IconButton } from '$components';

	const docs = [
		{
			name: 'Headless UI',
			url: 'https://svelte-headlessui.goss.io',
			description: 'Unstyled, accessible UI components, designed to integrate with Tailwind CSS.'
		},
		{
			name: 'Icônes',
			url: 'https://icones.js.org',
			description: 'Icon Explorer with Instant searching, powered by Iconify.'
		},
		{
			name: 'Playright',
			url: 'https://playwright.dev',
			description: 'Playwright enables reliable end-to-end testing for modern web apps.'
		},
		{
			name: 'Supabase',
			url: 'https://supabase.com',
			description:
				'Create a backend in less than 2 minutes. Start your project with a Postgres Database, Authentication, instant APIs, Realtime subscriptions and Storage.'
		},
		{
			name: 'SvelteKit',
			url: 'https://kit.svelte.dev',
			description:
				'SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.'
		},
		{
			name: 'Svelte',
			url: 'https://svelte.dev',
			description:
				'Svelte is a novel approach to building user interfaces as a result of shifting work previously done in the browser into a compile step that happens when you build your app.'
		},
		{
			name: 'Tailwind CSS',
			url: 'https://tailwindcss.com',
			description:
				'A utility-first CSS framework with classes that can be composed directly in markup.'
		}
	];
</script>

<h1 class="text-xl">Svelte Headless UI Starter</h1>

<p>Template designed to make it faster and easier to build libre Svelte apps using Headless UI.</p>
<p>Get the source code.</p>

<IconButton
	class="btn btn-primary mb-2 mr-1 no-underline"
	icon={CodebergIcon}
	href="https://codeberg.org/vhs/svelte-headlessui-starter"
>
	Download on Codeberg
</IconButton>

<IconButton
	class="btn no-underline"
	icon={GitHubIcon}
	href="https://github.com/vhscom/svelte-headlessui-starter"
>
	Star on GitHub
</IconButton>

<p>Access frequently used documentation.</p>

<div class="w-full">
	<div class="w-full max-w-md rounded-xl bg-gray-50 p-2 shadow-inner dark:bg-black/20">
		{#each docs as { name, url, description }, index}
			<Disclosure class={index < docs.length - 1 && 'mb-2'} let:open>
				<DisclosureButton
					class="flex w-full justify-between rounded-md bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-400/30 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 dark:bg-gray-800 dark:text-indigo-200"
				>
					<span>{name}</span>
					<ChevronUpIcon
						class={`${
							open ? 'transform rotate-180' : ''
						} w-5 h-5 text-indigo-500 dark:text-indigo-200`}
					/>
				</DisclosureButton>
				{#if open}
					<div transition:slide|local>
						<DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-700 dark:text-gray-500">
							{description} <a rel="external" target="docs" href={url}>Docs</a>
						</DisclosurePanel>
					</div>
				{/if}
			</Disclosure>
		{/each}
	</div>
</div>
