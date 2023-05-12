import {ex,C_,i_,o_,VA_ip,detect_type,inlace,TheC,TheA} from '$lib/St'
//#region toCon a dumper for the A** tree
export function toCon (d) {
    if (d.t == null) d.t = 'toCon'
    // d/d (Con//Con) emerge, then are
    d.resolving = []
    // producing C** for recursive dumper instructions: (-Con/(-Cont|-Conz))**
    toCon_newCon(d)
    let C = d.C
    
    // < all C.c.ip for getContext-ing
    // < comparing to D from last time
    // < producing versioned C** to interpret for minimal newsup

    // try to know s
    toCon_newCont(d)

    // < to "resolve $n" sets of Con//Con here, as an elegant A-ism
    // < how async+await might help this flow control schism?
    // allow the upper Con//Con to assign ressurrecta with C&Cont
    if (d.up) {
        d.up.resolving.push(d)
        return
    }
    else {
        // start resolving the first Con//Con
        toCon_resolve(d)
        // now all C may have .y.D previous self
        // difference everything, including notifying parents of gone children
        let diff = DCdiffer(C)


        // a list of all C**
        C.c.visit = diff.visit
        C.c.wake = diff.wake
        // give them all an incrementing version
        // < individuated by changes
        let D = d.D
        let version = (D && D.c.version || 0) + 1
        for (let Co of C.c.visit) {
            Co.c.version = version
        }

    }

    return C
}
function toCon_resolve (d) {
    // and s/* beyond, each recursing -> toCon
    toCon_newConz(d)
    // then they, just before doing that themselves, are here:

    if (1 || d.resolving.length) {
        let names = d.resolving.map(
            d => d.t + (d.C.c.Cont && d.C.c.Cont.sc.Ct ? ':'+d.C.c.Cont.sc.Ct : '')
        )
        //console.log("seen "+d.t+": "+names.join("\t"))
        
        let C = d.C
        let D = d.D

        DCresolve({D,C,til:C => C.c.pi == 'Con'})
        // export to d.D what they (Con//Con) resolved to
        d.resolving.map(d => {
            d.D = d.C.y.D
        })
    }

    // now we have d.resolving[d+]
    for (let dd of d.resolving) {
        toCon_resolve(dd)
    }
}

function DCdiffer (C) {
    // list of everything, to update sip_dispatch
    let visit = []
    let wake = []
    inlace(C,{
        all:(C,q) => {
            let uC = C.y.up
            let D = C.y.D
            if (C.c.el) {
                // can only have el=2 already, meaning new
                // wake new things parent (usu -Conz)
                wake.push(uC || C)
                // look no further
                return 1
            }
            if (!D) {
                console.log("!D|el: "+printaC(C))
                return
            }
            if (C.c.removals) {
                // C/* need to vanish
                C.c.el = 8
                wake.push(C)
            }
            // compare data
            //if (C.sc.Ct == 'oyce') debugger
            if (!heq(capture_sc(D.sc),capture_sc(C.sc))) {
                C.c.el = 3
                wake.push(C)
            }
        }
    })
    inlace(C,{
        all:(C,q) => {
            visit.push(C)
            //if (C.t == 'A') console.log("Given:\n"+threelevelprint(C))
        }
    })

    console.log("Wake:\n"+wake.map(C => printaC(C)).join("\n"))
    return {visit,wake}
}
function heq(s,c) {
    return Object.keys(s).length == Object.keys(c).length
        && !Object.keys(s).some(k => s[k] != c[k])
}
function capture_sc(s:Object) {
    let h = {}
    for (let k in s) {
        if (k == 'z') continue
        let v = s[k]
        if (v && typeof v == 'object') {
            if (v instanceof TheC) continue
        }
        h[k] = v
    }
    return h
}

