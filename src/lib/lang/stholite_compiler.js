// a prototype compiler
//  we "commit" sourcemap many whenever we reiterate on the same source
//  transforms with lezer should be much better
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
  // rep(), commit_s()
    if (typeof source != 'string') throw "!string"
    filename ||= "???"
    let s = new MagicString(source)
    
    let timer = delta('stylehouse_lite '+(agent?agent+": ":"")+filename)
    let bit_slow_ms = 9
    let last_sourcemap
    let staged_changes = 0
    function commit_s () {
        // < caching|laziness right, breaks everything now
        if (0 && staged_changes == 0 && last_sourcemap) {
            return last_sourcemap
        }
        staged_changes = 0
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
        let any = 0
        while (match = pattern.exec(source)) {
            any = 1
            let whole = match[0]
            let start = match.index
            let end = start + whole.length
            let it = cb(...match.slice(1))
            if (typeof it != 'string') {
                throw "Error replacing /"+pattern.source+"/: "+whole+"\nWith: "+it
            }
            s.overwrite(start, end, it)
            if (c && c.recursive) {
                // it may happen again later
                delete c.recursive
                recursive.push([bits,cb,c])
            }
        }
        if (any) {
            // commit_s() may then make a map, update source
            staged_changes++
        }
        return any
    }


  // rep(...) use
    // see shed.git/ghosts/j/41 / JaBabz

    // anything on a line (was nnl in JaBabz)
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
    let commenty = [
        rep(/^(\s*)#/,        (indent) => indent+'//'),
        rep(/( \{|}|;) #/,    (indent) => indent+' //')
    ]
    // the following patterns may use $nls to not work on comments
    commenty.some(r=>r) && commit_s()

    rep(/blatant/,        () => 'blon_itn')
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
    
    // one might: ... and ~...
    //  so we should commit now (if anything chaged)
    commit_s()
    // < ~... -> &c,"..." for random observations (debug statements)
    rep(/^(\s*)~(.*?)$/,  (indent,com) => indent+'// some &c: '+com)

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
        
                const s = `for (let ${key} in ${from}) {`;
                const v = more ? value + 'v' : value;
                const assignment = `let ${v} = ${from}[${key}];`;
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

    // chuck error: throw "Something", C 
    //   throws new Error("Something"), its .etc=[C]
    //     also handles concatenated bits for "Something":
    // < preserving the keys of etc
    rep(
        [
            '(', /^\s*(?:else *)?(?!#)/, '?)',
            'throw (', /"[^\n"]+?"/, ')',
            '(, ?', nnl, ')?;?', /\s*$/
        ],
        (ind,msg,etc) => {
            msg = msg.replace(/: ?"$/, '"')
            let guts = `new Error(${msg})`
            if (etc) {
                etc = etc.replace(/^, ?/, '')
                etc = etc.replace(/;$/, '')
                guts = `{var er = ${guts}; er.etc = [${etc}]; throw er}`
            } else {
                guts = `throw ${guts};`
            }
            return ind + guts
        }
    )
    
    // perlish elsif
    rep(
        /^(\s*)elsif ?\(/,
        (ind) => ind+"else if ("
    )
    commit_s()

    // delete returns the deleted
    rep(/ = delete (\w+[\[\.][^\s;)]+)/,
        (expr) => ' = '+expr+'; delete '+expr
    )

    // me&func,args -> me.func(A,C,G,T,args)
    // see also shorthands to access A* and C*
    //  which has already replaced /\w[Aaycs]&\w+/
    rep(/(G|me)\&(\$)?(\w+)(,[^\s;]+)?/,
        (me,interp,name,args) => {
            let t = interp ? name : "'"+name+"'"
            let h = me == 'G' ? ".h(A,C,G,T,"+t : "["+t+"](A,C,G,T"
            args ||= ''
            return me+h+args+")"
        }
    )
    commit_s()

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


