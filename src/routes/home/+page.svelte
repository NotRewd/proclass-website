<script>
	import LoginRestricted from '$lib/components/LoginRestricted.svelte';
	import SignOutButton from '$lib/components/SignOutButton.svelte';
	import { user } from '$lib/shared/stores.js';
</script>

<LoginRestricted>
	<h2 class="h2">Welcome back, {$user.name}!</h2>
	<SignOutButton />
</LoginRestricted>
