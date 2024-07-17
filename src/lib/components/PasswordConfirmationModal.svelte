<script>
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	function handleCancel() {
		modalStore.close();
	}

	function handleSubmit(event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const data = {
			password: formData.get('password')
		};

		$modalStore[0].response(data);
		modalStore.close();
	}
</script>

<div class="card flex max-w-lg flex-col gap-5 p-5">
	<h3 class="h3 font-semibold">Enter Current Password</h3>
	<p>For this change to take effect, your current password is required.</p>
	<form on:submit={handleSubmit}>
		<label class="label">
			<span>Current Password</span>
			<input
				class="input px-3 py-2"
				type="password"
				name="password"
				required
				placeholder="••••••••"
			/>
		</label>

		<div
			class="border-surface-300-600-token mt-4 flex items-center justify-end gap-3 border-t pt-4"
		>
			<button on:click={handleCancel} class="variant-ringed-error btn btn-sm" type="button"
				>Cancel</button
			>
			<button class="variant-filled-primary btn btn-sm" type="submit">Confirm</button>
		</div>
	</form>
</div>
