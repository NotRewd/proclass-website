<script>
	import { databases, ID } from '$lib/appwrite';
	import { user } from '$lib/shared/stores.js';
	import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	const toastStore = getToastStore();

	let busy = false;
	let errorText = '';

	async function handleSubmit(event) {
		busy = true;

		const form = event.target;
		const formData = new FormData(form);

		const documentData = {
			title: formData.get('title'),
			content: formData.get('content'),
			author: $user.name
		};

		try {
			await databases.createDocument('main', 'announcements', ID.unique(), documentData);

			const toastSettings = {
				message: 'Successfully created new announcement!',
				background: 'variant-filled-success'
			};

			toastStore.trigger(toastSettings);

			goto('/announcements');
		} catch (error) {
			errorText = error.message;
			busy = false;
		}
	}
</script>

<form on:submit={handleSubmit} class="flex flex-col gap-5">
	<label class="label">
		<span>Title</span>
		<input name="title" type="text" class="input" required />
	</label>

	<label class="label">
		<span>Content</span>
		<textarea name="content" class="textarea h-80 min-h-20" required />
	</label>

	{#if errorText}
		<p class="text-red-500">{errorText}</p>
	{/if}

	{#if busy}
		<div class="variant-ghost-success btn btn-sm self-start">
			Creating...
			<Icon icon="line-md:loading-loop" />
		</div>
	{:else}
		<button type="submit" class="variant-filled-success btn btn-sm self-start">Create</button>
	{/if}
</form>