// the q pile visits all C**, wrt D**
//  including C between those in the d pile (which are only the -Con)
function DCresolve (c) {
    inlace(c.C,{
        all:(C,q) => {
            if (q.d == 0) {
                // d.D -> C.y.D, a given fact
                //  given from resolving or simply an other branch (eg last time of toCon)
                C.y.D = c.D
            }
            else if (c.til) {
                if (c.til(C,q)) q.not = 1
            }
        },
        climbs:(C,q,N) => {
            let D = C.y.D
            if (!D) return C.c.el = 2
            // D options (past), C given
            let Dtz = i_tz(o_(D))
            let Ctz = i_tz(N)
            // have all t in Dtz
            for (let t in Ctz) {
                Dtz[t] ||= []
            }
            for (let t in Dtz) {
                let Dz = Dtz[t] || []
                let Cz = Ctz[t] || []
                let Do = Dz.shift()
                let Co = Cz.shift()
                if (Do && Co) {
                    // continuation
                    Co.y.D = Do
                }
                else if (Co) {
                    // coming - it will have no .y.D
                    //  so the rest of q will just C.c.el = 2 everything
                }
                else if (Do) {
                    // going - tell most recent still-present thing
                    C.c.removals ||= []
                    C.c.removals.push(Do)
                }
                !Dz.length && delete Dtz[t]
                !Cz.length && delete Ctz[t]
            }
            Object.keys(Dtz).length && console.log("Dtz left: "+Object.keys(Dtz).join(','))
            Object.keys(Ctz).length && console.log("Ctz left: "+Object.keys(Ctz).join(','))
        }
    })
}
// indexes a list of C by their .t
function i_tz (N) {
    let tz = {}
    for (let C of N) {
        let t = C.t
        tz[t] ||= []
        tz[t].push(C)
    }
    return tz
}
function threelevelprint (C) {
    if (!C) return "null"
    let N = []
    inlace(C,{all:(C,d) => {
        let uC = d.up?.s
        let indent = new Array(d.d).fill('  ').join('')
        N.push(indent + printaC(C,uC))
        if (d.d > 2) return 1
    }})
    return N.join("\n")
}
function printaC (C,uC) {
    let sip = C => C.c.ip ? C.c.ip.join('.') : ''
    let sipdom = uC && sip(uC)
    let sipsay = sip(C)
    if (sipsay && sipdom && sipsay.startsWith(sipdom)) sipsay = sipsay.slice(sipdom.length)
    if (C.c.el) sipsay += " el="+C.c.el
    if (C.c.removals) {
        sipsay += " --"+C.c.removals.map(C => C.t).join(',')
    }
    let scsay = C.sc.Ct ? "%Ct="+C.sc.Ct : ''
    if (C.y.D) scsay += '%D'

    return C.t+"\t-"+C.c.pi+"\t"+sipsay+"\t"+scsay
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
function toCon_newCon (d) {
    let s = d.s
    // handles creating C** once told the scheme
    d.partor ||= DCpartor('Con')
    d.partor(d.t,'Con',{s})
}
// new -Con/-Cont detailing s
function toCon_newCont (d) {
    let s = d.s
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
        say = ''+s
        if (typ.str) say = '"' + say + '"'
    }

    ex(Cont.sc,{t,sym,Ct,say})
}
// new -Con/-Conz listing s/*
function toCon_newConz (d) {
    let s = d.s
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
        toCon(dd)
    }
}
//#endregion



//#region sip dispatch

import {onDestroy, getContext, setContext} from 'svelte'
import {writable} from 'svelte/store'

// receive updated version of C inside cb(C) { ...assign somewhere to cause svelte update }
export function sip_wiree (C,cb) {
    let sip = C.c.ip.join('.')
    
    let wire = getContext(sip)
    if (!wire) {
        // < why? creating a new Con//Con can cause old Context reuse apparently...
        C.c.unwired = 1
        //throw "unwired: "+sip
    }
    else {
        let unsubscribe = wire.subscribe((v) => {
            if (!v) return
            console.log(sip+" got: "+v.c.version)
            cb(v)
        });
        onDestroy(() => {
            unsubscribe()
        });
    }
}

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
            let names = added.length > 6 ? "x"+added.length : added.join(',')
            console.log("sip sync + "+names)

            this.version ||= 0
            this.version++
            setContext("sipversion", this.version)
        }
        this.newsips = {}
    }

    o (sip) {
        if (typeof sip == 'object') sip = sip.c.ip.join('.')
        let Con = this.sip_C[sip]
        if (!Con) throw "!sip: "+sip
        // send it a replacement C
        this.sip_wire[sip].set(Con)
    }
    reset () {
        this.sip_C = {}
        this.sip_wire = {}
        this.newsips = {}
    }
}