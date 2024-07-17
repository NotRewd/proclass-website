<script>
	import { user } from '$lib/shared/stores.js';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { account } from '$lib/appwrite';
	import Icon from '@iconify/svelte';

	const modalStore = getModalStore();

	let errorText = '';
	let successText = '';
	let busy = false;

	async function handleSubmit(event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const data = {
			email: formData.get('email'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword')
		};

		if ($user.email === data.email && !data.password && !data.confirmPassword) return;

		if (data.password !== data.confirmPassword) {
			errorText = 'Passwords do not match!';
			return;
		}

		if (data.password && data.password.length < 8) {
			errorText = 'Password must be at least 8 characters long!';
			return;
		}

		errorText = '';
		successText = '';

		const res = await new Promise((resolve) => {
			const modal = {
				type: 'component',
				component: 'passwordConfirmation',
				response: (r) => resolve(r)
			};

			modalStore.trigger(modal);
		});

		if (!res) return;

		busy = true;

		if ($user.email !== data.email) {
			try {
				await account.updateEmail(data.email, res.password);
			} catch (error) {
				errorText = error.message;

				busy = false;
				return;
			}
		}

		if (data.password) {
			try {
				await account.updatePassword(data.password, res.password);
			} catch (error) {
				errorText = error.message;

				busy = false;
				return;
			}
		}

		user.set(await account.get());

		if (!errorText) {
			successText = 'Profile updated successfully!';
		}

		busy = false;
	}
</script>

<form on:submit={handleSubmit} class="flex max-w-md flex-col gap-5">
	<div class="label">
		<span>Name</span>
		<div class="input px-3 py-2">{$user.name}</div>
	</div>

	<label class="label">
		<span>Email</span>
		<input
			class="input px-3 py-2"
			type="email"
			name="email"
			placeholder="example@gmail.com"
			value={$user.email}
			required
		/>
	</label>

	<label class="label">
		<span>New Password</span>
		<input class="input px-3 py-2" type="password" name="password" placeholder="••••••••" />
	</label>

	<label class="label">
		<span>Confirm Password</span>
		<input class="input px-3 py-2" type="password" name="confirmPassword" placeholder="••••••••" />
	</label>

	{#if errorText}
		<p class="text-sm text-red-500">{errorText}</p>
	{/if}

	{#if successText}
		<p class="text-sm text-green-500">{successText}</p>
	{/if}

	{#if busy}
		<div class="variant-ghost-primary btn btn-sm gap-2 self-start">
			Saving...
			<Icon icon="line-md:loading-loop" />
		</div>
	{:else}
		<button class="variant-filled-primary btn btn-sm self-start" type="submit">Save Changes</button>
	{/if}
</form>
