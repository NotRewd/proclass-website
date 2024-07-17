<script>
	import AnnouncementCard from './AnnouncementCard.svelte';
	import AnnouncementCardSkeleton from './AnnouncementCardSkeleton.svelte';
	import { Query } from 'appwrite';
	import { databases } from '$lib/appwrite';
	import { onMount } from 'svelte';
	import { Paginator } from '@skeletonlabs/skeleton';

	let announcements = [];
	let busy = true;

	let paginationSettings = {
		page: 0,
		limit: 25,
		size: 2,
		amounts: [5, 10, 25]
	};

	$: () =>
		loadDocuments(paginationSettings.page * paginationSettings.limit, paginationSettings.limit);

	onMount(() => loadDocuments(0, paginationSettings.limit));

	async function loadDocuments(offset, limit) {
		busy = true;

		const { documents } = await databases.listDocuments('main', 'announcements', [
			Query.limit(limit),
			Query.offset(offset)
		]);

		for (const document of documents) {
			document.date = new Date(document.date).toLocaleDateString('sk-SK');
		}

		announcements = documents;
		paginationSettings.size = announcements.length;

		busy = false;
	}
</script>

<div class="mb-10 flex flex-col gap-5" showPreviousNextButtons>
	{#if busy}
		<AnnouncementCardSkeleton class="h-52" />
		<AnnouncementCardSkeleton class="h-52" />
	{:else if announcements.length === 0}
		<p class="text-surface-500">No announcements to show.</p>
	{/if}

	{#each announcements as announcement}
		<AnnouncementCard
			class="h-52"
			title={announcement.title}
			author={announcement.author}
			date={announcement.date}
		>
			{announcement.content}
		</AnnouncementCard>
	{/each}
</div>

<Paginator
	bind:settings={paginationSettings}
	showNumerals
	controlVariant="variant-filled-surface"
/>
