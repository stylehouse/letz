# text functions
#  copied from from Planet|Ying|G/ive/Text
# oh yeah! things! boot? bitsies!!
import { isar,isst,isC,num,numf,ex,hak,haks,grepout,peel,depeel } from "$lib/Y/Pic"
import { C_ } from "$lib/St"
import DiffMatchPatch from "diff-match-patch"

# export default self, so users import {deL,oleak,me} from 'Tex'
let self = {}
let me = self.me = {}

 // diffing
    $dmp = null
    $diff = &sSc{
        dmp ||= new DiffMatchPatch()
        c ||= {}
        typeof c != 'object' and c = {chunk:'line'}
        dmp.Diff_Timeout = 1; # second
        dmp.Diff_EditCost = c.edar || 4

        $d = dmp.diff_main(s, S);
        # idealise the size of the groups coming/going
        c.chunk ||= 'word';
        c.chunk == 'line' and dmp.diff_cleanupSemantic(d)
        c.chunk == 'word' and dmp.diff_cleanupEfficiency(d)
        # or letters at a time, nice and noisy
        
        # convert to C+
        $N = []
        $ways = ['gone','same','new']
        each il diffs {
            $op = l[0];
            $s = l[1];
            $way = ways[op*1+1]
            !way and throw "what op", op
            N.push(C_(way,{},{s}))
        }
            
        return N
    }
    
 // &enj etc
    # copied from G/g-j/NutGravy
    # see &oleak for nodelimit,soft
    $enj = &s,nodelimit,soft{
        $i = nodelimit || 1000
        $not = 0
        $replacer = &kv{
            if (--i < 0) {
                # sprawling verboten -> no return, no more recursion
                soft and not = 1; return null
                else { throw "enj nodelimit" }
            }
            #this; # The object in which the key was found
            # < use this<-v to stack where we are in s**
            # < replace certain given v with a pointer string for cyclical refs
            return v
        }
        $string = JSON.stringify(s,replacer)
        not and return null
        return string
    }
    $dej = &s{
        return JSON.parse(s)
    }

 // Lines string<->thing de?construction
  
  // &Compress, &oleak, &cmuted
    # check if data is too large
    #  bails encode as soon as node count
    #  has to finish to measure length
    me.oleak = &acgts,nodelimit,charlimit{
        $fail = 0
        $code = enj(s,nodelimit,'soft')
        !code and fail = 1
        else
        code.length > charlimit and fail = 2
        return fail
    }
    
    # string avoids various things
    # < an embryonic composited sub, like thro, 
    # < the opposite, collected from n and something else...
    # < use the d (state from G&ind) to make links for duplicated objects
    # see j/7 K: used to mute any ref not gk =~ /x$/
    me.Compress = &acgtsd{
        # will be gone if we $s = Cye(...)
        delete ss&z;
        
        # especially if pi
        ss&J and delete sc&s;
        typeof sc&s == 'object' and delete sc&s
        typeof ss&J == 'object' and delete ss&J
        
        # makes c.code -> c.mc=code
        #  would otherwise c.mc=code:$arfgunc
        me&cmuted,s,{mute:{c:['code'],sc:[]}}
    }
    # drop C.*.* objects other than Object|Array
    #  eg c.on (HTMLDivElement) -> c.mc=on
    # < Be properties
    me.cmuted = &acgtsc{
        $mute = c.mute;
        $sep = ' '
        $unmuted_objects = [Object,Array];
        each nk,gks mute {
            $he = s[nk];
            $muted = {};
            each gk,v he {
                gks[gk] and muted[gk] = 1; continue
                # data should be limited somehow...
                typeof v != 'object' and continue
                unmuted_objects.indexOf(v.constructor) >= 0 and continue
                # name of v.constructor
                muted[gk] = G&arfgunc,v || 1;
                
            }
            each gk,reason muted {
                delete he[gk]
            }
            !hak(muted) and continue
            # say that it is muted, eg c&mc = 'the muted keys'
            #  in a space separated peel (hash)
            $ou = 'm' + nk[0]
            $was = s.c[ou]
            was and ex(muted,G&peel,was,{sep} )
            s.c[ou] = G&depeel,muted,{sep}
        }
    }
  
  // Lines types
    # < use from o that can conjoin the many C
    # aims for simplicity of notation for &deL, G&C, G&peel
    # block quotes (BQ) big strings or data after the  line
    # uses json for anything complicated
    # z insides done by the process around this one Line
    #  - they have the same indent as BQs
    #    but their t should json or not look like BQ
    # < put BQ at an odd indent... 1 space for keys, 3 for values
    #    as long as key|value|nextC always ^\S
    #   needs to convert all of W/ for this
    #    probably not that many instances of it
    # notice if gk|v will break if encoded via peel()
    # < dealing with c = enj(number) when eg c&s=5? -5?
    #   everything except y&cv may decode as string, eg via peel()
    #    unless it is inside c.* for enj(c)
    # < there is probably a looser Lines scheme...
    #   which should not have to include \t all the time,
    #   but may json quote if spacey .t
    #   or if c gets spacey and cant just join with more space to sc
    #    which will need to happen anyway if sc is spacey
    #   < ende - the symmetrical encode|decode thingkitexture
    me.Lines_types_is = null
    me.Lines_types = &acgt{
        $is = me.Lines_types_is
        is and return is
        $is = {}
        
        $ty = {}
        # breaks the \t=09,\n=0a of the enclosing Line
        ty.lowdown = "[\\u{0}-\\u{a}]"
        # start of hemisphere (c|sc) that wants dej()
        ty.jsoning = "^[\\[\\{\"]"
        # y,c may have %sc,starting,early
        # < from &enL (now from ws:digwaypoll)
        ty.earlysc = "^%"
        # < return line count?
        ty.multiline = "\\n"
        ty.wordyspace = "^\\w[\\w ]*$"
        
        # v never starts hem. can contain a lot, even ':'
        #  since peel splits by all ',', then one ':' each
        ty.unsafe_v = [ty.lowdown,','].join('|')
        # k might start hem. must not look like jsoning.
        ty.unsafe_k = [ty.earlysc,ty.jsoning,ty.unsafe_v,':','^ ','^$'].join('|')
        
        $func = &ty{
            is[t] = &s{
                $notstring = typeof s != 'string' && typeof s != 'number'
                notstring and throw "Lines_types.is!string", s
                return y (s+'')
            }
        }
        # must define $t for a function
        haks(ty).map(&t{
            $m = RegExp(ty[t],'u')
            func(t, s => m.exec(s) )
            if (t.startsWith('un')) {
                # derives is.safe_k(k)
                func(t.substr(2), s => !is[t](s) )
            }
        })
        # also, aesthetics
        is.fitsin = (v,s) => (''+s).length <= v
        is.good_k = s => is.fitsin(23,s) && is.safe_k(s)
        is.good_v = s => is.fitsin(64,s) && is.safe_v(s)
        is.screedy = s => !is.fitsin(42,s)  && is.multiline(s)
        me.Lines_types_is = is
        return is
    }
    
   // indents, struct types
    # Lines C may have indented bits after
    # < at one space, inconfusible with C/C indent
    me.LinesBQ_indent = '  '
    # for N|i of '  ', starting with i=1 -> ''!
    # < rename. GONE? used once.
    #   could call &indents,(d-1)*2,s,'notailn'
    $indent = &ds{
        d == 0 and throw "d!>0"
        isar(d) and d = hak(d)
        s and throw "< splitindjoint"
        # 1:'',2:'  ',3:'    '...
        return new Array(1*d).join('  ')
    }
    # &ind (around &enL) uses '  ', BQ-ish things use:
    $indents = &l,v,notailn{
        num(l) and l = new Array(1+l*1).join(' ')
        !isst(l) and throw "indent ' '?"
        $vs = [];
        # "the","lines" <- "the\n","lines\n"
        v = Lin_Lines(v)
        each is v {
            vs.push(l+s)
        }
        !notailn and vs.push('')
        return vs.join("\n")
    }
    # $L = ["the","lines"] <- "the\nlines\n"
    $Lin_Lines = &v{
        v = isar(v) ? v : v.split("\n")
        # chomp off the tail end
        v.slice(-1)[0] == '' and v.pop()
        return v
    }
    # we take the indent off to make it Cy&deLines!
    $unindents = &d,v,notailn{
        !num(d) and throw "indent d"
        $vs = [];
        v = Lin_Lines(v)
        each is v {
            # bite off space
            $space = s.substr(0,d)
            space.split('').some(a => a!=' ') and debugger
            
            vs.push(s.substr(d))
        }
        !notailn and vs.push('')
        return vs.join("\n")
    }
  
  // &enL toLines - C to string
    # A.I.i.y.tw.toLines.c.code =
    me.enL = &acgts{
        
        s and C = s;
        !isC(s) and throw "enL: not C"
        $t = C.t;
        $y = C.y.cv;
        # hath
        $h = {};
        h.c  = ex({},C.c||{});
        h.sc = ex({},C.sc||{});
        delete hs&z;
        # needs json
        $n = {};
        # needs blockquote
        $q = {};
        # as determined by
        $is = me&Lines_types
      
      // sayability!
        # check out how sayable the values on the line are
        # for c/sc as peelable, 
        # < we can know thing:thing:thing
        #   means thing = 'thing:thing'
        # GOING is.safe_v,safe_k
        $peelok = /^[\w\.\-%\/:]+$/;
        $nameok = /^\w[\w\.\-%\/]*$/;
        # GOING is.good_k
        $simp = &s{
            s = ''+s;
            return is.safe_k(s) && s.length < 24
        };
        # inject 2sphere
        $lod = &n,nk,gk,v{
            n[nk] ||= {}
            n[nk][gk] = v
        };
        each nk,gk,v h {
            if (!is.good_k(gk)) {
                lod(n,nk,gk,v)
                continue
            }
            if (typeof v != 'string' && typeof v != 'number') {
                # if v** is > 4 nodes or encodes to > 42 chars
                # &oleak may be small but numerous,
                #  eg the whole C.sc can be quite long, we are only looking at each v in C.sc.*
                if (me&oleak,v,4,42 ) {
                    me&oleak,v,24 and throw "Leaky "+nk+"."+gk+": "+ki(v);
                    # big enough to quote, simplifies remainder
                    lod(q,nk,gk,v);
                }
                else {
                    # ref too small to quote, json hemisphere
                    lod(n,nk,gk,v);
                }
            }
            else {
                if (is.screedy(v)) {
                    # long enough to quote
                    lod(q,nk,gk,v);
                }
                else if (is.good_v(v)) {
                    # decipherable to G&peel
                }
                else {
                    # midway to unwieldy
                    lod(n,nk,gk,v);
                }
            }
        }}

      // sayableparts!
        # quote freaks (q), json freaks (n), everything (h)
        each nk,gkv n {
            $g = h[nk]
            !hak(g) and debugger
            $gnotq = grepout(haks(g),k => !(q[nk]&&q[nk][k]))
            $gnotnorq = grepout(gnotq,k => !n[nk][k])
            # reasons not to n -> q
            # nothing else in the spot
            !hak(gnotnorq) and continue
            # complex keys must be json
            # < making blockquote opener: sc "anykey":
            #    requires tight match right of :
            #     requires eny(v) on the next line, as for !string
            #     < unless parse everything at once
            haks(gkv).some(k => !is.wordyspace(k)) and continue
            # reasons to become a quote:
            # among g that are not q
            if (hak(gkv) / hak(gnotq) < 0.34) {
                # mostly not n in the spot
                each kv gkv {
                    lod(q,nk,k,v)
                }
            }
            else {
                each kv gkv {
                    is.fitsin(23,k) and continue
                    lod(q,nk,k,v)
                }
            }
        }
        
        # remove quoted things and their need of json from the line
        each nk,gk,v q {
            h[nk] and delete h[nk][gk]
            n[nk] and delete n[nk][gk]
        }}
        # all freaks got quoted
        each nk,gkv n {
            !hak(gkv) and delete n[nk]
        }
      
      // encoded bits
        # < enj() add a replacer callback so functions can warn/show up as 'CODE' etc

        # t can be messy, very long (as opposed to is.good_k)
        $l = is.safe_k(t) ? t : enj(t);

        # y.cv = 1 is implied
        !y and y = 1
        y = numf(y)
        y = y == "1" ? '' : y
        # -suchpi can be attached to it
        if (h.c.pi && !(n.c && n.c.pi)) {
            $pi = delete h.c.pi
            y += '-'+pi
        }
        l += "\t"+y

        # one way or another
        $hem = ['c','sc'];
        each i,nk hem {
            $v = h[nk];
            if (nk == 'c' && 0 == hak(v)) {
                # blank
                l += "\t";
            }
            else if (nk == 'c' && 1 == hak(v) && hak(v,'s')) {
                # t y "the s" sc
                l += "\t"+enj(v.s+'')
            }
            else if (n[nk]) {
                # json bits: t y {W:"At"} {et:3,se:"te",ra:1}
                l += "\t"+enj(v)
            }
            else if (hak(v)) {
                # word (etc) bits: t y W:At et:3,se:te,ra
                l += "\t"+depeel(v)
            }
        }

      // indented bits
        $L = [];
        # < quoting with Line other N/C looking vals
        each nk,gk,v q {
            # < sanity. nk will be c|sc
            #   should be covered? see complex keys must be json
            !is.safe_k(gk) and debugger
            # specifically, see &deL $indenting
            # < fatal if the key =~ /[^ \w]/, eg C.c["ze-ep"] = 1
            !is.wordyspace(gk) and debugger
            !nk.match(/^\w+$/) and debugger
            # < LinesBQ_indent could be one space
            #   to differentiate from t, which at the moment has to !~ /:/
            #   we could then require \w+ nk, possibly json quote the gk?
            $k = me.LinesBQ_indent +nk+" "+gk+":"
            # < this could all be one thing now?
            #    it used to do yaml here
            if (typeof v != 'string') {
                # BQ data
                # < rename T.eny_trace, its error handler uses
                k += " "+enj(v)
            }
            else if (is.safe_v(v)) {
                # simple strings
                # < not confusible into 'Thing 2'?
                k += " "+v
            }
            else if (!v.match(/\n$/)) {
                # BQ implies trailing \n
                k += " "+enj(v)
            }
            else {
                # BQ string
                k += " "+enj(v)
            }
            #k = k.replace(/\n\s*$/,'');
            L.push(k);
        }}
        
        # extra lines (L) sorted, larger bits after smaller
        L = L.sort();
        $tidy = [];
        $large = [];
        each is L {
            s.length > 300 ? large.push(s) : tidy.push(s)
        }
        l = [l];
        tidy.length and l.push(tidy.join("\n"))
        large.length and l.push(large.join("\n"))
        l = l.join("\n");
        
        return l
    }
   
  // &deL readLines - string to [C+]
    # for $C = &deL1 <\<''
    #   Atoms -with spaces %when,you,cant,type,tabs
    me.simpdeL = &acgts{
        $L = s.split("\n").map(&s{
            !hak(s) and return s
            $p = me&parserify,s
            p.p(/^( +)/)
            $m = p.s.split('  ')
            hak(m) == 1 and m = p.s.split(' ')
            # t,y,c,sc = 0,1,2,3
            m[3] && m[3].startsWith('%') and m[3] = m[3].slice(1)
            return (p.1||'')+m.join("\t")
        }).join("\n")
        return theone( me&deL,L,{attach:'fiu'} )
    }
    #A.I.i.y.tw.readLines.c.code =
    me.deL = &acgts,opt{
        
        opt ||= {};
        $is = me&Lines_types
        !isst(s) and throw "deL: not a string"
        $L = Lin_Lines(s);
        $oL = [];
        $tot = L.length;
        # N=[C+]
        $N = [];
        $stack = [];
        $paniconce = 0;
        while (L.length) {
        
      // rowing
        $l = L.shift();
        # rebuild what y&toLine was here
        $Line = [l]
        # first line of each Line+indented-stuff only, a trace
        # < a stack
        oL.push(l);
        # < shouldn't happen, BQ blank lines are indented
        !l.length and continue
        $lin = l.match(/^(\s*)(.*)$/);
        $ind = lin[1];
        $d = ind.length / 2;
        l = lin[2];
        $li = l.split("\t");
        $t = li[0];
        $y = li[1];
        $c = li[2];
        $sc = li[3];
        # sc can kick in early, still one \t
        y && y [0] == '%' and sc = y.substr(1); y = '';
        c && c [0] == '%' and sc = c.substr(1); c = '';
        y && opt.y1 && opt.y1[0] == '%' and (opt.tosc ||= {})[opt.y1.slice(1)] = y; y = '';
        # t may be crazy string
        is.jsoning(t) and t = dej(t);
        if (y && y.includes('-')) {
            # 33-suchpi
            $m = y.split('-')
            $pi = m [1]
            !pi || m[2] != null and throw "!33-suchpi",y
            y = m [0]
        }
        y ||= "1"
        y * 1 == NaN and debugger
        # < see scv(cv)
        y = {cv:1*('0.'+y)}
        
        # c&s as a fifth thing on the line
        $s = li[4];
        if (s && is.jsoning(s)) {
            s = dej(s)
        }
        if (c && c.startsWith('"')) {
            s = dej(c)
            c = {}
        }
        else if (c && is.jsoning(c)) {
            c = dej(c)
        }
        else if (c) {
            c = peel(c)
        }
        else { c = {} }
        
        s != null and c.s = s
        pi and c.pi = pi
        
        if (sc && is.jsoning(sc)) {
            sc = dej(sc)
        }
        else if (sc) {
            sc = peel(sc)
        }
        else { sc = {} }
        
        
        $C = {t,y,c,sc}
        
      // indented bits
        
        $k
        $v
        $indenting = &{
            !L.length and return
            $m = L[0].match("^"+ind+me.LinesBQ_indent
                +"(\\w[\\w ]+):(?: (\\||.+))?$")
            !m and return
            k = m[1]
            v = m[2]
            return 1
        };
        while (indenting()) {
            $string
            if (v === '|') {
                string = 1;
                v = undefined;
            }
            v && v.match(/^\W/) and v = dej(v)
            Line.push(L.shift())
            k = k.split(' ');
            $nk = k.shift();
            $gk = k.join(' ');
            if (!v) {
                $s = [];
                $one;
                $blockquoting = &{
                    !L.length and return;
                    $m = L[0].match("^"+ind+me.LinesBQ_indent
                        +"  (.*)$");
                    !m and return;
                    one = m[1];
                    return 1;
                }
                while (blockquoting()) {
                    s.push(one);
                    L.shift();
                }
                v = s.join("\n");
                # console.log("Loaded "+nk+gk+": "+v+'  Next: '+L[0]);
                if (!string) {
                    v = dej(v);
                }
                else {
                    !v.match(/\n$/) and v = v+"\n"
                }
            }
            C[nk][gk] = v;
        }
      
      // attach
        # the chunk of string goes with it
        Cy&deLines = unindents(d*2,Line,1)
        d.toFixed() != d and ~fractionalind: d, C, T.readinglv
        d = 1 * d.toFixed();
        if (d > 0) {
            $p
            $dl = d;
            while (dl--) {
                p = stack[dl];
                p and break
            }
            if (dl < d - 1) {
                $few = oL.slice(-3);
                if (! paniconce++) {
                    ~toomuchind: d, dl, T.readinglv, few
                    debugger
                }
                d = dl+1;
            }
            # use io?
            if (opt.attach == 'fiu') {
                me&fiu,p,C
            }
            else {
                ps&z ||= [];
                ps&z.push(C);
                # tv/tw/in/next?
                $tv =
                p.y.tv ||= {};
                tv[C.t] ||= {};
                tv[C.t][C.y.cv] = C;
            }
            # a mass inCing, dialecting
        }
        else {
            N.push(C);
        }
        stack[d] = C;
        while (stack[d+1])
            stack.pop();
            opt.tosc and ex(C.sc,opt.tosc);
        
        }
        return N
    }

export {me, enj,dej}