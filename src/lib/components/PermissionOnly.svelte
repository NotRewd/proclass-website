<script>
	import { onMount } from 'svelte';
	import { user } from '$lib/shared/stores.js';
	import { teams } from '$lib/appwrite';

	export let permissionsList;
	export let allowedPermissions;
	export let allowedTeams = [];

	let allowed = false;

	const readPermissions = permissionsList.filter((x) => x.includes('read('));
	const updatePermissions = permissionsList.filter((x) => x.includes('update('));
	const deletePermissions = permissionsList.filter((x) => x.includes('delete('));

	onMount(async () => {
		console.log(permissionsList);

		const userPermission = hasUserPermission();

		if (userPermission) {
			allowed = true;
			return;
		}

		const res = await teams.list();
		const teamsList = res.teams;

		const teamPermission = isInAllowedTeams(teamsList);

		allowed = teamPermission;
	});

	function hasUserPermission() {
		if (allowedPermissions.includes('read') && !readPermissions.some((x) => x.includes($user.$id)))
			return false;
		if (
			allowedPermissions.includes('update') &&
			!updatePermissions.some((x) => x.includes(`"user:${$user.$id}"`))
		)
			return false;
		if (
			allowedPermissions.includes('delete') &&
			!deletePermissions.some((x) => x.includes(`"user:${$user.$id}"`))
		)
			return false;

		return true;
	}

	function isInAllowedTeams(teamsList) {
		for (const team of teamsList) {
			if (allowedTeams.includes(team.$id)) return true;
		}

		return false;
	}

	function hasTeamPermission(teamsList) {
		for (const team of teamsList) {
			if (allowedPermissions.includes('read') && !readPermissions.some((x) => x.includes(team.$id)))
				return false;
			if (
				allowedPermissions.includes('update') &&
				!updatePermissions.some((x) => x.includes(`"team:${team.$id}"`))
			)
				return false;
			if (
				allowedPermissions.includes('delete') &&
				!deletePermissions.some((x) => x.includes(`"team:${team.$id}"`))
			)
				return false;
		}

		return true;
	}
</script>

{#if allowed}
	<div class={$$restProps || ''}>
		<slot />
	</div>
{/if}
