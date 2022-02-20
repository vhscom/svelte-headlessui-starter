<script lang="ts">
	import { classes } from '$utils';
	import type { INavItem } from '$models/interfaces/inav-item.interface';
	import type { IUser } from '$lib/models/interfaces/iuser.interface';
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

	const currentUser = userData.find((datum) => datum.id === user.id);
	const gravitarUri = `https://www.gravatar.com/avatar/${currentUser.getEmailMd5Hash()}?s=64`;
</script>

<Disclosure class="bg-gray-800" as="nav" let:open>
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex items-center justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<DisclosureButton
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
				>
					<span class="sr-only">Open main menu</span>
					{#if !open}
						<MenuIcon class="h-6 w-6" />
					{:else}
						<XIcon class="h-6 w-6" />
					{/if}
				</DisclosureButton>
			</div>
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex-shrink-0 flex items-center">
					<img
						class="block lg:hidden h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
						alt="Workflow"
					/>
					<img
						class="hidden lg:block h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
						alt="Workflow"
					/>
				</div>
				<div class="hidden sm:block sm:ml-6">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						{#each navigation as { href, name, current } (name)}
							<a
								{href}
								sveltekit:prefetch
								class={classes(
									current
										? 'bg-gray-900 text-white'
										: 'text-gray-300 hover:bg-gray-700 hover:text-white',
									'px-3 py-2 rounded-md text-sm font-medium'
								)}
								aria-current={current ? 'page' : undefined}
							>
								{name}
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
					class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
				>
					<span class="sr-only">View notifications</span>
					<BellIcon class="h-6 w-6" />
				</button>

				<!-- Profile dropdown -->
				<Menu class="ml-3 relative">
					<MenuButton
						class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
							class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<!-- Active: "bg-gray-100", Not Active: "" -->
							<MenuItem
								href="/account/profile"
								sveltekit:prefetch
								class={({ active }) =>
									classes(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
							>
								Your Profile
							</MenuItem>
							<MenuItem
								href="/account/settings"
								sveltekit:prefetch
								class={({ active }) =>
									classes(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
							>
								Settings
							</MenuItem>
							<MenuItem
								href="/account/signout"
								sveltekit:prefetch
								class={({ active }) =>
									classes(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
							>
								Sign out
							</MenuItem>
						</MenuItems>
					</Transition>
				</Menu>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<DisclosurePanel class="sm:hidden">
		<div class="px-2 pt-2 pb-3 space-y-1">
			<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
			{#each navigation as { href, name, current } (name)}
				<DisclosureButton
					key={name}
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
