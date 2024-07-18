<script>
	import MainTitle from '$lib/components/MainTitle.svelte';
	import { page } from '$app/stores';
	import { databases } from '$lib/appwrite';
	import Icon from '@iconify/svelte';

	async function getDocument() {
		return await databases.getDocument('main', 'announcements', $page.params.announcement);
	}

	let deleting = false;

	async function handleDelete() {}
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
		<div class="flex gap-3">
			<a
				href={`/announcements/edit/${document.$id}`}
				class="border-surface-900-50-token btn btn-sm border">Edit</a
			>
			{#if deleting}
				<div class="variant-ringed-error btn btn-sm">
					Deleting...
					<Icon icon="line-md:loading-loop" />
				</div>
			{:else}
				<button on:click={handleDelete} class="variant-ringed-error btn btn-sm"> Delete </button>
			{/if}
		</div>
	</div>
	<section>{document.content}</section>
{:catch error}
	<div class="flex flex-col items-center gap-5">
		<h2 class="h2 font-bold">Oops, an error occured!</h2>
		<p class="text-red-500">{error.message}</p>
	</div>
{/await}
