import { stylehouse_lite } from './Compile.js';
import esbuild from 'esbuild';
import {SourceMapConsumer,SourceMapGenerator} from 'source-map-js';

// for .ts
// can do .svelte but the code given then has already some compiling and panics if it see our lang
export function stlli_vite() {
    console.log("Loaded  stylehouse_lite")
    return {
        name: 'stylehouse_lite-compile-plugin',
        enforce: 'pre',
        transform(code, id) {
            // < should we check they are within /app/src/ to avoid node_modules etc?
            if (id.endsWith('.ts')) {
                // console.log("Found a "+id)
                let ts = stylehouse_lite(code);
                // if (code != compiled.code) console.log("We won!!!",compiled.code.slice(0,200))
                // < why it doesn't seem to need the map? we can just return code and the line-moved-debugger test works
                return {
                    code: ts.code,
                    map: ts.map
                };
            }
        }
    }
}
// for .svelte
// gets to <script type="ts"> earlier than stlli_vite() can
// in svelte.config.js: preprocess: sveltePreprocess(stlli_svelte()),
export function stlli_svelte() {
    return {
		aliases: [
		  ['typescript', 'stylehouse_lite'],
		  ['ts', 'stylehouse_lite'],
		],
		stylehouse_lite({ content, filename, attributes }) {
			console.log("stylehouse_lite: "+filename)

			// compile stylehouse lite
			let { code, map } = stylehouse_lite(content)
			map.file = filename
			// console.log("Step un: "+filename,{ code })
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
			// console.log("Step two: "+filename,{ code })
			let map2 = map

			// combine sourcemaps
			var aggregatedMap = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(map2));
			aggregatedMap.applySourceMap(new SourceMapConsumer(map1));
			// toJSON makes data ready to become JSON
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
			// console.log("map: "+filename,{map })

		  	return { code, map };
		},
	}
}