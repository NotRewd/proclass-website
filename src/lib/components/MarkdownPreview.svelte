<script>
  import DOMPurify from "dompurify";
  import { marked } from "marked";

  const renderer = {
    heading(text, depth) {
      return `<h${depth} class="h${depth} font-bold pb-2 mb-2 mt-5 border-b border-surface-500-400-token">${text}</h${depth}>`;
    },
  };

  marked.use({ renderer });

  export let value = "";
</script>

<section class={$$restProps.class || ""}>
  {@html DOMPurify.sanitize(marked.parse(value))}
</section>
