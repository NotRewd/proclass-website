<script>
	import Icon from '@iconify/svelte';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { user } from '$lib/shared/stores.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		await new Promise((r) => setTimeout(r, 1000));
		if (!$user) {
			goto('/login');
		}
	});
</script>

{#if $user}
	<div class="flex grow">
		<div class="border-r border-r-surface-300 dark:border-r-surface-500">
			<AppRail aspectRatio="aspect-[4/3]">
				<AppRailAnchor href="/home" selected={$page.url.pathname === '/home'}>
					<Icon
						class="mx-auto mb-1 text-xl"
						icon={'tabler:home' + ($page.url.pathname === '/home' ? '-filled' : '')}
					/>
					<p>Home</p>
				</AppRailAnchor>
				<AppRailAnchor href="/announcements" selected={$page.url.pathname === '/announcements'}>
					<Icon
						class="mx-auto mb-1 text-xl"
						icon={'tabler:align-box-left-middle' +
							($page.url.pathname === '/announcements' ? '-filled' : '')}
					/>
					<p>News</p>
				</AppRailAnchor>
				<AppRailAnchor href="/profile" selected={$page.url.pathname === '/profile'}>
					<Icon
						class="mx-auto mb-1 text-xl"
						icon={'tabler:user' + ($page.url.pathname === '/profile' ? '-filled' : '')}
					/>
					<p>Profile</p>
				</AppRailAnchor>
			</AppRail>
		</div>
		<div class="mx-10 mt-20 grow">
			<slot />
		</div>
	</div>
{/if}
