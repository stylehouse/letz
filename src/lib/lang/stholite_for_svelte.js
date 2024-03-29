// connect the following compilers to svelte

// mainly stho lite
import { stylehouse_lite, merge_sourcemaps } from './stholite_compiler.js';
// and then typescript
import esbuild from 'esbuild';

// used in vite.config.ts
// for .ts
// can do .svelte but the code given then has already some compiling and panics if it see our lang
export function stho_vite() {
    console.log("Loaded  stylehouse_lite")
    return {
        name: 'stylehouse_lite-compile-plugin',
        enforce: 'pre',
        transform(code, id) {
            let stylescript = id.includes('/tawhito/')
            let typescript = id.endsWith('.ts')
            if (stylescript && typescript) throw "both stylescript and typescript? "+id
            if (stylescript) {
                // code as it is in stylehouse.git/G/Lafr/Fish for example
                //  having no imports or exports, just defining globals
                //   on self.* or me.*
                // < wrap it in something here?
                // or
                // < lezer dumping out a .ts when edited?
            }
            if (stylescript || typescript) {
                // console.log("Found a "+id)
                let ts = stylehouse_lite(code,id,'vite');
                // if (code != compiled.code) console.log("We won!!!",compiled.code.slice(0,200))
                // < seeing compiled code in DevTools... this doesnt help:
                //ts.map.sourcesContent = [code]
                if (ts.map && ts.map.sources) {
                    // < could we use id? might it have ?v=... at the end?
                    if (!id.startsWith('/app/'))
                        throw "where art thou"
                    ts.map.sources = ['']
                }
                return {
                    code: ts.code,
                    map: ts.map
                };
            }
        }
    }
}

// used in svelte.config.js
// for .svelte
// gets to <script type="ts"> earlier than stho_vite() can
// in svelte.config.js: preprocess: sveltePreprocess(stho_svelte()),
export function stho_svelte() {
    return {
		aliases: [
		  ['ts', 'stylehouse_lite'],
		],
		stylehouse_lite({ content, filename, attributes }) {
			//console.log("stylehouse_lite: "+filename)

			// compile stylehouse lite
			let ts = stylehouse_lite(content,filename,'svelte')
			ts.map.file = filename
			// console.log("Step un: "+filename,{ code:ts.code })

			// compile typescript
			let js = compile_typescript_like_svelte(ts.code,filename)
			// console.log("Step two: "+filename,{ code:js.code })

            let map = merge_sourcemaps(ts.map,js.map)
            polish_sourcemap(map)
			//console.log("map: "+filename,{map })

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