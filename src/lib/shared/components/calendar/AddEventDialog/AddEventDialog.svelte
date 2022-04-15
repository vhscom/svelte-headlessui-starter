<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogDescription,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';

	import EventInputForm from './EventInputForm.svelte';

	export let isOpen = false;
</script>

<Transition appear show={isOpen}>
	<Dialog on:close={() => (isOpen = false)} class="fixed inset-0 z-10 overflow-y-auto">
		<div class="min-h-screen px-4 text-center text-gray-900 dark:text-white">
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<DialogOverlay
					class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity dark:bg-gray-800 dark:bg-opacity-75"
				/>
			</TransitionChild>
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				enterTo="opacity-100 translate-y-0 sm:scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 translate-y-0 sm:scale-100"
				leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			>
				<!-- This element is to trick the browser into centering the modal contents. -->
				<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
					&#8203;
				</span>
				<div
					class="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900"
				>
					<div class="ml-10">
						<DialogTitle class="text-lg font-medium leading-6">Add event</DialogTitle>
						<DialogDescription class="text-gray-500 dark:text-gray-400">
							Create a new calendar event.
						</DialogDescription>
					</div>
					<EventInputForm on:eventCreated on:pickDay on:closeModal={() => (isOpen = false)} />
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
