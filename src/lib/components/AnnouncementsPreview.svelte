<script>
	import Announcement from '$lib/components/Announcement.svelte';
</script>

<div>
	<h3 class="border-surface-700-200-token h3 border-b pb-3 font-bold">Announcements</h3>
	<div class="mt-5 flex flex-col gap-5 sm:flex-row">
		<Announcement title="New Feature" author="John Doe" date="2021-10-01">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nisl nec nisl
				ullamcorper.
			</p>
		</Announcement>
		<Announcement title="Test Announcement" author="Jane Doe" date="2021-10-02">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nisl nec nisl
				ullamcorper.
			</p>
		</Announcement>
	</div>
</div>
