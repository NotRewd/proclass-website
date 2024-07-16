<script>
	import { user } from '$lib/shared/stores.js';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	function handleSubmit(event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const data = {
			email: formData.get('email'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword')
		};

		const modal = {
			type: 'prompt',
			title: 'Enter Password',
			body: 'To change your settings you need provide your current password in the field below.',
			valueAttr: { type: 'text', minlength: 6, maxlength: 16, required: true },
			response: (r) => console.log('response:', r)
		};

		modalStore.trigger(modal);
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

	<button class="variant-filled-primary btn btn-sm self-start" type="submit">Save Changes</button>
</form>
