import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { stlli_vite } from './src/lib/Compiler';

const config: UserConfig = {
	plugins: [
		stlli_vite(),
		sveltekit()
	]
};

export default config;
