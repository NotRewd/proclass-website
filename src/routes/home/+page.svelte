<script>
	import LoginRestricted from '$lib/components/LoginRestricted.svelte';
	import SignOutButton from '$lib/components/SignOutButton.svelte';
	import MainTitle from '$lib/components/MainTitle.svelte';
	import { user } from '$lib/shared/stores.js';
</script>

<LoginRestricted class="mx-10 mt-20">
	<MainTitle>Welcome back, {$user.name}!</MainTitle>
	<SignOutButton />
</LoginRestricted>
