<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/shared/stores.js';
	import { onDestroy } from 'svelte';

	const unsubscribe = user.subscribe((value) => {
		if (!value) {
			goto('/login');
		}
	});

	onDestroy(unsubscribe);
</script>

{#if $user}
	<div class={$$restProps.class || ''}>
		<slot />
	</div>
{/if}
