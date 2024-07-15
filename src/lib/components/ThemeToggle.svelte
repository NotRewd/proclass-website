<script>
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { theme } from '$lib/shared/stores.js';
	import Icon from '@iconify/svelte';

	function toggleTheme() {
		theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
	}
</script>

<SlideToggle
	background="bg-surface-50"
	active="bg-surface-900"
	size="sm"
	checked={$theme === 'dark'}
	on:change={(e) => toggleTheme(e.detail)}
>
	{#if $theme === 'dark'}
		<Icon icon="bi:moon" class="text-surface-50" />
	{:else}
		<Icon icon="bi:sun" class="text-surface-900" />
	{/if}
</SlideToggle>
