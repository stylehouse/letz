import adapter from '@sveltejs/adapter-auto';
import {stylehouse_lite} from './src/lib/Compile.js'
import sveltePreprocess from 'svelte-preprocess';
import esbuild from 'esbuild';
import {SourceMapConsumer,SourceMapGenerator} from 'source-map-js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		aliases: [
		  ['typescript', 'stylehouse_lite'],
		],
		stylehouse_lite({ content, filename, attributes }) {

			// compile stylehouse lite
			let { code, map } = stylehouse_lite(content)
			map.file = filename
			console.log("Step un: "+filename,{ code })
			let typescript = code
			let map1 = map;

			// compile typescript
			// < #jsgoof there has to be brackets around this whole statement:
			({ code, map } = esbuild.transformSync(typescript, {
				loader: 'ts',
				tsconfigRaw: {
					compilerOptions: {
						// svelte typescript needs this flag to work with type imports
						importsNotUsedAsValues: 'preserve',
						preserveValueImports: true
					}
				},
				sourcemap: true,
				sourcefile: filename
			}))
			console.log("Step two: "+filename,{ code })
			let map2 = map

			// combine sourcemaps
			console.log("fromSourceMap: ",{map1,map2})
			var aggregatedMap = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(map2));
			console.log("applySourceMap: ")
			aggregatedMap.applySourceMap(new SourceMapConsumer(map1));
			console.log("toString: ")
			map = aggregatedMap.toJSON()
			// for some reason this has: sources: [ 'null', '/app/src/routes/Code.svelte' ],
			if (map.sources[0] == 'null') {
				// your browser will fetch 'null'
				map.sources[0] = map.sources[1]
				if (map.sourcesContent[0] == null) {
					// map.sourcesContent.shift()
				}
				else {
					throw "not always null sources*"
				}
			}
			console.log("map: "+filename,{ aggregatedMap,map })


		  	return { code, map };
		},
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
