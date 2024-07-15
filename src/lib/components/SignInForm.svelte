<script>
	import Icon from '@iconify/svelte';
	import { account } from '$lib/appwrite';
	import { goto } from '$app/navigation';
	import { user } from '$lib/shared/stores.js';

	let busy = false;
	let errorText = '';

	async function loginUser(email, password) {
		busy = true;

		try {
			await account.createEmailPasswordSession(email, password);
			const acc = await account.get();
			user.set(acc);
			goto('/home');
		} catch (error) {
			errorText = error.message;
		}

		busy = false;
	}

	function handleSubmit(event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);
		const email = formData.get('email');
		const password = formData.get('password');

		loginUser(email, password);
	}
</script>

<form on:submit={handleSubmit} class="flex max-w-md flex-col gap-5">
	<label class="label">
		<span>Email</span>
		<input
			class="input px-3 py-2"
			type="email"
			name="email"
			placeholder="john@example.com"
			required
		/>
	</label>

	<label class="label">
		<span>Password</span>
		<input
			class="input px-3 py-2"
			type="password"
			name="password"
			placeholder="••••••••"
			required
		/>
	</label>

	{#if errorText}
		<p class="max-w-xs text-red-500">{errorText}</p>
	{/if}

	{#if busy}
		<div class="variant-ghost-primary btn mt-5 self-start">
			<p>Signing in...</p>
			<Icon icon="line-md:loading-loop" />
		</div>
	{:else}
		<button type="submit" class="variant-filled-primary btn mt-5 self-start">Sign In</button>
	{/if}
</form>
