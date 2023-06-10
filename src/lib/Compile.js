import MagicString from 'magic-string'
import {SourceMapConsumer,SourceMapGenerator} from 'source-map-js';
// combine sourcemaps (last first?)
export function merge_sourcemaps(first,second) {
    first.file ||= 'doubleyconfusing'
    let map = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(second));
    map.applySourceMap(new SourceMapConsumer(first));
    // toJSON makes data ready to become JSON
    map = map.toJSON()
    return map
}
// timer
function delta(t) {
    const start_time = Date.now();
    return function(min) {
        let del = Date.now() - start_time
        // says if thing takes more than min ms
        if (min && min > del) return
        console.log(del+"ms", t);
    };
}

// transform to javascript something quite like it
export function stylehouse_lite (source,filename,agent) {
    if (typeof source != 'string') throw "!string"
    filename ||= "???"
    let s = new MagicString(source)
    
    let timer = delta('stylehouse_lite '+(agent?agent+": ":"")+filename)
    let bit_slow_ms = 9
    let last_sourcemap
    function commit_s () {
        // < why|what should these be? works okay
        const outputSourceMap = 'output.js.map';
        const map = s.generateMap({
            source: 'input.js',
            file: outputSourceMap,
            includeContent: true,
        });
        let it = {code: s.toString(), map: s.generateMap({ hires: true })}
        // if that map goes on the end of another map
        if (last_sourcemap) {
            it.map = merge_sourcemaps(last_sourcemap,it.map)
        }

        // begin again
        source = it.code
        last_sourcemap = it.map
        s = new MagicString(source)
        return it
    }

    // concat array of regexp bits
    let regbits = bits => bits.map(s => (typeof s == 'object' ? s.source : s)).join('')
    // g flag allows many matches throughout string
    // m multiline string: ^ and $ match the ends of lines
    //  eg "1\n2\n3".match(new RegExp('^2$','gm'))
    let reg = (...bits) => new RegExp(regbits(bits),'gm')
    let recursive = []
    // < rep() adaptive indent when /\n/
    //   also globally avoid comments
    let rep = (bits,cb,c) => {
        let pattern = reg(...bits instanceof Array ? bits : [bits])
        let match
        while (match = pattern.exec(source)) {
            let whole = match[0]
            let start = match.index
            let end = start + whole.length
            let it = cb(...match.slice(1))
            if (typeof it != 'string') {
                throw "Error replacing /"+pattern.source+"/: "+whole+"\nWith: "+it
            }
            s.overwrite(start, end, it)
            if (c && c.recursive) {
                // it may happen again
                delete c.recursive
                recursive.push([bits,cb,c])
            }
        }
    }


    // anything on a line
    let nnl = '[^\n]+'
    // whitespace leading up to things not comments
    let nls = '[ \t]*(?! *\/\/)'

    // shorthands to access A* and C*

    // A.1.2 -> A[1][2]
    rep(/\b([a-zA-Z]+)((?:\.\d)+)\b/,    (s,N) => s+N.split('.').slice(1).map(t => '['+t+']').join(''))
    rep(/\b(\d)s&(\w+)\b/,    (i,t) => 'A['+i+'].sc.'+t)
    // capital A is the more empiricle (A.c)
    rep(/\bA&(\w+)\b/,    (t) => 'A.c.'+t)
    rep(/\ba&(\w+)\b/,    (t) => 'A.sc.'+t)
    // etcs&thing and 3s&thing -> A.3.sc.thing
    rep(
        /\b(\w+)(s|c|y)&(\w+)\b/,
        (s,nk,t) => (s*1==s ? 'A['+s+']' : s)+'.'+(nk == 's' ? 'sc' : nk)+'.'+t
    )
    rep(/\bc&(\w+)\b/,    (t) => 'C.c.'+t)
    rep(/\bs&(\w+)\b/,    (t) => 'C.sc.'+t)


    // # comment to // comment
    // $C->{c}->{s} =~ s/^(\s*)#/$1\/\//gsm;
    // $C->{c}->{s} =~ s/( \{|}|;) #/$1 \/\//gsm;
    rep(/^(\s*)#/,        (indent) => indent+'//')
    rep(/( \{|}|;) #/,    (indent) => indent+' //')


    rep(/blatant/,    () => 'blon_itn')
    rep(/'one thing'/,    () => "'un thing'\n'two thing'")


    // left-hand if
    // $C->{c}->{s} =~ s/^($nls)([^\n]+?) and ($nnl)(;)?$/$1if ($2) {
    // $1    $3
    // $1}/gm for 1..3;
    rep(
        ['^(',nls,')(',nnl,'?) and (',nnl,')(;)?$'],

        (indent,expr,block) => {
    return  indent+"if ("+expr+") {\n"
            +indent+"    "+block+"\n"
            +indent+"}"
        },

        {recursive:1}
    )


    // each etc data {    -> for (var e in data) { etc
    // < not DIY closing brackets (indent?)
    // < more of an o, if more spec
    rep(
        /^(\s*)each (\w+(?:,\w+)*) (\S+) \{(\s*)$/,
        (ind, input, from) => {
            const inArray = input.split(',');
            // if there is no ',', split by letter
            const inValues = inArray.length === 1 ? inArray[0].split('') : inArray;
        
            const openBrackets = [];
            while (inValues.length) {
                const key = inValues.shift();
                const value = inValues.shift();
                let more = inValues.length
                if (more) {
                    inValues.unshift(value);
                }
        
                const s = `for (var ${key} in ${from}) {`;
                const v = more ? value + 'v' : value;
                const assignment = `var ${v} = ${from}[${key}];`;
                const checkObject = `if (typeof ${v} !== 'object') { continue; }`;
        
                const code = [s, ind + '    ' + assignment];
                if (more) {
                    code.push(ind + '    ' + checkObject);
                }
        
                from = v;
                openBrackets.push(code.join('\n'));
            }
            return openBrackets.map((bracket) => ind + bracket).join('\n');
        }
    )


    // perlish elsif
    rep(
        /^(\s*)elsif ?\(/,
        (ind) => ind+"else if ("
    )


    // &etc{...} -> function(e,t,c){...}
    // < (arfgunc) a way to write its args on it without having to read via toString parse
    rep(
        /(\W|^)&(acgt)?(\w+)?((?:,\w+)+?)?(,)?\{/,
        (not, acgt, wordy, comma_wordy, comma_end) => {
            wordy ||= ''
            comma_wordy ||= ''
            comma_end ||= ''
            var args = [];
            if (!acgt && wordy && (comma_wordy || comma_end)) {
                // &many,things,explicitly{ or &justone,{
                args = (wordy + comma_wordy).split(',');
            } else {
                // acgt then split wordy
                args = [
                    ...((acgt ? 'ACGT' : '')+wordy).split(''),
                    // until commas (may) start
                    ...comma_wordy.split(',')
                ]
            }
            return not + 'function(' + args.filter(Boolean).join(',') + '){';
        }
    )


    // purchase instead of declare variables
    rep(
        /^(\s*)\$(\w+)(;|\s*=|\s*\/\/|$)/,
        (ind,name,etc) => ind+"var "+name+(etc||';')
    )


    // < anything that might have moved in above transforms (eg s&vars)
    //   will need to commit_s() before they will happen not to their replaced position...


    if (recursive.length) {
        // some patterns want to apply multiple times, to their own output
        //  eg one line ... and ... and ...
        let a_recursion = (recur) => {
            commit_s()
            rep(...recur)
        }
        for (let recur of recursive) {
            a_recursion(recur)
            a_recursion(recur)
        }
    }

    // < about here (below the above) is pasting back in chunks of quoted text that avoid these transforms

    timer(bit_slow_ms)
    return commit_s()
}


