import adapter from '@sveltejs/adapter-auto';
import { stho_svelte } from './src/lib/Compiler.js';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess(stho_svelte()),

	kit: {
		adapter: adapter()
	}
};

export default config;
