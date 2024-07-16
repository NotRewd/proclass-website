<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { account } from '$lib/appwrite';
	import { user } from '$lib/shared/stores.js';

	import Loader from '$lib/components/Loader.svelte';

	let signedIn = false;

	onMount(checkSignedIn);

	async function checkSignedIn() {
		try {
			await account.get();
			signedIn = true;
		} catch {
			goto('/login');
		}
	}
</script>

{#if signedIn && $user}
	<div class={$$restProps.class || ''}>
		<slot />
	</div>
{:else}
	<Loader />
{/if}
