<script>
	import MainTitle from '$lib/components/MainTitle.svelte';
	import { user } from '$lib/shared/stores.js';
	import AnnouncementsPreview from '$lib/components/AnnouncementsPreview.svelte';

	let firstName;

	$: {
		if ($user) {
			firstName = $user.name.split(' ')[0];
		}
	}
</script>

<MainTitle>Welcome back, {firstName}!</MainTitle>
<AnnouncementsPreview />
