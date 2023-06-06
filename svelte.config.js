import adapter from '@sveltejs/adapter-auto';
import {stylehouse_lite} from './src/lib/Compile.js'
import sveltePreprocess from 'svelte-preprocess';
import esbuild from 'esbuild';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		aliases: [
		  ['typescript', 'stylehouse_lite'],
		],
		stylehouse_lite({ content, filename, attributes }) {
			
			let { code, map } = stylehouse_lite(content)
			console.log("Step un: "+filename,{ code, map })

		  	//return { code, map };
			let typescript = code;

			({ code, map } = esbuild.transformSync(typescript, {
				loader: 'ts',
				sourcemap: true,
				sourcefile: filename
			}))
			console.log("Step two: "+filename,{ code, map })

		  	return { code, map };
		},
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
