

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

// make new C, specifying innards
function C_(t: string|Array<any>|C, y?:number|gc, c?:gc, sc?:gc):C {
    if (isar(t)) {
        [t,y,c,sc] = t
    }
    if (!isst(t)) {
        // t must be C, from C_(C)
        throw "TODO clone = C_(C)"
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
    return {t,y,c,sc}
}
// A spawns A
function A_(A:A, t?:string):A {
    t ||= A.t
    let A2 = C_(t)
    // ip address (infinite position)
    A.c.ips ||= 0
    A.c.ips++
    A2.c.ip = [...A.c.ip,A.c.ips]
    // parent
    A2.y.up = A
    // A.sc.z is the way to A/A
    i_(A,A2)
    return A2
}
// put C inside C (C/C)
function i_(C1: C, C2: C, qua: string = 'z') {
    let N = C1.sc[qua] ||= []
    N.push(C2)
}
// get C inside C (C/C)
function o_(C1: C, qua: string = 'z') {
    let N = C1.sc[qua] || []
    return N
}


// type and data handling helpers
    // type checking, ported from Fividy
    function isst(s) {
        return typeof s == 'string'
    }
    function isnu(s) {
        return typeof s == 'number'
    }
    function isnum(s) {
        return (isnu(s) || s && s.length && !isspace(s)) && s*1 == s
    }
    function isar(s) {
        return s && s.constructor == Array
    }
    let spacechars = {" ":1,"\n":1,"\t":1}
    function isspace(s) {
        return hak(s) && !havs(s).some(s => !spacechars[s])
    }
    // and further back
    function hak(s,d) {
        if (!s)
            return 0
        return d == null ? Object.keys(s).length : s.hasOwnProperty(d)
    }
    function havs(s,d) {
        return haks(s).map(k => s [k])
    }
    function haks(s,d) {
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





// the main functions, mocked up
    
    // have a play
    export function St_main (): A {
        let A1 = C_('toplevel')
        A1.c.ip = [1]
        // < aren't thisn't?
        // A1:A
        let dub = St_writers(A1)

        // make A1.sc.mind=Cmind /Cthing/Cact
        St_minds(A1)

        // walk the A** tree with the mind
        St_walkies(dub)
        
        return A1
    }
    
    // walk the A** tree with the mind
    function St_walkies (A) {
        // o A^%mind (the to return a singular %mind above, not an array)
        let mind = o_up(A,{thes:'mind'})
        let branch = o_up(A)
        // TODO the nearest mind is branched out to index happenings for us here
        //   so various walkies can be reset, etc.
        // TODO interate mind


        console.log({mind,branch})
    }

    // construct a one-trick mind
    function St_minds (A1:A) {
        let mind = C_('mind')
        let thing = C_('wear')
        let act = C_('act',3)
        i_(mind, thing)
        i_(thing, act)
        act.c.code = function (A,C,G,T) {
            // knock a letter off anywhere
            let i = Math.floor(Math.random()*C.t.length)
            let t = C.t
            let t2 = t.slice(0,i) + t.slice(i+1)
        }
        A1.sc.mind = mind
    }

    // climb A^^ til c.(for|until|before) is found
    function o_up (A,c) {
        // default what to look for: everything
        c ||= {inc:1}
        if (!c.til) {
            // only up to A.3==A2.3
            //   use c.til to include the first A.3!=A2.3
            c.until ||= AyAsuch_unsame(A,'3')
        }
        c.climb ||= Y => [Y.y.up]
        if (c.thes) {
            c.sing = 1
            c.grab = Y => Y.sc[c.thes]
        }
        return o_climbing_while(A,c)
    }
    //   make c.til|until to keep A^^ within A.y.such in common
    function AyAsuch_unsame (A:C,such:string) {
        return function (A2:C) {
            return A2.y[such] && A2.y[such] != A.y[such]
        }
    }
    // find C** until c.(un)til returns true
    // see also me.inlace
    function o_climbing_while (C:C,c,qua:string = 'z') {
        c ||= {}
        c.climb ||= (C:C) => o_(C,qua)
        
        // this is lexical to this visit, but so c.not can be reached from callbacks
        c.not = 0
        // list of stuff here (tends not to c.inc-lude the first C)
        let N = c.inc ? [C] : []
        c.inc = 1
        // avoid returning C if we're grabbing a Cs&thing (til->not before grab)
        if (c.grab) N = []

        // if c.til is true, stop
        let til = c.til || c.until
        if (til && til(C)) {
            c.not = 1
            if (c.until)
                N = []
        }
        if (c.not) {
            return N
        }

        // start to visit here
        if (c.grab) {
            let v = c.grab(C)
            if (v) {
                if (c.sing) {
                    return v
                }
                else {
                    if (!isar(v)) throw "!array"
                    N.push(...v)
                }
            }
        }

        // onwards
        c.climb(C,c) .filter(D => {
            if (!D) return
            // recurse to D:C/*:D
            let zN = o_climbing_while(D,c,qua)
            if (c.sing) {
                N.push(zN)
            }
            else {
                if (!isar(zN)) throw "!array"
                N.push(...zN)
            }
        })

        return c.sing ? N[0] : N
    }

    function St_writers (A1) {
        let A11 = A_(A1,'Earth')
    
        // create some Cs for authors
        let Joyce = C_('Joyce',{},{}, {style: 'modernist', theatrics: ['experimental', 'stream of consciousness']})
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