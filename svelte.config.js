import adapter from '@sveltejs/adapter-auto';

import preprocess from 'svelte-preprocess';
import { stho_svelte } from './src/lib/lang/stholite_for_svelte.js';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
//	preprocess: sveltePreprocess(stho_svelte()),

	kit: {
		adapter: adapter()
	},
};

export default config;
