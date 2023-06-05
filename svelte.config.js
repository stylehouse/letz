import adapter from '@sveltejs/adapter-auto';
import {stylehouse_lite} from './src/lib/Compile.js'
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		aliases: [
		  ['stlli', 'stylehouse_lite'],
		],
		stylehouse_lite({ content, filename, attributes }) {
		  const { code, map } = stylehouse_lite(content);

		  return { code, map };
		},
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
