<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/shared/stores.js';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($user === null) {
			goto('/login');
		}
	});
</script>

<div class={$$restProps.class || ''}>
	<slot />
</div>
