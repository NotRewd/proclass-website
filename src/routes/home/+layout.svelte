<script>
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
</script>

<div class="flex grow">
	<div>
		<AppRail class="">
			<AppRailAnchor href="/">Home</AppRailAnchor>
			<AppRailAnchor href="/test1">Test 1</AppRailAnchor>
			<AppRailAnchor href="/test2">Test 2</AppRailAnchor>
		</AppRail>
	</div>
	<slot />
</div>
