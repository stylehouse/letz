# general functions
#  copied mostly from Planet|Ying|G/ive/Pictures
#   completed source-harvesting from Planet|Ying:
#    G/g-j/NutGravy
#    G/g-j/Fividy
#    G/ive/Pictures
#     the rest of which regroups brack
#   bits of ive/Index might fit too
# < relegate R-ism?
#    its ugly in the interspheres.
import {TheC} from '$lib/St.ts'
# these used to create global variables
let self = {}
let window = self
# < apparently you can't just do this and: import { me,ex } from "$lib/Y/Pic"
#export default self;
# we export every /^    \$(\w+)/, see the end of this file
    $me = self.me = {}

 // main
   // types
    # is this a C
    # see also St.ts / detect_type() / typ.Cish
    $isC = &s{
        s instanceof TheC and return true
        return oldisC()
    }
    # lots of self-assembly of C out there, ie R
    $oldisC = &s{
        return s && typeof s == 'object'
            && s.t != null && s.y && s.c && s.sc && 1
    };
    
    # create a C, see St.ts / C_()
    #   which you should probably use, but lots of Planet|Ying doesn't
    #  doesn't clone
    #  aka &Cye or Cye(), from styleshed/g/j/21
    #  doesn't enfore y&cv=0.1, but does t||=''
    #  also can peel() c|sc
    # < G&C, babz: = C yadda @3
    $Cye = &s{
        return C_(s)
    };

    # string
    $iske = k => typeof k == 'string' || typeof k == 'number'
    # stringy nothing
    $spacechars = {" ":1,"\n":1,"\t":1}
    $isspace = s => hak(s) && !havs(s).some(s => !spacechars[s])
    # numbery, mostly as s*1 == s (not ' '*1 == ' ')
    $num = s => (isnu(s) || s && s.length && !isspace(s)) && s*1 == s
    $isnum = num
    $isnu = s => typeof s == 'number'
    $isfu = s => typeof s == 'function'
    $isst = s => typeof s == 'string'
    $isar = s => s && s.constructor == Array
    # isha([]) is true! watch out
    $isha = s => s && typeof s == 'object' && !isC(s)
    $isob = s => s && typeof s == 'object'
    $isR = s => isC(s) && sy&R == s
    $hasR = s => isC(s) && sy&R
    
    # housey, indexey {}|[], eg a random c (see %%sustain)
    $isho = v => isha(v) && !isC(v)
    $ish = isho
    # itemic
    $isit = v => !isha(v) || isC(v)
    $isitemic = isit
    # -suchpi
    $ispi = (v,pi) => isC(v) && (!pi ? vc&pi : vc&pi == pi)
    
    # make lots of fatal versions of isba(), etc
    $fatal = {}
    fatal.refresh = &{
        $types = {isC, iske, isspace, num, isnum, isnu, isfu, isst, isar, isha, isob,
            isR, hasR, isho, ish, isit, isitemic, ispi}
        $fatalise = &ky{
            fatal[k] = &s{
                $v = y(...arguments)
                !v and throw "!"+k, s
                # < nobody needs this? fatal.sof returns a result
                return s
            }
        }
        each ky types {
            # make a lexical k,y
            fatalise(k,y)
        }
    }
    # < this without self.* scan
    fatal.refresh()
    
    # fatal assignment, must stay same once set
    # < Babz: h =. v
    $fatas = &hkv{
        v == null and throw "null-assign:"+k, h
        h[k] != null && h[k] != v and throw "reassign:"+k, h[k], v, h, k
        h[k] = v
    }
   // access types
    # see also Index / common nodal
    
    # C|R|E|D -> Ec&s
    #  ie looser sof(), still must isC()
    $csof = &j{
        # out of D?
        j = jy&E || j
        # to R
        j = Aof(j)
        fatal.isC(jc&s)
        return jc&s
    }
    # climb into a R//s, the usu sphere change
    $sof = &j{
        # < any Cish? have to not disappear inside
        !isR(j) and return j
        # things that have
        fatal.isba(j)
        fatal.isC(jc&s)
        return jc&s
    }
    fatal.sof = &j{
        $s = sof(j)
        s == j and throw "j==sof(j)",j
        return s
    }
    # < slope y&up and...?
    $Aof = &sk{
        $r = sy&R
        fatal.isR(r)
        # for s//R//$k=C
        # < deprecate this. breaks map(Aof,...)
        k and return r.sc[k]
        return r
    }
    # climb over a usu separation (&clonover, &copi, etc)
    #  where multiple C over dimensions, most grabable.
    $Cof = s => s && (sy&C || sy&Outs) || s
    # o s//R//E
    me.REof = &acgts{
        $r = me&yfuture,s
        $e = rs&E
        !e and throw "!RE",s
        return e
    }
    # s//E means the main E inside the RE on s
    me.Eof = &acgts{
        !isnode(s) and debugger
        # s-Log// (sy&R%E)
        $RE = me&REof,s
        !REc&pi || REc&pi != sc&pi and debugger
        # /-Log
        # < REy&main isnt there til later
        $E = me&Risc,RE,'-'+REc&pi
        return E
    }

   // access many
    # &ioty with easier s//R for any %scgk, tends to R//s
    # < leg the s//R, see &Sharg sound.
    me.iot = &acgtscg{
        # Such c is forming
        g ||= {}
        c.startsWith('%') and s = sy&R || s; c = c.substr(1)
        else
        c.startsWith('-') and g.suchpi = c.substr(1); c = ''
        else {
            $t = c; c = ''
        }
        # g$N - g buys N

        $N = me&ioty,s,c,t
        # < gs.* can identify, clue how it should be elsewhere
        g.suchpi and grepout(N,n => nc&pi != g.suchpi)
        $fromr = isR(s)
        each in N {
            if (fromr) {
                !isR(n) and ~>4 n-in-r: s.t, '/', n.t
                n = N[i] = sof(n)
            }
        }
        return N
    }
    # storage on sy&$t via h.i|o(k+,v?)
    me.yio = &acgtst{
        # y&tt/...:lovely/...:expr
        $lovely = [...arguments].slice(6)
        $auf = &{
            $expr = [...arguments]
            $io = expr.shift()
            # transpose instruction to accum|count
            isar(expr[0]) and $y = ['y']; expr[0] = expr[0][0]
            # just h.i('such') -> such:1
            io == 'i' && hak(expr) == 1 and expr.push(1)
            return [s,y||'y',t,...lovely,...expr]
        }
        return {
            i: &{ return ahk(...auf('i',...arguments)) },
            o: &{ return ahsk(...auf('o',...arguments)) },
        }
    }
    
   // access ^^
    # &complace -> &Thisplanet...
    # involves this climby visitor in &com:
    me.Ay = &acgtvscq{
      // init
        return &y{
        # v = $A
        # s = ^^..1^^
        # c = matches, eg c&complace. no callback if not.
        c = peel(c)
        c.c and c.c = peel(c.c)
        # lets climb non-C (x.up) if q is given?
        # < go by isC(v), expect that type onward
        q ||= {Cish:1}
        
        # state
        #  ~~ d of &ind, doesnt fork
        $g = {d:0,visit:[],climb:[]}
        # and parsed expr:s
        
        # /^^ doesnt visit $v, only those above
        s [0] == '/' and g.beyond = 1; s = s.slice(1)
        else g.fromhere = 1
        # climbing particles once A.1 is reached (^^..1)
        s == '^^..1^^' and g.partat = 1
        else
        s == '^^' and 'ok'
        else {
            throw "What", s
        }
        
      // visiting
        $z = v
        while (1) {
            g.d++ > 44 and throw "oup"
            $skip = 0
            q.Cish and fatal.isC(z)
            
            # d.beyond is the opposite of d.dl
            #  to climb past without visit
            $visit = g.d > (g.beyond||0)
            
            # start climbing particles
            g.partat && z[g.partat] == z and g.party = 1
            # matching what to visit
            c.c && !hak(sex({},z.c,c.c)) and skip = 'cif:c'
            if (g.party) {
                # A should be J-knowing
                !z.1 and debugger
                # A occasionally J
                z.1 != z and skip = 'party'
                # after climbing A.up, visiting all until A==A.1
                # skip til next A with .1=A
                #  this is the A.1=A hack, see J
                # < g.partat = 3, for A^^..3, then all 3s, 4
                #    might need g.party=z...
                # < same for Cy&1-4?
                # nothing here about .2, which has this same sense
                # .2 to the .1 above our .1
                #  isnt always there
                # .3 to itself, less often than .1
                #  .3.2.3 should yield ^^3^^3
                # .4 to itself, avoid beyond
                z.4 == z and g.nofurther = '>4'
            }
            # < matching what to climb
            
            if (visit && !skip && !g.not) {
                # doesnt have g.la|la if you visit the first one
                $la = g.visit && g.visit.slice(-1)[0]
                ahk(g,['visit'],z)
                # g.la is your climbed-from descendant, visited or not

                $ret = y (z,g,g.la,la)
            
                ret and ahk(g,['yes'],z)
            }
            
      // climbing
            g.nofurther and g.not = g.nofurther
            g.not and break
            
            $up = q.Cish ? zy&up : z.up
            
            # < extra ways up via y&R, etc
            !up and break
            up == z and g.loopy = 1; break
            if (g.party) {
                !up.1 and debugger
            }
            g.la = z
            z = up
            # < g.N all inclusive
            ahk(g,['climb'],z)
            
            g.not and break
        }
        return g
        }
    }
    # immediately above: ^
    me.Ayu = &acgtvsc{
        s ||= '^^'
        $p
        me&Ay,v,s,c (&sd{
            p = s
            d.not = 'Ayu for the first one'
        })
        return p
    }
    
  // misc() array
    # slices hash-keys|array by key|value|matcher:
    #  c = {aft: 'akey'|v|v=>1 } | 'akey'
    #  returns
    #   slices of arrays
    #   arrays of keys of hashes
    # note num()-able hash keys all come in order first,
    #  otherwise in order of appearance
    $ksaf = &sc{
        $keys = haks(s)
        # < default to !inc the match?
        # < variations for
        !isob(c) and c = {aft:c,inc:1}
        $it = c.aft||c.bow
        if (iskeyish(it)){
            $ki = (isar(s) ? s : keys).indexOf(it)
        }
        else {
            # slice by value
            $ki = -1
            each ik keys {
                $v = s [k]
                !(isfu(it) ? it(v,k,i) : v == it) and continue
                ki = i*1
                break
            }
        }
        if (ki < 0) {
            # not found
            !c.may and throw "no ksaf",c
            $N = keys.slice()
        }
        else {
            # slice arg2 is first one not to include
            # splice arg2 is length of selection
            $N = keys.slice(... c.aft ? [ki+1] : [0,ki])
        }
        # may include the point, usu just what's behind it
        c.inc and c.aft ? N.unshift(keys[ki]) : N.push(keys[ki])
        # c.near for closest to ki first (reverse the bow)
        c.aft ? c.rev : c.near && !c.rev and N.reverse()
        isar(s) and N = N.map(k => s [k])
        return N
    }
    
    # check if A.1 and A.3 have anything between them
    me.listbetween = &acgtN,items{
        $between = []
        while (hak(items) > 1) {
            $a = items[0]
            $b = items[1]
            between.push(... ksaf(ksaf(N,{aft:a}),{bow:b}))
            items = items.slice(1)
        }
        return hak(between) && between
    }
    # place items after y
    me.listin = &acgtMy,items,removing{
        $yi = M.indexOf(y)
        yi < 0 and debugger
        if (removing) {
            # eg reordering E/*
            #  not knowing if we have all|subset-mingled
            #   or how to reconstruct that mingle (order of others)
            $gone = grop(notoneor(removing,items),M)
            #  so stack them all up where the first one was
            $yi = gone.indexOf(y)
            # location floats backward as we go removing
            # < if we dont remove y (can noop if its in items):
            #  < this would be a good thing to grasp intuitively
            yi < 0 and throw "find goners before y"
            yi >= 0 and yi -= yi
        }
        M.splice(yi+1,0,...items)
    }
    
    # filtering N[n+]
    # < nc&not
    me.Nfilt = &acgtNc{
        return N.filter(n => me&nfilt,n,c)
    }
    # $c:cif programmatic if statement
    me.nfilt = &acgtnc{
        return gteqcv(ny&cv,c)
            && (c.modt == null || c.modt == ns&modt)
            && (c.t == null || c.t == n.t)
            && (c.y == null || c.y (n))
            && (c.n == null || c.n == n)
    }
    
    # [1,1,2] = flatten([1,[1,2]])
    $flatten = &M{
        !isar(M) and throw "flatten!ar"
        $N = []
        each il M {
            l == null and continue
            isar(l) and N.push(...l)
            else N.push(l)
        }
        return N
    }
    
  // misc() array grep|map
    # ! (s)ubject is passed in from the right, as perl does
    # < Babz in as perl does
    #   expr like 'grep {...} grep {...} N' need a lot of magic?
    #   and /such/, and ../such/ like ksaf() til
    #    not requiring Babz?
    #   and to prefix '_ =>' onto c expr: !_c&recycled
    #    as in perl $_ (not as bare expr, in c=BLOCK)
    # < for c='string' s=[C+], find C%string
    #  < and more... io Babz makes c={ifs,climb,select,etc}
    $grep = &cs{
        # no function greps for true
        #  see also nex(), for not-null
        arguments.length == 1 and s = c; c = {y:v => v}
        else
        # function
        isfu(c) and c = {y:c}
        else
        # item: usu C to look for in /$n
        isit(c) and c = {is:c}
        else
        isar(c) and c = {in:c}
        hak(c,'is') and c.y = v => v == c.is
        hak(c,'in') and c.y = v => c.in.includes(v)
        isfu(s) and throw "iterating? it's grep(y,N)"
        
        $array = isar(s)
        $o = array ? [] : {}
        each kv s {
            !c.y (v,k,o,s) and continue
            array and o.push(v)
            else o[k] = v
        }
        return o
    }
    # false if empty, like &za
    $grap = &cs{
        $N = grep(c,s)
        return hak(N) && N
    }
    $grop = (c,s) => grepout(s,c)
    # removing .filter, y=[n+]|&n{1}|$n
    $grepout = &Ny{
        $out = []
        # < expets is|includes
        isar(y)     and $Z = y;    y = n => Z.includes(n)
        hak(y,'is') and $v = y.is; y = n => n == y.is
        !isfu(y)    and $v = y;    y = n => n == v
        $array = !N || isar(N)
        each in N {
            array and i *= 1
            y (n,i) and out.unshift(i)
        }
        return array ? out.map(i => N.splice(i,1)[0]).reverse()
            : tax({},N,out)
    }
    
    # revisit &fabioty
    
    # map, [] or {}, waves of y(v,k)
    $map = &N{
        $args = [...arguments]
        $N = args.pop()
        $array = isar(N)
        $waves = [N]
        # map(N) ~~ N.slice()
        !hak(args) and fatal.isar(N); args.push(s => s)
        args.reverse().map(&y{
            $N = waves.slice(-1)[0]
            $neu = array ? [] : {}
            waves.push(neu)
            each in N {
                array and i *= 1
                neu[i] = y (n,i)
            }
        })
        return waves.slice(-1)[0]
    }
    # map without gaps, src first.
    #  eg M = pam(N, e => ey&R && convert(e))
    # < working? returns unmapped e.
    # < non-first y() should not receive the gaps
    $pam = &{ return grep(map(reverse(...arguments))) }
    # returning [v+]
    $armap = &{
        $s = map(...arguments)
        return isar(s) ? s : havs(s)
    }
    # replacing map()
    #  N changes in place (and returns)
    # < undef == y() deletes it?
    $rap = &N{
        $args = [...arguments]
        $N = args.pop()
        $array = isar(N)
        args.reverse().map(&y{
            $M = []
            each in N {
                array and i *= 1
                M.push(y (n,i))
            }
            each in N {
                N[i] = M.shift()
            }
        })
        return N
    }
  
  // misc() array many
    # array from iterable: [s] = y.i=s|[s+]|&{}|[]
    #  for &sustrain y.i
    #   where you want one-or-list, possibly from callback
    $fuN = &s{
        # < args?
        isfu(s) and s = s (...[...arguments].slice(1))
        !s and s = []
        !isar(s) and s = [s]
        return s
    }
    # figures if N = N or N[0] is the intended array to use
    #  for eg N=[...arguments] for aroint()
    # < there are a bunch of arguments parsing things
    #   eg C|A:n, C t can be given C,
    #    which is should clone if no further args
    #    other args become t?,y,c,sc of an elvis upon given C
    # < can '() => ...' functions access the callers arguments?
    #   for aroint() to take less code
    #  < multiplex a bunch to parse things out. eg sum(y?,N|...N)
    #   < arguments are silly though, modern life is params
    $flatorray = &N{
        return hak(N) == 1 && isar(N[0]) ? N[0] : N
    }
    # add numbers sum(f?,N)
    # < compile out the optional leading arg uglies
    $sum = &{
        $args = [...arguments]
        $whatfor = isfu(args[0]) && args.shift()
        # sum(a,b,c...) or sum([a,b,c])
        $N = flatorray(args)
        $total = 0
        each in N {
            whatfor and n = whatfor(n)
            num(n) and total += n*1
        }
        return total
    }
    # perl split()
    #  except it's how many $times to match (from 1)
    $split = &s,by,times{
        $N = s.split(defor(by,' '))
        if (times && hak(N) > times) {
            N = [
                ... N.slice(0,times),
                N.slice(times).join(by)
            ]
        }
        return N
    }
  
  // misc() array string
    # ghostily, the way to w:Text from w:Pictures
    # < types for weird sorts of compression!!
    #   for eg W.t storable (filename sanity)
    
    # "$k:v(.t)" separated by " ", only C|string from c, eg a
    # < no numbers? not c.el? see &sustain etc
    # used for Eight.t by &complace
    $idint = &c{
        $idc = grep(v => iske(v) || isC(v), c)
        !hak(idc) and throw "no idint"
        return spant( armap((v,k) => cint([k,v]), idc) )
    }
    
   # simply joining by something, possibly with C.t
    $cint = &{ return aroint([...arguments],':') }
    $daint = &{ return aroint([...arguments],'-') }
    # < dis() that goes peel:1 if big
    #    or value types could be separators, as in R%Cit
    $coint = &{ return aroint([...arguments],',') }
    $slant = &{ return aroint([...arguments],'/') }
    $spant = &{ return aroint([...arguments],' ') }
    # allows the above to be eg cint(i,t) or cint([i,t])
    $aroint  = (N,k) => joint((hak(N) == 1 && isar(N[0]) ? N[0] : N),k)
    # "$t1-$t2" for [C,C,C{.t==not}]
    # < not used once in a year in weird times (&pilegs)
    #   path making (from climbing) shall where itself by now
    $joint = &N,join,not{
        # ioty may N=C/*
        $M = (isC(N) ? me&ioty,N : N||[]) .map(n => isC(n) ? n.t : n)
            .filter(t => t != null && (not == null || t != not))
        $s = M.shift()
        join ||= '-'
        each in M {
            # leading joiner-ish thing
            (n+'').startsWith('<'+join) and s += n
            else { s += join+n }
        }
        return s
    }

  // misc() access
    # defor wanting true, != 1
    $notoneor = &{
        each is arguments {
            !(s == null || !s || s == 1) and return s
        }
        throw "nothing not-1"
    }
    # defined-or: s //= 1, s=0 stays 0
    $defor = &{
        each is arguments {
            s != null and return s
        }
        throw "nothing definite"
    }
    # y(v,k) for s
    $hav = &sy{
        return haks(s).map(k => y(s[k],k))
    }
    # see perl's values()
    $havs = &s{
        return haks(s).map(k => s [k])
    }
    $dis = &sc{
        # light over slope
        c ||= 4.23
        isnu(c) and c = {dl:c}
        if (c.dl == 2 && isC(s)) {
            # C:Thing@2 used for &rowcap PK
            $cv = sy&cv && sy&cv != 0.1 ? '@'+cvf(sy&cv) : ''
            $sym = isnode(s) ? 'n:' : 'C:'
            return sym+s.t+cv
        }
        return ki(s,c.dl)
    }

  // misc() hash
    # hash stash, on t.sc[k] or so if C:t
    # < cant handle only k:v
    $ahk = &tk{
        !isob(t) and throw "!ob"
        # might accum into array at the end if k=[$k]
        $M = [... arguments].slice(2)
        isar(k) and $listend = 1; k = k[0]
        # into .sc.$k...@$M
        if (isC(t)) {
            # < ahsk() should also do this
            $nk = 'sc'
            # or in .c|y (making .sc.c... impossible)
            k == 'c' || k == 'y' and nk = k; k = M.shift()
            $h = t[nk]
        }
        else {
            $h = t
        }
        M.unshift(k)
        while (M.length) {
            k = M.shift()
            k == null and debugger
            M.length > 1 and h = h[k] ||= {}
            else {
                $re = h[k]
                if (listend) {
                    $n = M.shift()
                    if (n == 1) {
                        # counter
                        h[k] ||= 0
                        $N = ++h[k]
                        !isnu(N) and throw "listend!num"
                    }
                    else {
                        $N = h[k] ||= []
                        !isar(N) and throw "listend!ar"
                        !N.includes(n) and N.push(n)
                    }
                    return N
                }
                else {
                    !M.length and debugger
                    $v = M.shift()
                    # empty hash at the end ensures+returns hash
                    if (isha(v) && !hak(v) && !isar(v)) {
                        h[k] && (!isha(h[k]) || isC(h[k])) and throw "!{}||={}"
                        re = h[k] ||= {}
                    }
                    else {
                        re = h[k] = v
                    }
                    return re
                }
            }
        }
    };
    # some of the smallest structures
    # reversibly|diffily, create transform theory
    # phenom comes in waves
    # waves have a skin
    # skins relate posture
    # < for even ...arguments, like perl's {@kvs}
    $hashkv = &kv{
        $args = [...arguments]
        if (args.length == 1) {
            $first = args[0]
            # hashkv('it') -> {it:1}
            !isar(first) and args.push(1)
            else {
                # hashkv([[nc&sip,n]+]) -> {'0 1 2':n}
                #  !N.length -> {}
                $array = isar(first[0])
                # hashkv(['it','es']) -> {it:1,es:1}
                args = []
                each in first {
                    args.push(array ? n[0] : n)
                    args.push(array ? n[1] : 1)
                }
            }
        }
        $c = null
        while (args.length) {
            $k = args.shift()
            c && args.length < 1 and throw "odd hashkv"
            $v = args.shift()
            c ||= {}
            !iskeyish(k) and debugger
            c[k] = v 
        }
        return c || {}
    }
  
  // more type, cv
    # see also dec()
    # print 0.123 as 123, !cv-fatal
    #  see unfatal: cvf(), opposite: scv() (or sca()==scaf())
    # convention of translating, from cv to s
    #  eg cv|s format is 0.1|1, as $C|Lines would say
    $cvs = &s{
        !(s >= 0 && s <= 1) and throw "numf!cv"
        return (s+'').substr(2)
    }
    $numf = cvs
    # 0.33 = scv(33), with floating points (gets floaty at precision=17)
    # < collect cv type functions, eg is opposite of numf(0.33)
    $scv = &ov,{
        return dec(sca(ov),15)
    }
    # various cv compares
    #  c.* may contain more eg see &modselect
    $gteqcv = &vc{
        v ||= 0
        return (c.gte == null || v >= scv(c.gte))
             && (c.lte == null || v <= scv(c.lte))
             && (c.gt == null || v > scv(c.gt))
             && (c.lt == null || v < scv(c.lt))
             && (c.cv == null || v == scv(c.cv))
    }
    # good for: cvlt(R%boost,3) and return
    $cvlt = (s,c) => gteqcv(s,{lt:c})
    
    # < vague. for sz(c.ov,2) and return
    #    turn into: sz(c,'ov') (2)+
    #     could t='ycv', or t={io expr} to tug measures
    #      of what it wants to think about against this number
    #    is a paradigm of osc access
    # (qua||0) < 2 and leave
    # sizes something, usu ope|interest for snoozing
    $lt = &lt{
        t > 1 and t = '0.'+t
        return sz(l,t)
    }
    $sz = &ns{
        isob(n) and throw "pass value||null"
        return (n || 0) < s
    }
    
    # 's' -> 'sc'
    $isnk = &k{
        !(k == 'y' || k == 'c' || k == 's') and return
        k == 's' and k = 'sc'
        return k
    }
    # 'sthing' -> ['sc','thing']
    #  could go further into subframe if !string?
    $splitnkgk = &s{
        $k = isnk(s [0])
        return k ? [k,s.substr(1)] : [s]
    }

  // peel(), arq()
    # hash from 'k:v' or , v=1 if not given
    #  < nestings of the : and , separators
    $peel = &s,sep,kep{
        s == null || s == '' and return {}
        # ["t"] -> {t:1}
        isar(s) and return hashkv(s.map(k => [k,1]))
        # clones supplied hash
        isha(s) and return ex({},s)
        
        if (isst(s)) {
            # shortcut?
            sep ||= ','
            kep ||= ':'
            $v = {}
            $kvs = s.split(sep)
            each i,kv kvs {
                kv = split(kv,kep,2)
                v[kv[0]] = kv.length > 1 ? kv[1] : 1
            }
            return v
            # < sep|kep?
            # < rebuild for k:that:go:deeply,
            #   or that@link to indentedchunk later
            #    or link object anywhere, if A:L..A:peel
            #   wants to be a codemirror language
            #    referency concise prose
        }
        throw "not peely", s
    }
    # 'k:v' from hash
    # something has already checked it for objectiness (&enL)
    $depeel = &s,sep,kep{
        sep ||= ','
        kep ||= ':'
        $N = []
        each kv s {
            N.push([k,v].join(kep))
        }
        return N.join(sep)
    }
    # null-fatal peel
    $peli = &l{
        !(isst(l) || isar(l) || isha(l)) and throw "!peli", l
        return peel(l)
    }
    # looks like something to peel,
    #  supposing it will always be 
    $peelish = &s,sep,kep{
        sep ||= ','
        kep ||= ':'
        return isst(s) && (s.includes(sep) || s.includes(kep))
    }
    # departmentalise c if not already
    #  for s sublating its namespace
    # q.K=1:        c=v -> s.K=v
    # q.K=gk:  c(.K)?=v -> s.K.k=v
    # is basically:
    #  !q.qk and q = {qk:q}
    # q.peely>0: peel(v) if it needs to be housey
    #  not if v is going for c.label.s
    #  
    # smallest totality?
    #  people fall in a ditch that triangle will not fix
    $arq = &cq{
        $origin = c
        # c fated to mix into s.$K, not s
        #  unless it knows any of these $k
        !q.qk and throw "index"
        # < without any q.qk? does to_housey(c.*.*)
        $qk = haks(q.qk)
        # the default department first
        $K = qk[0]
        $gk = q.qk[K]
        # how c and any c.K should end up
        $housey = isho
        # v must be beyond housey (index)
        $itemic = isit
        
        # try to leave c(.*)? housey
        # may not be possible, if v=C and no more qk
        # eg &Cye solving c="La":
        #   expe() peely=1: -> c={La:1}
        #  + qk.s=1:
        #   exts() peely=0: -> c={s:"La"}
        #   expe() peely=1: -> c={s:{La:1}}
        # more eg below
        $to_housey = &vd{
            # not c if peely=0
            # even c.*.* if peely=2
            !(q.peely && q.peely >= (d||0)) and return v
            return v == null ? null : peel(v)
        }
        if (itemic(c)) {
            # 2-house: c.label.s may be itemic
            # c=C -> c.s=C, then -> c.label.s=C
            gk != 1 and c = hashkv(gk,c)
            else {
                # 1-house: c should be housey
                # c=C -> c.label=C
                # c="st" -> c.label=(peely ? {st:1} : "st")
                c = to_housey(c)
                if (itemic(c)) {
                    # was peely=0, or C passed through peel()
                    # put as default department
                    K != null and c = hashkv(K,c)
                }
                else {
                    # now may have deparments:
                }
            }
        }
        if (housey(c)) {
            # for any department, or the default
            $match = qk.filter(K => hak(c,K))
            if (!hak(match)) {
                # nothing we know about
                #  (that we should try to make housey)
                # c.s:C -> c.label.s=C
                c = gk == 1 ? c : hashkv(gk,c)
                c = hashkv(K,c)
            }
            else {
                each iK match {
                    $v = c[K]
                    $gk = q.qk[K]
                    # leave c.label={...}
                    # < or whatever we want there
                    housey(v) and continue
                    # 2-house: v may be itemic
                    # c.label=C -> c.label.s=C
                    gk != 1 and v = hashkv(gk,v)
                    else {
                        # 1-house: c.label should be housey
                        # c.label="st" -> c.label=(peely ? {st:1} : "st")
                        v = to_housey(v)
                        # may still be itemic if !peely, eg:
                        # c.label=C -> c.label.C (unhousable)
                        isC(v) and throw "c."+K+"=C !",c,v
                    }
                    # < when|how v not housey (domesticate it)
                    isC(v) and throw "c."+K+"=C !",c,v
                    !isha(v) and throw "c."+K+"!housey",c,v
                    v == c[K] and continue
                    # preserves the c passed in
                    c == origin and c = ex({},c)
                    c[K] = v
                }
            }
        }
        else {
            throw "type",c
        }
        if (q.peely == 2) {
            # < c.label.s housey or fatal?
            throw "each qkv c"
        }
        return c
    }

  // ex*()
    # hash merge (extend)
    $ex = &sc{
        !s || typeof s != 'object' and throw "ex!s"
        !c || typeof c != 'object' and throw "ex!c"
        each kv c {
            s [k] = v
        }
        # ex(s,c+)
        arguments[2] && [...arguments].slice(2).map(c => ex(s,c))
        return s
    }

    # ex with array merge
    #  eg s|c.via=[one|two] -> s.via=[one,two]
    $mex = &scq{
        q ||= {}
        if (q.ek) {
            # fatal to want change
        }
        c = exable(c,s)
        return ex(s,c)
    }
    # selective extend
    $sex = &scqe{
        # < Babz for parsing arguments
        e == 1 and $y = k => c[k] && 1
        q = peli(q)
        each kv q {
            hak(c,k) && (!y || y(k)) and s [k] = c[k]
        }
        return s
    }
    # selectively not extending
    #  nex(c,s,c) extends what isnt in c.* yet
    $nex = &scq{
        q = peli(q)
        each kv c {
            hak(q,k) and continue
            s [k] = v
        }
        return s
    }
    # text only
    $tex = &sc{
        each kv c {
            iskeyish(v) and s [k] = c[k]
        }
        return s
    }
    # defined only
    $dex = &sc{
        each kv c {
            v != null and s [k] = c[k]
        }
        return s
    }
    # selective ex, taking out (unless $k:0)
    #  as in consuming arguments from a c
    $tax = &s,c,take{
        !c and return s
        !isha(s) and throw "tax s?",s
        !isha(c) and throw "tax c?",c
        take = peli(take)
        each k,remove take {
            !hak(c,k) and continue
            remove and s[k] = delete c[k]
            else { s[k] = c[k] }
        }
        return s
    }
    # < generating type loosen|tighten from pex = p + ex
    $pex = &sc{
        s = isha(s) ? s : peel(s)
        return ex(s,peel(c))
    }
    # merge s.* if hash|array
    $ex2 = &scq{
        c = peel(c)
        q ||= {}
        isC(s)||isC(c) and throw "expe..C"
        each kv c {
            $V = s [k]
            if (isar(v) || isar(V)) {
                # both must already be array
                !(isar(v) || isar(V)) and throw "ex2!botharray",k,c,s
                # < merging how. see resolve $n
                V = q.merger ? q.merger(k,V,v)
                    : [...V, ...v]
            }
            elsif (V && isha(V) || v && isha(v)) {
                # allows either to peel, usu 1 -> {}
                isst(V) && isha(v) and V = peel(V)
                isst(v) && isha(V) and v = peel(v)
                #  replace 1->{}
                V = exable(V)
                #  and|or premix arrays in v.*
                v = exable(v,V)
                # mixing v into V
                ex(V,v)
            }
            else {
                # replacing
                V = v
            }
            s [k] = V
        }
        return s
    }
    # will it ex()
    # s = one argument to ex() at a time
    # returns s or a coercion to replace it:
    #  s=null|1 -> {} coercion
    #  s.* and c.* array pre-mixing
    $exable = &s,c,fatal{
        # returns coercions or false
        !s and return {}
        s == 1 and return {}
        isar(s) and throw "what?"
        if (!isha(s)) {
            fatal and throw "!exable",s,c
            return 0
        }
        # < Cy&sortin patch-conforming c, putting el:8 etc
        #   exable(c,s) becomes lv(s,c)
        #   ex(s,c) becomes el(s,c)
        isC(s) and throw "exC"
        if (c) {
            # premix arrays
            # c,s are the s,c from ex(s,c)! upside down.
            #  here, s merges into c
            #  because we can replace s
            #    as returning a coercion
            #   with a copy with pre-mixed arrays
            # < does it uniq, or have:
            #    a sort-in function on s.* or isC(V)?
            #   if k=ref, has to renumber or create subnet
            s = ex({},s)
            each kv s {
                $V = c[k]
                (!v || !isar(v)) && (!V || !isar(V)) and continue
                # < coerce V==0 -> []?
                V && isar(v) && !isar(V) and throw "ex not<-array"
                v && isar(V) && !isar(v) and throw "ex array<-not"
                s[k] = [...(V||[]), ...(v||[])]
            }
        }
        return s
    }
  
  ## kinda weedy - argument->data interpreters that peel etc
  ##  ideally we don't need to write code at this level efficiently, only at the io level
  // arq()-based
    # may peel non-c.$name looking isst(c) 
    # < peeled into s, not into s.$K
    #   if c.$K is present+string, into c.$K.$k (string)
    # < don't want to have to specify Xo to stay out of it
    #$c = expets({Xo:{pic:2}},'vee:3,figures:2,Xo:3','Xo:Xu')
    # < should see assume t is t
    #$c = expets({Xo:{pic:2}},'t:sno','Xo:t')
    # < not .Vil.Vil='vee'
    #$c = expe({Xo:{pic:2}},'vee','Xo:Vil')
    $expets = &scqk{
        isst(c) && peelish(c) and c = peel(c)
        return exts(s,c,q,k)
    }
    # s=k:v hash copy after arq()
    #  c can stay string if ^ takes it beyond c.*.*
    # v merges if both hash
    # s|c being C is fatal
    #  < could have something on it?
    # v not being hash is fatal
    #   which is where exts() would give it a key
    #   unless v=1,
    #    logically compatible with v={...}
    $expe = &scq{
        # ensure c is a hash
        $origin = c
        if (q) {
            # get a list of words
            q = peel(q)
            # arq() is basically:
            !q.qk and q = {qk:q}
            # may departmentalise c, peel c.label
            q.peely = defor(q.peely,1)
            c = arq(c,q)
        }
        return ex2(s,c)
    }
    # s=K.k:v hash copy
    # with q, c may be (already)? departmentalised
    # s.label = "st", c.label = {...} is fatal
    #  in reverse however, s will .label:{...,s:"st"}
    # c="st" or c=K/"st" may -> s=K/"s":"st"
    #  if q.es[K] (not peeled?)
    # eg la:{ya:2} + la:three -> la:{ya:2,s:three} (K="la")
    $exts = &scqk{
        if (k) {
            # specifying a pair: c.$label.$s = 'the label'
            !isst(q) and throw "q+k"
            q = {qk:hashkv(q,k)}
        }
        else {
            # get a list of words
            q = peel(q)
            !q.qk and q = {qk:q}
            # with a default gk='s'
            $qk = haks(q.qk)
            hak(qk) == 1 && q.qk[qk[0]] == 1 and q.qk[qk[0]] = 's'
            # dont peel c(.label)?="string"
            q.peely = 0
        }
        return expe(s,c,q)
    }
    # hash copy up to a certain key
    $extil = &scq{
        # < expe q, and q=CODE -> q.cb
        each kv c {
            k == q and break
            s [k] = v
        }
        return s
    }
  

  // hak|haks
    # copied from G/g-j/NutGravy, 2018 (ish) pivot to all-javascript design

    # s=Object has keys
    $haks = &s,d{
        $N = []
        !s and return N
        each k,v s {
            N.push(k)
        }
        return N
    }
    # s=Object number of keys, or has a d=key
    $hak = &s,d{
        !s and return 0
        return d == null ? Object.keys(s).length : s.hasOwnProperty(d)
    };

    $uniq = &N{
        $M = []
        each is N {
            M.indexOf(s) >= 0 and continue
            M.push(s)
        }
        return M
    }

    # [[...]...] to [......], with callback per/after flattening
    # # the above per/after or-expr is how I used to write before io made out/in better. I now this|that
    # USE only in iooia a few times
    $lineate = &L,d,cb{
        typeof d == 'function' and cb = d; d = {}
        typeof d == 'number' and d = {dl:d}
        d and d = ex({},d); d.di = (d.di||1)-1;
        d ||= {};
        (d.di ||= 0) < -15 and debugger; throw "Too many lineate";
        $s = [];
        each il L {
            if (l.constructor == Array && (!d.dl || d.dl > d.di)) {
                $r = l = lineate(l,d,cb);
                cb and r = cb(r,d,l);
                r and l = r
            }
            if (l && l.constructor == Array) {
                each i,ll l {
                    s.push(ll);
                }
            }
            else {
                s.push(l)
            }
        }
        return s
    }
    # < GOING should mostly be X by now (complexity).
    #    was kooky ball of features, eg ~~ two array thing: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#why_weakmap
    # this is a tiny data situator of a one|two column table
    #  that you accumulate to
    $ac = &skvKV{
        K and "ac two table column deprecated"
        !isob(s) and throw "ac s!ob"
        # s may be C, so ac to C.sc.*
        $S = s.sc || s
        $l = S[k] ||= [];
        $li = l.indexOf(v);
        if (li >= 0) {
            return 1
        }
        else {
            l.push(v)
        }
    }

    #c array match
    # if M, returns [not], puts M[matched]
    #  eg N = arou(N,'acty',actyN) 
    #    separates %acty to actyN from N
    # else, returns [matched]
    $arou = &NyM{
        $matched = M || [];
        if (isst(y)) {
            # scgk or not match
            $k = y;
            y = &n{ return n.sc[k] };
            if (k[0] == '!') {
                $cb = y;
                k = k.substr(1);
                y = &s{ return !cb(s) }
            }
        }
        if (isar(y)) {
            # in array match
            $ray = y
            r = &n{ return ray.includes(n) }
        }
        if (M && !isar(M)) {
            # for an Nx.$k=N tape splitter
            !k and throw "dunno Nx k",M
            matched = M[k] ||= []
        }
        $not = [];
        each in N {
            y(n) ? matched.push(n) : not.push(n)
        }
        return M ? not : matched
    };
    # match N into one of several groups
    $aroh = &Nc{
        c ||= {};
        isst(c) and c = G&peel,c
        $h = {};
        each kn c {
            # matcher n is &s{} or a scgk
            n == '1' and n = k
            $M = [];
            N = arou(N,k,M);
            h[k] = M
        }
        h.N = N;
        return h
    }

  // &fiu ah() etc
    # copied from G/g-j/Fividy
    
    #c fio|fiu
    # read spacey t, or insert C = y()
    $fio = &qty{
        !isC(q) and throw "NotC"
        qs&z ||= [];
        qy&tw ||= {};
        y != null && y == 0 and $readonly = 1
        y == '9' and $deletes = 1; y = null
        typeof t == 'object' and $obj = y = t; t = null
        $ar = y && y.constructor == Array;
        y && t == null and t = ar ? y [0] : y.t
        y != null && y == 0 and $readonly = 1
        
        $s = qy&tw[t];
        # allow removing from qs&z
        #  without tw if deleting given C
        $si = obj && deletes ? qs&z.indexOf(obj)
            : s && qs&z.indexOf(s);
        si < 0 and s = null
        if (deletes) {
            si < 0 and return
            qs&z.splice(si,1);
            delete qy&tw[t];
            return
        }
        if (!s && !readonly) {
            s = y ? ar ? G&Cye,y : y : G&Cye,[t,1]
            !qs&z.includes(s) and qs&z.push(s)
            qy&tw[t] = s
        }
        s and ss&z ||= [];
        return s
    };
    # fio() setting y&up, saying c.el
    # < more than one level
    # < io pipes A to A!
    # making ny&up=s on el=1
    me.fiu = &acgtstc{
        !isC(s) and throw "fiu!C"
        c ||= {};
        isnu(c) and c = {el:c}
        # read only
        $n = fio(s,t,0);
        # 4 is a dupey 1
        c.el == 4 && n == t and return n
        # 2 must be new or same (see lv el:2 == only such t)
        if (c.el == 2) {
            if (n) {
                # < resolve $n order
                n == t and return n
                throw "already i", n
            }
            c.el = 1
        }
        # 7 must be there, 8 read only
        c.el == 7 && !n and throw "No "+s.t+"/"+t
        c.el == 8 || c.el == 7 and return n
        !n and c.el ||= 1
        else {
            # if we were placing a different object
            isob(t) && n != t and c.el = 1
            # remove the one we found
            c.el == 1 || c.el == 9 and fio(s,n,9)
        }
        if (c.el == 1 || c.el == 4) {
            $n = fio(s,t);
            # inputting sets y&up
            ny&up = s
        }
        return n
    };
    # C usu sort by cv,t
    $tvsortz = &z{
        z.sort(&ab{
            return (ay&cv||0)*1-(by&cv||0)*1
                || ('' + a.t).localeCompare(b.t)
        });
        return z
    }
    $vsortz = &zy{
        !y and y = a => ay&cv
        $sy = a => (y(a)||0)*1
        z.sort(&ab{
            return sy(a)-sy(b)
        });
        return z
    }

    
    #c hash stash, on t.sc[k]
    ## see also ahk(), preferred
    $ah = &tk{
        !isC(t) and throw "!C"
        # might accum into array at the end if k=[$k]
        $M = [... arguments].slice(2)
        isar(k) and $listend = 1; k = k[0]
        # into .sc.$k...@$M
        $nk = 'sc'
        # or in .c|y (making .sc.c... impossible)
        k == 'c' || k == 'y' and nk = k; k = M.shift()
        $h = t[nk][k] ||= {}
        while (M.length) {
            k = M.shift()
            k == null and debugger
            M.length > 1 and h = h[k] ||= {}
            else {
                $re = h[k]
                if (listend) {
                    $N = h[k] ||= []
                    $n = M.shift()
                    !N.includes(n) and N.push(n)
                    return N
                }
                else {
                    !M.length and debugger
                    $v = M.shift()
                    # empty hash at the end ensures+returns hash
                    if (isha(v) && !hak(v)) {
                        h[k] && (!isha(h[k]) || isC(h[k])) and throw "!{}||={}"
                        re = h[k] ||= {}
                    }
                    else {
                        h[k] = v
                    }
                    return re
                }
            }
        }
    };
    # hash lookup, on hash (not C)
    $ahsk = &h{
        $M = [... arguments].slice(1);
        while (h && M.length) {
            h = h[M.shift()];
            !h and return h
        }
        return h
    };
    # hashes are identical
    $heq = &sd{
        return !hakd(s,d).length
    };
    # keys of differing values
    $hakd = &sd{
        $dif = {};
        each kv s {
            !hak(d,k) || d[k] != v and dif[k] = 1
        }
        each kv d {
            !hak(s,k) || s[k] != v and dif[k] = 1
        }
        $ks = [];
        each ko dif {
            ks.push(k)
        }
        return ks
    };

    $reverse = &s{ return s.slice().reverse() };

    # < see cvs() and scv()
    # make fraction of 1
    $sca = &s{
        s *= 1
        while (s >= 1) { s = s / 10 }
        return s
    }
    # interpret cv='','o2','32'
    $scaf = &ov,{
        !ov and return 0
        # ov=o2 -> 0.02
        if (isst(ov) && ov.substr(0,1) == 'o')
            ov = 1*('0.'+ov).replace(/o/g,'0')
        # ov=32 -> 0.32
        ov = sca(ov)
        return ov
    }

    # round to decimal places
    $dec = &s,precision{
        null == precision and precision = 4
        $mul = '1e'+precision
        return (s * mul).toFixed() / mul
    };

    # apparently sha256 is async
    $sha256 = async function (data) {
        const buffer = new Uint8Array(
            data instanceof ArrayBuffer ? data 
            : new TextEncoder().encode(data)
        );
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

        return Array.from(new Uint8Array(hashBuffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    $dig = function(s){
        return sha256(s).slice(0,12)
    };

# BUILT WITH $ perl -ne 'END { print"\n" }; print "$1 " if /^\s*\$(\w+) =/'  src/lib/Y/Pic.ts
# after you search: ^    (?:self|window).(\w+)
#      and replace:     $$$1
export {me, isC, Cye, iske, spacechars, isspace, num, isnum, isnu, isfu, isst, isar, isha, isob, isR, hasR, isho, ish, isit, isitemic, ispi, fatal, fatas, csof, sof, Aof, Cof, ksaf, flatten, grep, grap, grop, grepout, map, pam, armap, rap, fuN, flatorray, sum, split, idint, cint, daint, coint, slant, spant, joint, notoneor, defor, hav, havs, dis, ahk, hashkv, numf, cvs, scv, gteqcv, cvlt, lt, sz, isnk, splitnkgk, peel, depeel, peli, peelish, arq, ex, mex, sex, nex, tex, dex, tax, pex, ex2, exable, expets, expe, exts, extil, haks, hak, uniq, lineate, ac, arou, aroh, fio, tvsortz, vsortz, ah, ahsk, heq, hakd, reverse, sca, scaf, dec,sha256,dig}