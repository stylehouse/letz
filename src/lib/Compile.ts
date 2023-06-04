import MagicString from 'magic-string'


export function compilePlugin() {
    console.log("Loaded  stylehouse_lite")
    return {
        name: 'stylehouse_lite-compile-plugin',
        enforce: 'pre',
        transform(code:string, id:string) {
            console.log("Have a "+id)
            if (id.endsWith('.ts') || id.endsWith('.svelte')) {
                console.log("Found a "+id)

                let compiled = stylehouse_lite(code);
                if (code != compiled.code) console.log("We won!!!",compiled.code)
                return code != compiled.code ? compiled.code : null
                let not = {
                    code: compiled.code,
                    map: compiled.map
                };
            }
        }
    }
}
export function stylehouse_lite (source) {
    if (typeof source != 'string') throw "!string"
    let s = new MagicString(source)

    // anything on a line
    let nlp = '[^\n]'
    // whitespace leading up to things not comments
    let nls = '[ \t]*(?! *\/\/)'


    // # comment to // comment
    // $C->{c}->{s} =~ s/^(\s*)#/$1\/\//gsm;
    // $C->{c}->{s} =~ s/( \{|}|;) #/$1 \/\//gsm;
    let commenty = /^(\s*)#/gm
    let match
    while (match = commenty.exec(source)) {
        let whole = match[0]
        let indent = match[1]
        let start = match.index;
        let end = start + whole.length;
        s.overwrite(start, end, indent+'//');
    }

    let blatant = /blatant/gm
    while (match = blatant.exec(source)) {
        let whole = match[0]
        let start = match.index;
        let end = start + whole.length;
        s.overwrite(start, end, 'blonitn');
    }

    

    // left-hand if
    // $C->{c}->{s} =~ s/^($nls)([^\n]+?) and ($nlp)(;)?$/$1if ($2) {
    // $1    $3
    // $1}/gm for 1..3;

    // < why|what should these be for vite?
    const outputSourceMap = 'output.js.map';
    const map = s.generateMap({
      source: 'input.js',
      file: outputSourceMap,
      includeContent: true,
    });
    const sourceMapURL = '\n//# sourceMappingURL=' + outputSourceMap;
    // await fsP.writeFile('output.js', s.toString() + sourceMapURL);
    // await fsP.writeFile('output.js.map', map.toString());

    return {code: s.toString(), map: s.generateMap({ hires: true })}
}


