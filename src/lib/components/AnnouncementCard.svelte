<script>
	export let title = 'Announcement';
	export let author = 'Author';
	export let date = 'Date';
</script>

<div class={'card flex flex-col p-4 ' + ($$restProps.class || '')}>
	<header class="card-header text-xl font-semibold">{title}</header>
	<section class="grow p-4">
		<slot />
	</section>
	<footer class="card-footer flex items-center justify-between">
		<p class="font-bold">By {author}</p>
		<p class="text-surface-500-400-token">{date}</p>
	</footer>
</div>
