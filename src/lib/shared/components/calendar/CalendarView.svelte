<script lang="ts">
	export let initialView = 'dayGridView';
	const currentView = initialView;
</script>

<section class="not-prose">
	<slot view={currentView} />
</section>
