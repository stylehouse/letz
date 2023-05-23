// < comments that start with '<' are TODOs, except this one
import {ex,C_,i_,o_,VA_ip,detect_type,inlace,TheC,TheA,o_up} from '$lib/St'
//#region toCon a dumper for the A** tree
// isolate some Con** update
// < sip_dispatch compat. C.c.visit is not everything
export function toCon_reentry (C:TheC) {
    let d = {t:C.t, s:C.c.s, D:C, pretendtoplevel:1}
    let Cup = C.y.up
    if (Cup) {
        // Conz/Con
        d.upC = Cup
        // Con//Con, becomes source of C.c.d
        let upCon = o_up(C,{til:C => C.c.pi == 'Con',sing:1})
        if (!upCon) debugger
        d.up = {C:upCon}
        // let it create itself here
        // < in order (slice the rest)
        Cup.sc.z = Cup.sc.z.filter(n => n != C)
    }
    let D = C
    C = toCon(d)
    return C
}
export function toCon (d) {
    if (d.t == null) d.t = 'toCon'
    // d/d (Con//Con) emerge, then are
    d.resolving = []
    // producing C** for recursive dumper instructions: (-Con/(-Cont|-Conz))**
    toCon_newCon(d)
    let C = d.C
    

    // try to know s
    toCon_newCont(d)

    // < to "resolve $n" sets of Con//Con here, as an elegant A-ism
    // < how async+await might help this flow control schism?
    // allow the upper Con//Con to assign ressurrecta with C&Cont
    if (d.up && !d.pretendtoplevel) {
        d.up.resolving.push(d)
        return
    }
    else {
        delete d.pretendtoplevel
        // start resolving the first Con//Con
        toCon_resolve(d)

        toCon_polish(d)

    }

    return C
}
function toCon_polish (d) {
    let C = d.C
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

// d={t?,s,D?}
// producing C** for recursive dumper instructions: (-Con/(-Cont|-Conz))**
// < producing versioned C** to interpret for minimal newsup
export function inity_toCon(d) {
    inlacing(ex(d,{
        all: function (s,d) {
            toCon_newCon(d)
            let C = d.C
            // try to know s
            toCon_newCont(d)
            // we have uncovered some id for parent's race for meaning (d.up.resolve())
            // < to "resolve $n" sets of Con//Con here, as an elegant A-ism
            // < how async+await might help this flow control schism?
            // allow the upper Con//Con to assign ressurrecta with C&Cont
        },
        dlim: function (s,d) {
            // spawn children
            return toCon_newConz(d)
        },
        resolve: function (s,d,N) {
            // let names = N.map(d => d.t + (d.C.c.Cont && d.C.c.Cont.sc.Ct ? ':'+d.C.c.Cont.sc.Ct : ''))
            // console.log("seen "+d.t+": "+names.join("\t"))
            let C = d.C
            let D = d.D
    
            DCresolve({D,C,til:C => C.c.pi == 'Con'})
            // export to d.D what they (Con//Con) resolved to
            N.map(d => {
                d.D = d.C.y.D
            })
        }
    }))
    toCon_polish(d)
    return d.C
}
// route d to act
// < wind turbine grant
function inlacing(d) {
    d.cv ||= 0
    if (d.cv == 0)
        return inity_inlace1(d)
    if (d.spawning?.length)
        return inlacing(d.spawning.shift())
    if (d.cv == 1)
        return inity_inlace2(d)
    if (d.cv == 2)
        return inity_inlace3(d)
    if (d.resolving?.length)
        return inlacing(d.resolving.shift())
    if (d.cv == 3)
        return d.up ? inlacing(d.up) : d
}
function i_spawning(d,dd) {
    // idbit dd={t,s}, inherit d.*
    dd = ex(ex({},d),dd)
    dd.up = d
    // non-inheritables
    delete dd.spawning
    delete dd.resolving
    delete dd.cv
    d.z.push(dd)
    dd.d++
    let N = d.spawning ||= []
    N.push(dd)
}
// spawning
function inity_inlace1(d) {
    console.log(new Array(d.d||0).fill('  ').join('')+d.t+"@"+d.cv)
    if (d.t == null) d.t = 'toCon'
    d.z = []
    // non-toplevel are already d.d++ by i_spawning()
    d.d ||= 0

    // ...
    d.all && d.all(d.s,d)

    d.cv = 1
    // put d/d one behind: d%steptwo/d%stepone
    //  ie, after children are stepone, steptwo the parent
    //   creating a time when children slightly known
    //    for the parent to give them all advice
    //     eg to assign a past life, see resolve $n
    if (d.resolve && d.up && !d.pretendtoplevel) {
        // all children must have already sprung from d.up or they will inherit .resolving
        let N = d.up.resolving ||= []
        N.push(d)
        // return to d.up after spawn + all
        return inlacing(d.up)
    }
    // take this to step 2
    // < could go wide on spawning: d.up||d
    //    not safe 
    return inlacing(d)
}
// manying -> more spawning
function inity_inlace2(d) {
    console.log(new Array(d.d||0).fill('  ').join('')+d.t+"@"+d.cv)
    while (1) {
        if (d.not) break

        // d.grab...

        // onwards

        // d.climb... .map(s => inlace(s,d))
        // d.dlim emits d+ (rowing)
        if (d.dlim) {
            let M = d.dlim(d.s,d) || []
            for (let dd of M) {
                i_spawning(d,dd)
            }
        }

        break
    }
    d.cv = 2
    // we may be distracted by d.spawning
    return inlacing(d)
}
function inity_inlace3(d) {
    console.log(new Array(d.d||0).fill('  ').join('')+d.t+"@"+d.cv)
    // glance d/d*@1
    d.resolve && d.resolve(d.s,d,d.resolving||[])

    d.cv = 3
    // now we have d.resolving[d+]
    return inlacing(d)
}



// glances at patches of the field (d/d)
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

//#region DC
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
                // never happens
                console.log("!D|el: "+printaC(C))
                return
            }
            let wakey = (el:number,Co) => {
                C.c.el = el
                wake.push(Co||C)
            }
            if (C.c.removals) {
                // C/* need to vanish
                wakey(8)
            }
            // compare data
            //if (C.sc.Ct == 'oyce') debugger
            if (!heq(capture_sc(D.sc),capture_sc(C.sc))) {
                wakey(3)
            }
            if (0 && !heq(D.c.ip,C.c.ip)) {
                // when it moves around
                // < isolate change to Con:branch moving up in the list (to 1.2.2)
                //    not affecting all children... if they only say ip bit?
                //   mapping D ip space to C ip space...
                //console.log(printaC(D)+"\n"+printaC(C))
                wakey(4)
            }
        }
    })
    inlace(C,{
        all:(C,q) => {
            visit.push(C)
            //if (C.t == 'A') console.log("Given:\n"+threelevelprint(C))
        }
    })

    let byip = {}
    wake.map(C => byip[C.c.ip.join('.')] = C)
    let pile = Object.keys(byip).sort().map(k => byip[k])

    // console.log("Wake:\n"+pile.map(C => new Array(C.c.ip.length).fill('  ').join('')+printaC(C)).join("\n"))
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
                // C.c.pi == 'Con'
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
// < translate this into io, would be a lot easier
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
            if (d.pretendtoplevel) {
                let D = d.D
                C.y.D = D
                C.c.ip = D.c.ip.slice()
            }
            else {
                VA_ip(parent,C)
            }
        }
        if (d.C == C) {
            // list of all the main type of node (eg -Con)
            d.visit ||= []
            d.visit.push(C)
        }
        return C
    }
}
//#endregion


