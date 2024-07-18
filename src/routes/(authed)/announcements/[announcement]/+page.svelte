<script>
	import MainTitle from '$lib/components/MainTitle.svelte';
	import { page } from '$app/stores';
	import { databases } from '$lib/appwrite';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { getToastStore, getModalStore } from '@skeletonlabs/skeleton';
	import PermissionOnly from '$lib/components/PermissionOnly.svelte';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	async function getDocument() {
		return await databases.getDocument('main', 'announcements', $page.params.announcement);
	}

	async function printDocument() {
		const res = await databases.getDocument('main', 'announcements', $page.params.announcement);
		console.log(res);
	}

	printDocument();

	let deleting = false;

	async function handleDelete() {
		deleting = true;

		await new Promise((resolve) => {
			const modalSettings = {
				type: 'confirm',
				title: 'Delete Announcement',
				body: 'Are you sure you want to delete this announcement?',
				response: (response) => {
					if (response) {
						resolve();
					} else {
						deleting = false;
					}
				}
			};

			modalStore.trigger(modalSettings);
		});

		try {
			await databases.deleteDocument('main', 'announcements', $page.params.announcement);
		} catch (error) {
			const toastSettings = {
				message: error.message,
				background: 'variant-filled-error'
			};

			toastStore.trigger(toastSettings);

			deleting = false;

			return;
		}

		const toastSettings = {
			message: 'Announcement deleted successfully!',
			background: 'variant-filled-success'
		};

		toastStore.trigger(toastSettings);

		goto('/announcements');
	}
</script>

{#await getDocument()}
	<div class="row-span-2 mt-3 grid grid-cols-5 grid-rows-10 gap-7">
		<div class="placeholder col-span-5 row-span-3 h-12 animate-pulse" />
		<div class="placeholder col-span-2 animate-pulse" />
		<div class="placeholder col-span-2 animate-pulse" />
		<div class="placeholder animate-pulse space-y-5" />
		<div class="placeholder animate-pulse" />
		<div class="placeholder col-span-4 animate-pulse" />
		<div class="placeholder animate-pulse" />
		<div class="placeholder col-span-3 animate-pulse" />
		<div class="placeholder col-span-2 animate-pulse" />
		<div class="placeholder col-span-2 animate-pulse" />
	</div>
{:then document}
	<div class="flex items-center justify-between">
		<MainTitle>{document.title}</MainTitle>
		<div class="flex shrink-0 gap-3">
			<PermissionOnly permissionsList={document.$permissions} allowedPermissions={['update']}>
				<a
					href={`/announcements/edit/${document.$id}`}
					class="border-surface-900-50-token btn btn-sm border">Edit</a
				>
			</PermissionOnly>
			<PermissionOnly permissionsList={document.$permissions} allowedPermissions={['delete']}>
				{#if deleting}
					<div class="variant-ringed-error btn btn-sm">
						Deleting...
						<Icon icon="line-md:loading-loop" />
					</div>
				{:else}
					<button on:click={handleDelete} class="variant-ringed-error btn btn-sm"> Delete </button>
				{/if}
			</PermissionOnly>
		</div>
	</div>
	<section>{document.content}</section>
{:catch error}
	<div class="flex flex-col items-center gap-5">
		<h2 class="h2 font-bold">Oops, an error occured!</h2>
		<p class="text-red-500">{error.message}</p>
	</div>
{/await}
