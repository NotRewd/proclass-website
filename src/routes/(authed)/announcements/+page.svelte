<script>
	import MainTitle from '$lib/components/MainTitle.svelte';
	import AnnouncementsList from '$lib/components/AnnouncementsList.svelte';
	import TeamOnly from '$lib/components/TeamOnly.svelte';
</script>

<div class="flex justify-between">
	<MainTitle>Announcements</MainTitle>
	<TeamOnly allowedTeams={['admins', 'announcement-creator']}>
		<a href="/announcements/new" class="variant-filled-success btn btn-sm self-center">
			New Announcement
		</a>
	</TeamOnly>
</div>
<AnnouncementsList />