// producing new C** -Con
function toCon_newCon (d) {
    let s = d.s
    // handles creating C** once told the scheme
    d.partor ||= DCpartor('Con')
    let C = d.partor(d.t,'Con',{s})
    
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
    if (typ.unk) {
        // null or something?
        say = ''+s
        Cont.sc.unk = 1
    }

    ex(Cont.sc,{t,sym,Ct,say})
}
// new -Con/-Conz listing s/*
function toCon_newConz (d) {
    let s = d.s
    let Con = d.C
    let D = Con.y.D
    if (D && D.c.boost) Con.c.boost = D.c.boost
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
        let dd = {up:d,upC:Conz,t,s}
        // they put -Conz/-Con*
        if (d.resolve) {
            nodules.push(dd)
        }
        else {
            toCon(ex(ex({},d),dd))
        }
    }
    return nodules
}
//#endregion



//#region sip dispatch

import {onDestroy, getContext, setContext} from 'svelte'
import {writable} from 'svelte/store'

// receive updated version of C inside cb(C) { ...assign somewhere to cause svelte update }
export function sip_wiree (C,cb) {
    return
    let sip = C.c.ip.join('.')

    // defines this interface on the C for sip dispatch
    C.y.dispatch = v => cb(v)
    
    let wire = getContext(sip)
    if (!wire) {
        // < why? creating a new Con//Con can cause old Context reuse?
        C.c.unwired = 1
        //throw "unwired: "+sip
    }
    else {
        let lav
        let unsubscribe = wire.subscribe((v) => {
            if (!v) return
            lav && v.y.D != lav && console.log("wiree!D: "+sip+" got: "+v.c.version,{v,lav})
            //console.log(sip+" got: "+v.c.version)
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
    reset () {
        this.sip_C = {}
        this.sip_wire = {}
        this.newsips = {}
    }
    setN (N) {
        return
        // < and more io-friendly expressivity for these implied-coord movements
        // this is the only place to really see what has gone
        let tally = {}
        let tal = k => tally[k] = (tally[k]||0)+1
        let oldsips = {}
        let sip = C => C.c.ip.join('.')
        for (let i in N) {
            let C = N[i]
            this.newsips[sip(C)] = C
            if (C.y.D) {
                oldsips[sip(C.y.D)] = C
                tal('CyD')
            }
        }
        // < o $newsip o $sip_C
        for (let sip in this.sip_C) {
            let D = this.sip_C[sip]
            let CD = oldsips[sip]
            let C = this.newsips[sip]
            if (C && C.y.D == D) {
                // stays still, resolved
                //  dont need to create wire, only send C over it (via sync())
                delete this.newsips[sip]
                if (C != CD) debugger
                tal('stay')
            }
            else if (CD) {
                // moves, resolved
                // the C given has CyD that we know about
                //  see Conz.svelte / {#each nodules as n (n.t)}
                //   which is svelte resolving things there by the t
                //    < using a permanent ip, we might recreate if renamed at the moment?
                tal('still')
            }
            else {
                // gone or reallocated ip
                delete this.sip_C[sip]
                delete this.sip_wire[sip]
                tal('gone')
            }
        }
        // set the new C
        for (let i in N) {
            let C = N[i]
            let sip = C.c.ip.join('.')
            this.sip_C[sip] = C
            tal('tot')
        }
        //console.log("sip set",tally)
    }
    // transfer newsips to sip_wire|C
    //   the setN can occur outside time (the component updating)
    //   then setContext has to occur inside time, hence the jump #guts
    // < via Svelte::tick promise after an setN?
    sync () {
        return
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

    refreshN (N) {
        return
        for (let n of N) {
            this.o(n)
        }
    }

    o (sip) {
        let C
        if (typeof sip == 'object') {
            C = sip
            sip = C.c.ip.join('.')
        }
        let Con = this.sip_C[sip]
        if (!Con) throw "!sip: "+sip

        // send it a replacement C
        
        if (C.y.dispatch) {
            debugger
            //C.y.dispatch(Con)
        }
        //this.sip_wire[sip].set(Con)
    }
}
//#endregion