<script>
	import MainTitle from '$lib/components/MainTitle.svelte';
	import SignInForm from '$lib/components/SignInForm.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/shared/stores.js';

	onMount(() => {
		if ($user !== null) {
			goto('/home');
		}
	});
</script>

<div class="centered">
	<MainTitle>Sign in to ProClass</MainTitle>
	<SignInForm />
</div>
