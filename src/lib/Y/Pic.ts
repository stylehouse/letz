# general functions
#  copied mostly from Planet|Ying|G/ive/Pictures
#   completed source-harvesting from Planet|Ying:
#    G/g-j/NutGravy
#    G/g-j/Fividy
let self = {}
# < apparently you can't just do this and: import { me,ex } from "$lib/Y/Pic"
#export default self;
let me = self.me = {}

 // main
  // types
    # < check &Cye for whatever that does
    # < scaf -> scv # be fatal on eg o23, require 023 everywhere it might be?
    $isC = &s{
        return s && typeof s == 'object'
            && s.t != null && s.y && s.c && s.sc && 1
    };
    
    # < G&C, babz: = C yadda @3
    #   and to parse args for eg opeolo
    #   has a lot to do with:
    window.Cye = &s{
        s = G&Cye,s
        s.y = {cv:s.y.cv}
        delete ss&z
        s.t == null and debugger
        typeof s.t != 'string' and s.t = ""+s.t
        return s
    };

    # string
    $iske = k => typeof k == 'string' || typeof k == 'number'
    # stringy nothing
    $spacechars = {" ":1,"\n":1,"\t":1}
    self.isspace = s => hak(s) && !havs(s).some(s => !spacechars[s])
    # numbery, mostly as s*1 == s (not ' '*1 == ' ')
    self.isnum =
    self.num = s => (isnu(s) || s && s.length && !isspace(s)) && s*1 == s
    window.isnu = s => typeof s == 'number'
    window.isfu = s => typeof s == 'function'
    window.isst = s => typeof s == 'string'
    window.isar = s => s && s.constructor == Array
    window.isha = s => s && typeof s == 'object' && !isC(s)
    window.isob = s => s && typeof s == 'object'
    window.isR = s => isC(s) && sy&R == s
    window.hasR = s => isC(s) && sy&R
    
    
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
    # < GOING should mostly be X by now (complexity). was kooky ball of features.
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
    window.arou = &NyM{
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
    window.aroh = &Nc{
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
    window.fio = &qty{
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
    window.tvsortz = &z{
        z.sort(&ab{
            return (ay&cv||0)*1-(by&cv||0)*1
                || ('' + a.t).localeCompare(b.t)
        });
        return z
    }
    window.vsortz = &zy{
        !y and y = a => ay&cv
        $sy = a => (y(a)||0)*1
        z.sort(&ab{
            return sy(a)-sy(b)
        });
        return z
    }

    
    #c hash stash, on t.sc[k]

    window.ah = &tk{
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
    window.ahsk = &h{
        $M = [... arguments].slice(1);
        while (h && M.length) {
            h = h[M.shift()];
            !h and return h
        }
        return h
    };
    # hashes are identical
    window.heq = &sd{
        return !hakd(s,d).length
    };
    # keys of differing values
    window.hakd = &sd{
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

    window.reverse = &s{ return s.slice().reverse() };

    # < see cvs() and scv()
    # make fraction of 1
    window.sca = &s{
        s *= 1
        while (s >= 1) { s = s / 10 }
        return s
    }
    # interpret cv='','o2','32'
    window.scaf = &ov,{
        !ov and return 0
        # ov=o2 -> 0.02
        if (isst(ov) && ov.substr(0,1) == 'o')
            ov = 1*('0.'+ov).replace(/o/g,'0')
        # ov=32 -> 0.32
        ov = sca(ov)
        return ov
    }

    # round to decimal places
    window.dec = &s,precision{
        null == precision and precision = 4
        $mul = '1e'+precision
        return (s * mul).toFixed() / mul
    };

export {me, isC, ex, haks,hak,uniq,lineate,ac}