import {ex,C_,i_,o_,VA_ip,detect_type} from '$lib/St'
//#region toCon a dumper for the A** tree
export function toCon (s,d) {
    if (d.t == null) d.t = 'toCon'
    // producing C** for recursive dumper instructions: (-Con/(-Cont|-Conz))**
    let C = toCon_newCon(s,d)
    
    // < all C.c.ip for getContext-ing
    // < comparing to D from last time
    // < producing versioned C** to interpret for minimal newsup

    // try to know s
    toCon_newCont(s,d)
    // and s/* beyond, recursing back to toCon in here
    toCon_newConz(s,d)

    // a list of all -Con
    if (!d.up) {
        C.c.visit = d.visit
        // give them all an incrementing version
        // < individuated by changes
        let D = d.D
        let version = (D && D.c.version || 0) + 1
        for (let Co of d.visit) {
            Co.c.version = version
        }
    }

    return C
}
// defines an adder of d.C or its C.c.$pi=C/*
function DCpartor (nodepi) {
    // arrow functions don't provide their own this binding
    return function (t,pi,c) {
        // compat: this is the current d where this function is called
        let d = this
        pi ||= t
        let C = C_(t,1,{pi})
        if (c) ex(C.c,c)

        // what we turn out to be inside of:
        let parent

        // in eg toCon_newCon(),
        // the -Conz immediately above this -Con
        //  bit of a hack, upC is set in the new d spawned in toCon_newConz()
        //  < rowing providing the latest upC (last nodepi column), a kind of slope
        let upC = d.upC
        // the -Con above this -Con
        let upCon = d.up?.C

        if (pi == nodepi) {
            // is the main (stable|normal) type of node
            d.C = C

            // inside here
            if (upC) {
                // eg -Con/-Conz:upC/-Con:C
                parent = upC
            }

            // depth++
            if (upCon) {
                // eg -Con:upCon/-Conz/-Con:C
                if (upCon.c.pi != nodepi) throw "!nodepi"
                C.c.d = upCon.c.d + 1
            }
            else {
                C.c.d = 0
            }
        }
        else {
            // supposing only one of each pi
            d.C.c[pi] = C
            parent = d.C
        }
        
        if (parent) {
            // C** as in C%z += C
            i_(parent,C)
            C.y.up = parent
        }
        if (!parent) {
            // here's the root
            if (C.c.d !== 0) throw "whatd"
            C.c.ip = [1]
        }
        if (parent) {
            // C** as ip, a different network to A.c.ip
            if (!parent.c.ip) throw "!ip"
            VA_ip(parent,C)
        }
        if (d.C == C) {
            // list of all the main type of node (eg -Con)
            d.visit ||= []
            d.visit.push(C)
        }
        return C
    }
}
// producing new C** -Con
function toCon_newCon (s,d) {
    // handles creating C** once told the scheme
    d.partor ||= DCpartor('Con')
    let C = d.partor(d.t,'Con',{s})
    return C
}
// new -Con/-Cont detailing s
function toCon_newCont (s,d) {
    let Con = d.C
    let Cont = d.partor('Cont')

    // from the way in:
    let t = Con.t
    // now all about this item:
    let typ = d.typ = detect_type(s)
    let sym = typ.bracket || typ.sym
    let Ct
    if (typ.Cish) {
        // < sometimes we avoid stating this if == t
        Ct = s.t
    }

    let say
    if (typ.num || typ.str || typ.bool) {
        say = s
        if (typ.str) say = '"' + say + '"'
    }

    ex(Cont.sc,{t,sym,Ct,say})
}
// new -Con/-Conz listing s/*
function toCon_newConz (s,d) {
    let Con = d.C
    let typ = d.typ
    // mix up an esteem for more
    let depth = Con.c.d || 0
    let boost = Con.c.boost || 0
    let early = typ.Cish && depth < 2 || typ.iter && depth<3
    let boots = (early ? 1 : 0) + boost
    if (!boots) return

    // -Con/-Conz/*
    let Conz = d.partor('Conz')

    let nodules = []
    let N = typ.iter ? s
        : typ.Cish ? o_(s)
        : []
    for (let [t,s] of Object.entries(N)) {
        let dd = ex(ex({},d),{up:d,upC:Conz,t,s})
        // they put -Conz/-Con*
        toCon(s,dd)
    }
}
//#endregion



//#region sip dispatch

import {setContext} from 'svelte'
import {writable} from 'svelte/store'

export class sip_dispatch {
    constructor () {
        this.reset()
        this.sip_C = {}
        this.sip_wire = {}
        this.newsips = {}
    }
    addN (N) {
        for (let C of N) {
            let sip = C.c.ip.join('.')

            // to find the current version of C by sip
            this.sip_C[sip] = C

            // make connector to other -Con
            if (this.sip_wire[sip]) continue
            this.newsips[sip] = C
        }
    }
    // transfer newsips to sip_wire|C
    // < via Svelte::tick promise after an addN?
    //   the addN can occur outside time (the component updating)
    //   then setContext has to occur inside time, hence the jump #guts
    sync () {
        let added = []
        for (let [sip, C] of Object.entries(this.newsips)) {
            let wire = this.sip_wire[sip] = writable(0)
            // allow **-Con to find their wires
            setContext(sip, wire)
            added.push(sip)
        }
        if (added.length) {
            console.log("sip sync + "+added.join(','))
            this.version ||= 0
            this.version++
            setContext("sipversion", this.version)
        }
        this.newsips = {}
    }

    o (sip) {
        let Con = this.sip_C[sip]
        if (!Con) throw "!sip: "+sip
        console.log("Vass"+Con.c.version)
        // send it a replacement C
        this.sip_wire[sip].set(Con)
    }
    reset () {
        this.sip_C = {}
        this.sip_wire = {}
        this.newsips = {}
    }
}