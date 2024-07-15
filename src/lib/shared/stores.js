import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { account } from '$lib/appwrite';

const defaultTheme = 'dark';
const currentTheme = browser ? localStorage.getItem('theme') : defaultTheme;

export const theme = writable(currentTheme);
export const user = writable(null);

getUser();

async function getUser() {
	try {
		const acc = await account.get();
		user.set(acc);
	} catch {
		user.set(null);
	}
}

theme.subscribe((value) => {
	if (browser) {
		localStorage.setItem('theme', value);

		const html = document.querySelector('html');
		if (value === 'dark') {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
	}
});
