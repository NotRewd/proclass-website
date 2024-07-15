<script>
	import MainTitle from '$lib/components/MainTitle.svelte';
	import SignInForm from '$lib/components/SignInForm.svelte';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/shared/stores.js';

	const unsubscribe = user.subscribe((value) => {
		if (value) {
			goto('/home');
		}
	});

	onDestroy(unsubscribe);
</script>

<div class="centered">
	<MainTitle>Sign in to ProClass</MainTitle>
	<SignInForm />
</div>
