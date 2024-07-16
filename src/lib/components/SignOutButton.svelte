<script>
	import Icon from '@iconify/svelte';
	import { account } from '$lib/appwrite';
	import { user } from '$lib/shared/stores.js';
	import { goto } from '$app/navigation';

	export let variant = 'variant-filled-primary';
	export let busyVariant = 'variant-ghost-primary';
	export let size = 'md';

	let busy = false;

	async function handleSignOut() {
		busy = true;

		try {
			await account.deleteSession('current');
			user.set(null);
			goto('/login');
		} catch {
			goto('/login');
		}
	}
</script>

{#if busy}
	<div class={`btn ${busyVariant} ${size}`}>
		<p>Signing out...</p>
		<Icon icon="line-md:loading-loop" />
	</div>
{:else}
	<button class={`btn ${variant} ${size}`} on:click={handleSignOut}>Sign Out</button>
{/if}
