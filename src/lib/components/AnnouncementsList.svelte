<script>
	import AnnouncementCard from './AnnouncementCard.svelte';
	import AnnouncementCardSkeleton from './AnnouncementCardSkeleton.svelte';
	import { Query } from 'appwrite';
	import { databases } from '$lib/appwrite';
	import { onMount } from 'svelte';

	let announcements = [];
	let busy = true;

	onMount(async () => {
		const { documents } = await databases.listDocuments('main', 'announcements', [Query.limit(25)]);

		for (const document of documents) {
			document.date = new Date(document.date).toLocaleDateString('sk-SK');
		}

		announcements = documents;

		busy = false;
	});
</script>

<div class="flex flex-col gap-5">
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
			<p>{announcement.content}</p>
		</AnnouncementCard>
	{/each}
</div>
