<script>
	export let title = 'Announcement';
	export let author = 'Author';
	export let date = 'Date';
</script>

<div class="card max-w-sm p-4">
	<header class="card-header text-xl font-semibold">{title}</header>
	<section class="p-4">
		<slot />
	</section>
	<footer class="card-footer flex items-center justify-between">
		<p class="font-bold">{author}</p>
		<p class="text-surface-500-400-token">{date}</p>
	</footer>
</div>
