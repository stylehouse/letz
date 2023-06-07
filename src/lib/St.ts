// Stylehouse, a dreamy coding paradigm in ts/js

//#region basics
// the baskets of properties that are C.y|c|sc
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
// variable and class names clash!
//  these types at runtime help sort piles of objects for intelligibility
export class TheC {
    t: string; // name of object class to apply to C
    y: gc; // properties derived from the underlying machine
    c: gc; // properties defining the base identity of C
    sc: gc; // properties representing the essential qualities of C
}
export class TheA extends TheC {}

// make new C, specifying innards
export function C_(t: string|Array<any>|C, y?:number|gc, c?:gc, sc?:gc):C {
    if (isar(t)) {
        [t,y,c,sc] = t
    }
    if (!isst(t)) {
        // t must be C, from C_(C)
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
// A spawns A
export function A_(V:A, t?:string):A {
    t ||= V.t
    let A = new TheA()
    ex(A, C_(t))

    
    // ip address (infinite position)
    VA_ip(V,A)
    // parent
    A.y.up = V
    // A.sc.z is the way to A/A
    i_(V,A)
    return A
}
// ip address (infinite position)
export function VA_ip (V:A,A:A) {
    V.c.ips ||= 0
    V.c.ips++
    A.c.ip = [...(V.c.ip||[]),V.c.ips]
}
// put C inside C (C/C)
export function i_(C1: C, C2: C, qua: string = 'z') {
    let N = C1.sc[qua] ||= []
    N.push(C2)
}
// get C inside C (C/C)
export function o_(C1: C, qua: string = 'z') {
    let N = C1.sc[qua] || []
    return N
}
// C/+C for Nine. shall have %z down and .y.up
export function pit (D,t,y,c,sc) {
    let C = C_(t,y,c,sc)
    i_(D,C)
    C.y.up = D
    return C
}
//#endregion

//#region type and data handling helpers
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
        let typ = {}
        if (s instanceof Object) {
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
                // unknown type until contextualised
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
        // a space, not a thing
        if (typ.Ob || typ.array) typ.iter = 1
        return typ
    }
    // type checking, ported from Fividy
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
    // and further back
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


//#endregion


//#region the main functions, mocked up -
    
    // have a play
    export function St_main () {
        let A = C_('toplevel')
        A.c.ip = [1]

        let dub = St_writers(A)

        // make A1.sc.mind=Cmind /Cthing/Cact
        St_minds(A)

        // walk the A** tree with the mind
        return St_walkies(dub)
    }
    
    // walk the A** tree with the mind
    export function St_walkies (A) {
        // o A^%mind (the to return a singular %mind above, not an array)
        let mind = o_up(A,{thes:'mind'})
        let branch = o_up(A)
        // TODO the nearest mind is branched out to index happenings for us here
        //   so various walkies can be reset, etc.
        // TODO interate mind
        let got = []
        o_path(mind,['mind','thing','act']) .map(({thing,act}) => {
            got.push({thing,act})
        })
        
        let dat = {A,mind,branch,got}
        return dat
    }
    // keep going, same things
    export function St_loop (dat) {
        let A = dat.A
        dat.i ||= 0
        dat.i += 1

        // code to run
        let mind = o_up(A,{thes:'mind'})
        // communication channel|electrode to this iterator
        let T = {}
        for (let {thing,act} of o_path(mind,['mind','thing','act'])) {
            // when to
            //if (A.c.cv >= act.y.cv) return
            if (act.c.for == 'C') {
                // what to: C** until A
                let N = inlace(A,{until: s => s instanceof TheA})
                for (let C of N) {
                    act.c.code(A,C,{t:'Gee'},T)
                }
            } 
            else { throw 'act.c?'}
            A.c.cv = act.y.cv
        }
        return dat
    }


    // construct a one-trick mind
    export function St_minds (A1:A) {
        let mind = C_('mind')
        let thing = C_('wear')
        let act = C_('act',3)
        i_(mind, thing)
        i_(thing, act)
        act.c.code = function (A,C,G,T) {
            // knock a letter off anywhere, deterministically
            let t = C.t
            if (t.length == 1) return
            t = t.length % 2 ? t.substring(1) : t.substring(0, t.length - 1)
            C.t = t
        }
        act.c.for = 'C'
        A1.sc.mind = mind
    }
    export function St_writers (A1) {
        let A11 = A_(A1,'Earth')
    
        'one thing'
        'thince blatant'
        debugger
        1+1
        // create some Cs for authors
        let Joyce = C_('blatantJoyce',{},{}, {style: 'modernist', theatrics: ['experimental', 'stream of consciousness']})
        let Faulkner = C_('Faulkner',{},{}, {style: 'southern gothic', theatrics: ['tragic', 'haunting']})
        let Woolf = C_('Woolf',{},{}, {style: 'feminist', theatrics: ['intimate', 'psychological']})
        let Ginsberg = C_('Ginsberg',{},{}, {style: 'beat', theatrics: ['rebellious', 'spontaneous']})
        let Kerouac = C_('Kerouac',{},{}, {style: 'beat', theatrics: ['wandering', 'energetic']})
        let Burroughs = C_('Burroughs',{},{}, {style: 'Cut-up Technique', nationality: 'American', theatrics: 'avant-garde'})
        let Rimbaud = C_('Rimbaud',{},{}, {style: 'Symbolism', nationality: 'French', theatrics: 'haunting'})
        let Baudelaire = C_('Baudelaire',{},{}, {style: 'Modernism', nationality: 'French', theatrics: 'decadent'})
    
        // create some As with authors
        let A111 = A_(A11, 'Dublin')
        i_(A111, Joyce)
    
        let A1111 = A_(A111, 'Sandymount')
        i_(A1111, Joyce)
    
        let A1112 = A_(A111, 'Malahide')
        i_(A1112, Faulkner)
    
        let A1113 = A_(A111, 'Bray')
        i_(A1113, Woolf)
        i_(A1113, Burroughs)
    
        let A112 = A_(A11, 'Paris')
        i_(A112, Joyce)
        i_(A112, Rimbaud)
        i_(A112, Baudelaire)
    
        let A1121 = A_(A112, 'Montparnasse')
        i_(A1121, Faulkner)
    
        let A1122 = A_(A112, 'Saint-Germain')
        i_(A1122, Woolf)
    
        let A113 = A_(A11, 'London')
        i_(A113, Woolf)
    
        let A1131 = A_(A113, 'Bloomsbury')
        i_(A1131, Woolf)
    
        // create a district with a writer in it
        let A1114 = A_(A111, 'Dublin City')
        i_(A1114, Joyce)
        i_(A1114, Kerouac)
        i_(A1114, Ginsberg)



        // check A.c.ip of a few of these, eg A1114's .c.ip == [1,1,1,4]
        let samp = {A113, A1114, A1111, A111}
        for (let k in samp) {
            let A = samp[k]
            let k_ipbits = k.slice(1).split('').join('.')
            let A_ipbits = A.c.ip.join('.')
            if (k_ipbits != A_ipbits) {
                throw `k_ipbits != A_ipbits: ${k_ipbits} != ${A_ipbits}`
            }
        }
        return A1114
    }
//#endregion

//#region climbing

    // multi stage o_ with named columns (~~ "o ..." io expr)
    export function o_path (A, d) {
        if (isst(d)) d = d.split('/')
        if (isar(d)) d = { path: d }
        d.path = d.path.map(pa => isst(pa) ? {t:pa} : pa)
        if (!d.path) throw "!d.path"
        // d+ with complete d.path
        let N = []
        d.grab = function (C:C,d) {
            // d have rows spreading down joins
            d.c = ex({},d.c||{})
            d.sc = ex({},d.sc||{})

            // somewhere named in path
            let pa = d.path[d.d]
            if (pa == null) throw "off path"
            let ark = pa.ark || pa.t
            d.c[ark] = d
            d.sc[ark] = C
            d.ark = ark
            d.sc.d = d

            if (!d.path[d.d+1]) {
                // only go as far as the path
                d.not = 1
                N.push(d)
            }
        }
        inlace(A, d)
        // return many d.sc of many .$ark=C (and .d=d)
        // < group by?
        return N.map(d => d.sc)
    }
    // climb A^^ til d.(for|until|before) is found
    export function o_up(A, d?) {
        // default what to look for: everything
        d ||= { inc: 1 };
        if (!d.til) {
            // only up to A.3==A2.3
            //   use d.til to include the first A.3!=A2.3
            d.until ||= AyAsuch_unsame(A, '3');
        }
        d.climb ||= Y => [Y.y.up];
        if (d.thes) {
            d.sing = 1;
            d.grab = Y => Y.sc[d.thes];
        }
        return inlace(A, d);
    }
    //   make c.til|until to keep A^^ within A.y.such in common
    export function AyAsuch_unsame (A:C,such:string) {
        return function (A2:C) {
            return A2.y[such] && A2.y[such] != A.y[such]
        }
    }
    // find C** until d.(un)til returns true
    // see also me.inlace
    // caveats:
    //  d.(un)til avoids the first thing
    //   til may d.not before grab can happen
    export function inlace (C:C,d?) {
        if (!C) throw "!C"
        d ||= {}
        if (d.z) {
            d = {...d, up:d}
            // d/d+
            d.up.z.push(d)
            d.d += 1
        }
        // starts with here (if inc)
        //  then appends from C/D+ (or what d.grab maps them to)
        //   and whatever they 
        d.N = d.inc ? [C] : []
        d.inc = 1
        d.z = []
        d.s = C
        d.d ||= 0
        d.climb ||= (C:C) => o_(C,d.qua||'z')

        // avoid returning C if we're grabbing a Cs&thing (til->not before grab)
        if (d.grab) d.N = []

        // if d.(un)til returns true, stop
        let til = d.til || d.until || d.all
        let is_top = d.d == 0
        if (til && (!is_top || d.all) && til(C,d)) {
            d.not = 1
            if (d.until) {
                // un-returning C (and avoiding middle callbacks eg grab)
                d.N = []
            }
        }

        while (1) {
            if (d.not) break

            // start to visit here
            if (d.grab) {
                let v = d.grab(C,d)
                if (v) {
                    dN_from_middle(d, v)
                }
            }

            if (d.not) break

            // onwards
            // < subtypes of climb that emit d+ (rowing)
            let climbs = d.climb(C,d) .filter(D => D)
            if (d.climbs && climbs.length) d.climbs(C,d,climbs)
            if (d.not) break
            climbs .filter(D => {
                if (!D) return
                // recurse to C/D+
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
//#endregion

