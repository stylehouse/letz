import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { stho_vite } from './src/lib/Compiler';

const config: UserConfig = {
	plugins: [
		stho_vite(),
		sveltekit()
	]
};

export default config;
