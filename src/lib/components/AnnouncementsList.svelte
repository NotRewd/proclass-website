<script>
  import AnnouncementCard from "./AnnouncementCard.svelte";
  import AnnouncementCardSkeleton from "./AnnouncementCardSkeleton.svelte";
  import { Query } from "appwrite";
  import { databases } from "$lib/appwrite";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  const LIMIT = 25;

  let announcements = [];
  let busy = true;
  let loadingMore = false;

  let currentPage = 0;
  let showMore = false;

  onMount(async () => {
    await loadDocuments(0);
    busy = false;
  });

  async function loadNext() {
    if (busy || loadingMore) return;
    loadingMore = true;

    currentPage++;
    await loadDocuments(currentPage * LIMIT);

    loadingMore = false;
  }

  async function loadDocuments(offset) {
    const { documents } = await databases.listDocuments(
      "main",
      "announcements",
      [Query.limit(LIMIT), Query.offset(offset), Query.orderDesc("$createdAt")],
    );

    announcements = announcements.concat(documents);
    showMore = documents.length === LIMIT;
  }
</script>

<div class="mb-10 flex flex-col gap-5" showPreviousNextButtons>
  {#if busy}
    <AnnouncementCardSkeleton class="h-52" />
    <AnnouncementCardSkeleton class="h-52" />
    <AnnouncementCardSkeleton class="h-52" />
  {:else if announcements.length === 0}
    <p class="text-surface-500">No announcements to show.</p>
  {/if}

  {#each announcements as announcement}
    <AnnouncementCard {announcement} class="h-72" />
  {/each}

  {#if !busy}
    {#if loadingMore}
      <div class="border-surface-900-50-token btn btn-sm self-center border">
        Loading more...
        <Icon icon="line-md:loading-loop" />
      </div>
    {:else if showMore}
      <button
        class="border-surface-900-50-token btn btn-sm self-center border"
        on:click={loadNext}
      >
        Load More
      </button>
    {:else}
      <p class="text-surface-600-300-token self-center font-bold italic">
        No more announcements to show.
      </p>
    {/if}
  {/if}
</div>
