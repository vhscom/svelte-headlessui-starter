<script lang="ts">
	import { slide, crossfade } from 'svelte/transition';
	import { quintInOut, quadInOut } from 'svelte/easing';

	import { session } from '$app/stores';
	import { classes } from '$utils';
	import type { INavItem } from '$models/interfaces/nav-item.interface';
	import type { IUser } from '$models/interfaces/user.interface';
	import { userData } from '$data';

	import BellIcon from '~icons/heroicons-outline/bell';
	import XIcon from '~icons/heroicons-outline/x';
	import MenuIcon from '~icons/heroicons-outline/menu';

	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Transition
	} from '@rgossiaux/svelte-headlessui';

	export let navigation: INavItem[];
	export let user: IUser;

	const [send, receive] = crossfade({
		duration: 150,
		easing: quadInOut
	});
	const key = Symbol();

	const currentUser = userData.find((datum) => datum.id === user.id);
	const gravitarUri = `https://www.gravatar.com/avatar/${currentUser.getEmailMd5Hash()}?s=64`;
</script>

<Disclosure class="bg-gray-800" as="nav" let:open>
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<DisclosureButton
					class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-700 focus-visible:ring-offset-gray-800"
				>
					<span class="sr-only">Open main menu</span>
					<div class="relative h-6 w-6">
						{#if !open}
							<div class="absolute inset-0" in:send={{ key }} out:receive={{ key }}>
								<MenuIcon class="h-6 w-6" />
							</div>
						{:else}
							<div class="absolute inset-0" in:send={{ key }} out:receive={{ key }}>
								<XIcon class="h-6 w-6" />
							</div>
						{/if}
					</div>
				</DisclosureButton>
			</div>
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex flex-shrink-0 items-center">
					<img
						class="block h-8 w-auto lg:hidden"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
						alt="Workflow"
					/>
					<img
						class="hidden h-8 w-auto lg:block"
						src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
						alt="Workflow"
					/>
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						{#each navigation as { href, name, current } (name)}
							<a
								{href}
								sveltekit:prefetch
								class={classes(
									current ? 'bg-gray-900 text-white' : 'text-gray-300',
									'relative px-3 py-2 rounded-md text-sm font-medium group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800'
								)}
								aria-current={current ? 'page' : undefined}
							>
								<span
									aria-hidden="true"
									class="absolute top-1/2 left-1/2 h-full w-0 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-700 opacity-0 transition-all group-hover:w-full group-hover:opacity-100"
								/>
								<span class="relative group-hover:text-white">{name}</span>
							</a>
						{/each}
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<button
					type="button"
					class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
				>
					<span class="sr-only">View notifications</span>
					<BellIcon class="h-6 w-6" />
				</button>

				<!-- Profile dropdown -->
				<Menu class="relative ml-3">
					<MenuButton
						class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
					>
						<span class="sr-only">Open user menu</span>
						<img class="h-8 w-8 rounded-full" src={gravitarUri} alt="" />
					</MenuButton>

					<!-- Dropdown menu, show/hide based on menu state. -->
					<Transition
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<MenuItems
							class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900"
						>
							<!-- Active: "bg-gray-100", Not Active: "" -->
							<MenuItem
								href="/account/profile"
								sveltekit:prefetch
								class={({ active }) =>
									classes(
										active ? 'bg-gray-100 dark:bg-gray-800' : '',
										'block px-4 py-2 text-sm text-gray-700 dark:text-white'
									)}
							>
								Your Profile
							</MenuItem>
							<MenuItem
								href="/account/settings"
								sveltekit:prefetch
								class={({ active }) =>
									classes(
										active ? 'bg-gray-100 dark:bg-gray-800' : '',
										'block px-4 py-2 text-sm text-gray-700 dark:text-white'
									)}
							>
								Settings
							</MenuItem>
							{#if $session?.user}
								<MenuItem
									href="/account/signout"
									sveltekit:prefetch
									class={({ active }) =>
										classes(
											active ? 'bg-gray-100 dark:bg-gray-800' : '',
											'block px-4 py-2 text-sm text-gray-700 dark:text-white'
										)}
								>
									Sign out
								</MenuItem>
							{:else}
								<MenuItem
									href="/account/signin"
									sveltekit:prefetch
									class={({ active }) =>
										classes(
											active ? 'bg-gray-100 dark:bg-gray-800' : '',
											'block px-4 py-2 text-sm text-gray-700 dark:text-white'
										)}
								>
									Sign in
								</MenuItem>
							{/if}
						</MenuItems>
					</Transition>
				</Menu>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<DisclosurePanel class="sm:hidden">
		<div transition:slide={{ easing: quintInOut, duration: 350 }} class="space-y-1 px-2 pt-2 pb-3">
			<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
			{#each navigation as { href, name, current } (name)}
				<DisclosureButton
					as="a"
					{href}
					sveltekit:prefetch
					class={classes(
						current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
						'block px-3 py-2 rounded-md text-base font-medium'
					)}
					aria-current={current ? 'page' : undefined}
				>
					{name}
				</DisclosureButton>
			{/each}
		</div>
	</DisclosurePanel>
</Disclosure>
