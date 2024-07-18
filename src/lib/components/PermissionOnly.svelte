<script>
	import { onMount } from 'svelte';
	import { user } from '$lib/shared/stores.js';
	import { teams } from '$lib/appwrite';

	export let permissionsList;
	export let allowedPermissions;

	let allowed = false;

	const readPermission = permissionsList[0];
	const updatePermission = permissionsList[1];
	const deletePermission = permissionsList[2];

	onMount(async () => {
		const userPermission = hasUserPermission();
		const teamPermission = await hasTeamPermission();

		allowed = userPermission || teamPermission;
	});

	function hasUserPermission() {
		if (allowedPermissions.includes('read') && !readPermission.includes($user.$id)) return false;
		if (allowedPermissions.includes('update') && !updatePermission.includes($user.$id))
			return false;
		if (allowedPermissions.includes('delete') && !deletePermission.includes($user.$id))
			return false;

		return true;
	}

	async function hasTeamPermission() {
		const res = await teams.list();

		console.log(res.teams, readPermission, updatePermission, deletePermission);

		for (const team of res.teams) {
			if (allowedPermissions.includes('read') && !readPermission.includes(team.$id)) return false;
			if (allowedPermissions.includes('update') && !updatePermission.includes(team.$id))
				return false;
			if (allowedPermissions.includes('delete') && !deletePermission.includes(team.$id))
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
