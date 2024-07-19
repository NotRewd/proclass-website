<script>
  import { databases, ID } from "$lib/appwrite";
  import { user } from "$lib/shared/stores.js";
  import Icon from "@iconify/svelte";
  import { getToastStore, TabGroup, Tab } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import MarkdownPreview from "$lib/components/MarkdownPreview.svelte";

  const toastStore = getToastStore();

  export let announcement;

  let busy = false;
  let errorText = "";

  let contentValue = "";

  let activeTab = 0;

  onMount(() => {
    if (announcement) {
      contentValue = announcement.content;
    }
  });

  function onKeydown(event) {
    if (event.key == "Tab") {
      event.preventDefault();

      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;

      event.target.value =
        event.target.value.substring(0, start) +
        "\t" +
        event.target.value.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
  }

  async function handleSubmit(event) {
    busy = true;

    const form = event.target;
    const formData = new FormData(form);

    const documentData = {
      title: formData.get("title"),
      content: contentValue,
      author: $user.name,
    };

    try {
      if (announcement) {
        await databases.updateDocument(
          "main",
          "announcements",
          announcement.$id,
          documentData,
        );
      } else {
        await databases.createDocument(
          "main",
          "announcements",
          ID.unique(),
          documentData,
        );
      }

      const toastSettings = {
        message: announcement
          ? "Announcement updated successfully!"
          : "Announcement created successfully!",
        background: "variant-filled-success",
      };

      toastStore.trigger(toastSettings);

      goto("/announcements");
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
      value={announcement ? announcement.title : ""}
      required
    />
  </label>

  <div class="label">
    <span>Content</span>
    <TabGroup>
      <Tab bind:group={activeTab} name="editor" value={0}>Editor</Tab>
      <Tab bind:group={activeTab} name="preview" value={1}>Preview</Tab>

      <svelte:fragment slot="panel">
        {#if activeTab === 0}
          <textarea
            bind:value={contentValue}
            on:keydown={onKeydown}
            class="textarea h-72 font-mono whitespace-pre"
            name="content"
          />
        {:else}
          <div class="card py-2 px-3">
            <MarkdownPreview value={contentValue} />
          </div>
        {/if}
      </svelte:fragment>
    </TabGroup>
  </div>

  {#if errorText}
    <p class="text-red-500">{errorText}</p>
  {/if}

  {#if busy}
    <div class="variant-ghost-success btn btn-sm self-start">
      {announcement ? "Applying changes..." : "Creating..."}
      <Icon icon="line-md:loading-loop" />
    </div>
  {:else}
    <button type="submit" class="variant-filled-success btn btn-sm self-start"
      >{announcement ? "Apply Changes" : "Create"}</button
    >
  {/if}
</form>
