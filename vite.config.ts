import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { stho_vite } from './src/lib/lang/stholite_for_svelte';

const config: UserConfig = {
	plugins: [
		stho_vite(),
		sveltekit()
	]
};

export default config;
