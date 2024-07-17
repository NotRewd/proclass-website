<script>
	import { Query } from 'appwrite';
	import Announcement from '$lib/components/Announcement.svelte';
	import { databases } from '$lib/appwrite';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let announcements = [];

	let busy = true;

	onMount(async () => {
		const { documents } = await databases.listDocuments('main', 'announcements', [Query.limit(3)]);

		for (const document of documents) {
			document.date = new Date(document.date).toLocaleDateString('sk-SK');
		}

		announcements = documents;

		busy = false;
	});
</script>

<div>
	<div class="border-surface-700-200-token flex justify-between border-b pb-3">
		<h3 class="h3 font-bold">Latest Announcements</h3>
		<a href="/announcements" class="border-surface-700-200-token btn btn-sm border">View more</a>
	</div>

	<div class="mt-5 flex flex-col gap-5 sm:flex-row">
		{#if busy}
			<div class="card flex h-full max-h-96 w-full max-w-sm flex-col p-4">
				<div class="placeholder"></div>
				<div class="placeholder grow"></div>
				<div class="flex justify-between">
					<div class="placeholder"></div>
					<div class="placeholder"></div>
				</div>
			</div>
		{:else if announcements.length === 0}
			<p class="text-surface-500">No announcements to show.</p>
		{/if}

		{#each announcements as announcement}
			<Announcement
				title={announcement.title}
				author={announcement.author}
				date={announcement.date}
			>
				<p>{announcement.content}</p>
			</Announcement>
		{/each}
	</div>
</div>
