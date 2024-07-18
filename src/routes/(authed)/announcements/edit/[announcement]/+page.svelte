<script>
	import MainTitle from '$lib/components/MainTitle.svelte';
	import EditAnnouncementForm from '$lib/components/EditAnnouncementForm.svelte';
	import { page } from '$app/stores';
	import { databases } from '$lib/appwrite';

	const getDocument = async () => {
		return await databases.getDocument('main', 'announcements', $page.params.announcement);
	};
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
	<MainTitle>Edit Announcement</MainTitle>
	<EditAnnouncementForm announcement={document} />
{:catch error}
	<div class="flex flex-col items-center gap-5">
		<h2 class="h2 font-bold">Oops, an error occured!</h2>
		<p class="text-red-500">{error.message}</p>
	</div>
{/await}
