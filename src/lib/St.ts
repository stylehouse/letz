// Stylehouse, a dreamy coding paradigm in ts/js
# yeah
// basics
    # the baskets of properties that are C.y|c|sc
    type gc = {
        [key: string]: any
    }
    type C = {
        t: string; // name of object class to apply to C
        y: gc; // properties derived from the underlying machine
        c: gc; // properties defining the base identity of C
        sc: gc; // properties representing the essential qualities of C
    }
    type A = C & {
        y: {
            up?: A; // A this A was sprouted from
        }
        c: {
            ip: number[]; // IP address of variable length
            ips?: number; // how many children it has had
        }
    }
    # variable and class names clash!
    #  these types at runtime help sort piles of objects for intelligibility
    export class TheC {
        t: string; // name of object class to apply to C
        y: gc; // properties derived from the underlying machine
        c: gc; // properties defining the base identity of C
        sc: gc; // properties representing the essential qualities of C
    }
    export class TheA extends TheC {}


    # make new C, specifying innards
    export function C_(t: string|Array<any>|C, y?:number|gc, c?:gc, sc?:gc):C {
        if (isar(t)) {
            [t,y,c,sc] = t
        }
        if (!isst(t)) {
            # t must be C, from C_(C)
            throw "TODO clone = C_(C)"
        }
        let pi
        if (isst(y)) {
            if (y[0] == '-') y = y.slice(1)
            pi = y
            y = {}
        }
        if (isnum(y)) {
            if (y <= 0)
                throw "y <= 0"
            while (y > 1)
                y /= 10
            y = {cv:y}
        }
        t ||= ''
        y ||= {}
        c ||= {}
        sc ||= {}
        let C = new TheC();
        ex(C,{t,y,c,sc})
        if (pi) C.c.pi = pi
        return C
    }
    # A spawns A
    export function A_(V:A, t?:string):A {
        t ||= V.t
        let A = new TheA()
        ex(A, C_(t))

        
        # ip address (infinite position)
        VA_ip(V,A)
        # parent
        A.y.up = V
        # A.sc.z is the way to A/A
        i_(V,A)
        return A
    }
    # ip address (infinite position)
    export function VA_ip (V:A,A:A) {
        V.c.ips ||= 0
        V.c.ips++
        A.c.ip = [...(V.c.ip||[]),V.c.ips]
    }
    # put C inside C (C/C)
    export function i_(C1: C, C2: C, qua: string = 'z') {
        let N = C1.sc[qua] ||= []
        N.push(C2)
    }
    # get C inside C (C/C)
    export function o_(C1: C, qua: string = 'z') {
        let N = C1.sc[qua] || []
        return N
    }
    # C/+C for Nine. shall have %z down and .y.up
    export function pit (D,t,y,c,sc) {
        let C = C_(t,y,c,sc)
        i_(D,C)
        C.y.up = D
        return C
    }

// type and data handling helpers
    type typ = {
        ob?:1
            array?:1
            Cish?:1
                A?:1
                C?:1
            Ob?:1

            sym?:string
            bracket?:string
        num?:1
        str?:1
        bool?:1
        unk?:1

        iter?:1
    }
    export function detect_type(s:any):typ {
        let typ:typ = {}
        # < this is more inclusive than: s instanceof Object
        #    possibly for looking at Int\d+Array
        if (s && typeof s == 'object') {
            typ.ob = 1
            if (s instanceof Array) {
                typ.array = 1
                typ.bracket = '['
            }
            else if (s instanceof TheC) {
                typ.Cish = 1
                if (s instanceof TheA) {
                    typ.A = 1
                    typ.sym = 'A'
    
                }
                else {
                    typ.C = 1
                    typ.sym = 'C'
                }
            }
            else {
                # unknown type until contextualised
                typ.Ob = 1
                typ.bracket = '{'
            }
        }
        else if (typeof s == 'string') {
            if (isnum(s)) {
                typ.num = 1
            }
            else {
                typ.str = 1
            }
        }
        else if (typeof s == 'number') {
            typ.num = 1
        }
        else if (typeof s == 'boolean') {
            typ.bool = 1
        }
        else {
            typ.unk = 1
        }
        # a space, not a thing
        if (typ.Ob || typ.array) typ.iter = 1
        return typ
    }
    # type checking, ported from Fividy
    export function isst(s) {
        return typeof s == 'string'
    }
    export function isnu(s) {
        return typeof s == 'number'
    }
    export function isnum(s) {
        return (isnu(s) || s && s.length && !isspace(s)) && s*1 == s
    }
    export function isar(s) {
        return s && s.constructor == Array
    }
    let spacechars = {" ":1,"\n":1,"\t":1}
    export function isspace(s) {
        return hak(s) && !havs(s).some(s => !spacechars[s])
    }
    # and further back
    export function hak(s,d) {
        if (!s)
            return 0
        return d == null ? Object.keys(s).length : s.hasOwnProperty(d)
    }
    export function havs(s,d) {
        return haks(s).map(k => s [k])
    }
    export function haks(s,d) {
        let N = [];
        if (!s) {
            return N
        }
        for (let k in s) {
            let v = s[k]
            if (d == 'kv') { N.push(k,v) }
            else
            if (d == 's') { N.push(v) }
            else {
                N.push(k);
            }
        }
        return N
    }
    export function ex(s,c) {
        if (!s || typeof s != 'object') throw "ex!s"
        if (!c || typeof c != 'object') throw "ex!c"
        for (let k in c) {
            let v = c[k]
            s[k] = v
        }
        if (arguments[2]) throw "ex: too many arguments"
        return s
    }


