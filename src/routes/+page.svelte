<script>
	import MainTitle from '$lib/components/MainTitle.svelte';
	import { user } from '$lib/shared/stores.js';
	import { goto } from '$app/navigation';

	$: {
		if ($user) {
			goto('/home');
		}
	}
</script>

<div class="centered">
	<MainTitle>Welcome to ProClass</MainTitle>

	<h2 class="h3 mb-10 font-extralight">A website for all the materials you need!</h2>

	<a href="/login" class="variant-filled-primary btn">Sign In</a>
</div>
