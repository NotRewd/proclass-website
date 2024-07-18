<script>
	import { databases, ID } from '$lib/appwrite';
	import { user } from '$lib/shared/stores.js';
	import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	const toastStore = getToastStore();

	export let announcement;

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
			if (announcement) {
				await databases.updateDocument('main', 'announcements', announcement.$id, documentData);
			} else {
				await databases.createDocument('main', 'announcements', ID.unique(), documentData);
			}

			const toastSettings = {
				message: announcement
					? 'Announcement updated successfully!'
					: 'Announcement created successfully!',
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
		<input
			name="title"
			type="text"
			class="input"
			value={announcement ? announcement.title : ''}
			required
		/>
	</label>

	<label class="label">
		<span>Content</span>
		<textarea
			name="content"
			class="textarea h-80 min-h-20"
			value={announcement ? announcement.content : ''}
			required
		/>
	</label>

	{#if errorText}
		<p class="text-red-500">{errorText}</p>
	{/if}

	{#if busy}
		<div class="variant-ghost-success btn btn-sm self-start">
			{announcement ? 'Applying changes...' : 'Creating...'}
			<Icon icon="line-md:loading-loop" />
		</div>
	{:else}
		<button type="submit" class="variant-filled-success btn btn-sm self-start"
			>{announcement ? 'Apply Changes' : 'Create'}</button
		>
	{/if}
</form>
