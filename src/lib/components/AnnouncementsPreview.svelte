<script>
	import { Query } from 'appwrite';
	import AnnouncementCard from '$lib/components/AnnouncementCard.svelte';
	import AnnouncementCardSkeleton from '$lib/components/AnnouncementCardSkeleton.svelte';
	import { databases } from '$lib/appwrite';
	import { onMount } from 'svelte';

	let announcements = [];

	let busy = true;

	onMount(async () => {
		const { documents } = await databases.listDocuments('main', 'announcements', [
			Query.limit(3),
			Query.orderDesc('$createdAt')
		]);
		announcements = documents;

		busy = false;
	});
</script>

<div>
	<div class="border-surface-700-200-token flex justify-between border-b pb-3">
		<h3 class="h3 font-bold">Latest Announcements</h3>
		<a href="/announcements" class="border-surface-700-200-token btn btn-sm border">View more</a>
	</div>

	<div class="mt-5 flex flex-col items-center gap-5 md:flex-row">
		{#if busy}
			<AnnouncementCardSkeleton class="h-72 w-full max-w-sm" />
			<AnnouncementCardSkeleton class="h-72 w-full max-w-sm" />
			<AnnouncementCardSkeleton class="h-72 w-full max-w-sm" />
		{:else if announcements.length === 0}
			<p class="text-surface-500">No announcements to show.</p>
		{/if}

		{#each announcements as announcement}
			<AnnouncementCard class="h-72 w-full max-w-sm" {announcement} />
		{/each}
	</div>
</div>
