
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
}

};
// for stylehousey javascript in .svelte:
// import { stho_svelte } from './src/lib/lang/stholite_for_svelte.js';
// import sveltePreprocess from 'svelte-preprocess';
//	preprocess: sveltePreprocess(stho_svelte()),

export default config;