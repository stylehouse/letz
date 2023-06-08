import { stylehouse_lite, merge_sourcemaps } from './Compile.js';
import esbuild from 'esbuild';
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
                console.log("vite stylehouse_lite")
                let ts = stylehouse_lite(code);
                // if (code != compiled.code) console.log("We won!!!",compiled.code.slice(0,200))
                // < seeing compiled code in DevTools... this doesnt help:
                //ts.map.sourcesContent = [code]
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
		  ['ts', 'stylehouse_lite'],
		],
		stylehouse_lite({ content, filename, attributes }) {
			//console.log("stylehouse_lite: "+filename)

			// compile stylehouse lite
            console.log("svelte stylehouse_lite")
			let ts = stylehouse_lite(content)
			ts.map.file = filename
			// console.log("Step un: "+filename,{ code:ts.code })

			// compile typescript
			let js = compile_typescript_like_svelte(ts.code,filename)
			// console.log("Step two: "+filename,{ code:js.code })

            let map = merge_sourcemaps(ts.map,js.map)
            polish_sourcemap(map)
			// console.log("map: "+filename,{map })

		  	return { code:js.code, map };
		},
	}
}


export function compile_typescript_like_svelte(code,filename) {
    return esbuild.transformSync(code, {
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
    })
}

export function polish_sourcemap(map) {
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
}