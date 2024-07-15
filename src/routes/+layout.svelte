<script>
	import '../app.css';
	import NavItems from '$lib/components/NavItems.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<svelte:head>
	<title>ProClass</title>
</svelte:head>

<nav
	class="sticky flex h-14 items-center justify-between border-b border-b-surface-300 bg-surface-50 bg-opacity-50 px-10 font-bold backdrop-blur-sm dark:border-b-surface-500 dark:bg-surface-700"
>
	<header class="main-title-color">
		<a href="/">ProClass</a>
	</header>

	<NavItems>
		<ThemeToggle />
	</NavItems>
</nav>

<slot />
