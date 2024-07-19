<script>
  import MarkdownPreview from "$lib/components/MarkdownPreview.svelte";

  export let announcement;

  const title = announcement.title;
  const author = announcement.author;
  const date = new Date(announcement.$createdAt).toLocaleDateString("sk-SK");
</script>

<a
  href={`announcements/${announcement.$id}`}
  class={"card flex flex-col p-4 " + ($$restProps.class || "")}
>
  <header class="card-header text-xl font-semibold">{title}</header>
  <MarkdownPreview
    class="grow overflow-hidden text-ellipsis p-4"
    value={announcement.content}
  />
  <footer class="mt-4 flex items-center justify-between p-4">
    <p class="font-bold">By {author}</p>
    <p class="text-surface-500-400-token">{date}</p>
  </footer>
</a>
