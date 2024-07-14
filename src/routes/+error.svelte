<script>
	import { page } from '$app/stores';
</script>

<div class="mx-10 flex grow flex-col items-start justify-center">
	<h1 class="h1 font-bold">{$page.status}</h1>
	<h2 class="h2">{$page.error.message}</h2>
</div>
