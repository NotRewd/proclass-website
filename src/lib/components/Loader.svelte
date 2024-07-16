<script>
	import Icon from '@iconify/svelte';
	import MainTitle from '$lib/components/MainTitle.svelte';

	export let description = 'Verifying account session...';
</script>

<div class="centered">
	<MainTitle>Hold On</MainTitle>
	<div class="flex items-center gap-3">
		<h3 class="h3">{description}</h3>
		<Icon icon="line-md:loading-loop" />
	</div>
</div>
