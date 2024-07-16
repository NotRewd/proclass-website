<script>
	import Icon from '@iconify/svelte';
	import { account } from '$lib/appwrite';
	import { user } from '$lib/shared/stores.js';
	import { goto } from '$app/navigation';

	let busy = false;

	async function handleSignOut() {
		busy = true;
		await account.deleteSession('current');
		user.set(null);
		goto('/login');
	}
</script>

{#if busy}
	<div class="variant-ghost-primary btn">
		<p>Signing out...</p>
		<Icon icon="line-md:loading-loop" />
	</div>
{:else}
	<button class="variant-filled-primary btn" on:click={handleSignOut}>Sign Out</button>
{/if}