// climbing
    # multi stage o_ with named columns (~~ "o ..." io expr)
    export function o_path (A, d) {
        if (isst(d)) d = d.split('/')
        if (isar(d)) d = { path: d }
        d.path = d.path.map(pa => isst(pa) ? {t:pa} : pa)
        if (!d.path) throw "!d.path"
        # d+ with complete d.path
        let N = []
        d.grab = function (C:C,d) {
            # d have rows spreading down joins
            d.c = ex({},d.c||{})
            d.sc = ex({},d.sc||{})

            # somewhere named in path
            let pa = d.path[d.d]
            if (pa == null) throw "off path"
            let ark = pa.ark || pa.t
            d.c[ark] = d
            d.sc[ark] = C
            d.ark = ark
            d.sc.d = d

            if (!d.path[d.d+1]) {
                # only go as far as the path
                d.not = 1
                N.push(d)
            }
        }
        inlace(A, d)
        # return many d.sc of many .$ark=C (and .d=d)
        # < group by?
        return N.map(d => d.sc)
    }
    # climb A^^ til d.(for|until|before) is found
    export function o_up(A, d?) {
        # default what to look for: everything
        d ||= { inc: 1 };
        if (!d.til) {
            # only up to A.3==A2.3
            #   use d.til to include the first A.3!=A2.3
            d.until ||= AyAsuch_unsame(A, '3');
        }
        d.climb ||= Y => [Y.y.up];
        if (d.thes) {
            d.sing = 1;
            d.grab = Y => Y.sc[d.thes];
        }
        return inlace(A, d);
    }
    #   make c.til|until to keep A^^ within A.y.such in common
    export function AyAsuch_unsame (A:C,such:string) {
        return function (A2:C) {
            return A2.y[such] && A2.y[such] != A.y[such]
        }
    }
    # find C** until d.(un)til returns true
    # see also me.inlace
    # caveats:
    #  d.(un)til avoids the first thing
    #   til may d.not before grab can happen
    export function inlace (C:C,d?) {
        if (!C) throw "!C"
        d ||= {}
        if (d.z) {
            d = {...d, up:d}
            # d/d+
            d.up.z.push(d)
            d.d += 1
        }
        # starts with here (if inc)
        #  then appends from C/D+ (or what d.grab maps them to)
        #   and whatever they 
        d.N = d.inc ? [C] : []
        d.inc = 1
        d.z = []
        d.s = C
        d.d ||= 0
        d.climb ||= (C:C) => o_(C,d.qua||'z')

        # avoid returning C if we're grabbing a Cs&thing (til->not before grab)
        if (d.grab) d.N = []

        # if d.(un)til returns true, stop
        let til = d.til || d.until || d.all
        let is_top = d.d == 0
        if (til && (!is_top || d.all) && til(C,d)) {
            d.not = 1
            if (d.until) {
                # un-returning C (and avoiding middle callbacks eg grab)
                d.N = []
            }
        }

        while (1) {
            if (d.not) break

            # start to visit here
            if (d.grab) {
                let v = d.grab(C,d)
                if (v) {
                    dN_from_middle(d, v)
                }
            }

            if (d.not) break

            # onwards
            # < subtypes of climb that emit d+ (rowing)
            let climbs = d.climb(C,d) .filter(D => D)
            if (d.climbs && climbs.length) d.climbs(C,d,climbs)
            if (d.not) break
            climbs .filter(D => {
                if (!D) return
                # recurse to C/D+
                let zN = inlace(D,d)
                dN_from_middle(d, zN)
            })

            break
        }

        return d.sing ? d.N.slice(-1)[0] : d.N
    }
    export function dN_from_middle (d,zN) {
        if (d.sing) {
            d.N.push(zN)
        }
        else {
            if (!isar(zN)) throw "!array"
            d.N.push(...zN)
        }
    }

