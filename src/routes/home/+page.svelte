<script>
	import LoginRestricted from '$lib/components/LoginRestricted.svelte';
	import { account } from '$lib/appwrite';
	import { user } from '$lib/shared/stores.js';

	function handleSignOut() {
		account.deleteSession('current');
		user.set(null);
		location.reload();
	}
</script>

<LoginRestricted>
	<h2 class="h2">Welcome back!</h2>
	<button class="variant-filled-primary btn" on:click={handleSignOut}>Sign Out</button>
</LoginRestricted>
