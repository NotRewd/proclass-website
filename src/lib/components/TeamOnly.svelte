<script>
	import { teams } from '$lib/appwrite';
	import { onMount } from 'svelte';

	export let allowedTeams = [];

	let show = false;

	onMount(async () => {
		const result = await teams.list();

		for (const allowedTeam of allowedTeams) {
			if (result.teams.some((team) => team['$id'] === allowedTeam)) {
				show = true;
				break;
			}
		}
	});
</script>

{#if show}
	<slot />
{/if}
