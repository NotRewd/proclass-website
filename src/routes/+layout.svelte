<script>
	import '../app.css';
	import NavItems from '$lib/components/NavItems.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<svelte:head>
	<title>ProClass</title>
</svelte:head>

<nav
	class="bg-surface-200-700-token border-surface-300-600-token flex h-14 items-center justify-between border-b px-10 font-bold"
>
	<header class="main-title-color">
		<a href="/">ProClass</a>
	</header>

	<NavItems>
		<ThemeToggle />
	</NavItems>
</nav>

<slot />
