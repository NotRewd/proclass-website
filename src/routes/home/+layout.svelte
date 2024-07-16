<script>
	import Icon from '@iconify/svelte';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { user } from '$lib/shared/stores.js';
</script>

{#if $user}
	<div class="flex grow">
		<div>
			<AppRail aspectRatio="aspect-[4/3]">
				<AppRailAnchor href="/home" selected={$page.url.pathname === '/home'}>
					<Icon class="mx-auto mb-1 text-xl" icon="bi:house-door" />
					<p>Home</p>
				</AppRailAnchor>
				<AppRailAnchor href="/test1">Test 1</AppRailAnchor>
				<AppRailAnchor href="/test2">Test 2</AppRailAnchor>
			</AppRail>
		</div>
		<slot />
	</div>
{/if}
