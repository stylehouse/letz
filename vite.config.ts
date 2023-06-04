import { sveltekit } from '@sveltejs/kit/vite';
import { compilePlugin } from './src/lib/Compile';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		compilePlugin(),
		sveltekit()
	]
};

export default config;
