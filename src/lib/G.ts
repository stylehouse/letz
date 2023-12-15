
import type { SvelteComponent } from 'svelte';
import { get_current_component, tick, setContext,getContext } from 'svelte/internal';

import { ac, ahsk,ahk,hak,haks,havs, dec,dig, sha256,sex,ex,ex2,now,grep,grop,map,sum,arbowa,hashkv,flatten,fatal,heq,reverse } from "$lib/Y/Pic.ts"
import { pit,C_,i_,o_,pito,o_path,o_up,inlace } from "$lib/St"
import {enL,deL,indents} from "$lib/Y/Text"

# f
    # s^^^ -> a/pa/th
    function slupath(s,d) {
        # < d.til?
        return o_up(s).reverse().map(s => s.t).join("/")
    }

# < GOING? these are A
# *.svelte do: g = G()
    export function G(t, co) {
        co ||= get_current_component()
        $g = co.G
        
        # failed permanence.
        # < having Record take its C from something else we can keep across HMR...
        #   it should pull...
        if (g) {
            console.log("rediscovered G:"+g.name)
            g.co != co and debugger
            g.embedSlope()
            return g
        }
        else {
            $fo = getContext('G:4')
            $g = fo && fo.t_G && fo.t_G[co.constructor.name]
            if (g && 0) {
                # < possibly if we can g.i(g.C) them in a moment...
                #   strange. breaks.
                console.log("Re G:"+g.name)
                #g.co != co and debugger
                g.co = co
                g.embedSlope()
                return g
            }
            
        }
        
        g = new TheG(t, co);

        # vite doing SSR != live
        $live = import.meta.env.SSR === false
        g.notlive = !live
        # live and console.log('G:' + t + ' ', g);

        return g;
    }
    export class TheG {
        
    constructor(t, co) {
        this.t = t
        this.name = co.constructor.name
        this.co = co
        this.t_G = {}
        this.embedSlope()
    }
    embedSlope() {
        # make discoverable to /**
        setContext('G:' + this.t, this);
        this.slope = {};
        this.slope[this.t] = this;
        # find others
        this.resolveSlope()
        # make discoverable to /^^
        this.introductions()
    }
    resolveSlope() {
        let t = this.t * 1;
        let first = true;
        while (t < 5) {
        t++;
        const g = getContext('G:' + t);
        if (!g) continue;
        
        this.slope[t] = g;
        
        if (first) {
            first = false;

            this.up = g;
        }
        }
    }
    # index by name
    introductions() {
        $g = this.up ?? this
        # look up our name
        #  in one who might also be resurrecting from old_G
        $og = g.t_G[this.name] || g.old_G?.t_G[this.name]
        if (!this.up && !this.notlive) {
            # the top one remembers itself as a global variable
            if (!og) {
                og = navigator['G:' + this.t]
            }
            navigator['G:' + this.t] = this
        }
        if (og) {
            this.old_G = og
            delete og.old_G
        }
        g.t_G[this.name] = this
    }
    # look up name
    find_name(name) {
        $g = this.up || this
        return g.t_G[name]
            # or try at /^ ie this.up ie g
            || g != this && g.find_name(name)
    }

# g.haveC, send*, I_am, g.i|o
    # these functions show permanent features of the component to the g
    #  which is fast becoming just a suite of functions

    # showing C to g
    haveC(C,setC) {
        # they have a C
        this.C = C
        # they can react the component to a new C
        this.i(setC)
        this.notlive and return
        # make this recoverable after HMR that might recreate the component
        if (this.old_G) {
            console.log("Recovering olde C:"+this.name)
            this.C = this.old_G.C
            # < should we tick()?
            this.input_to(this.C)
        }
    }

    # we host things for others

    # we are basically discoverable, eg t=storage
    I_am(t) {
        let storages:Array<TheG> = getContext(t)
        while (storages.shift()) 1
        storages.push(this)
    }
    # look up name
    _who_is(t) {
        let to = getContext(t)[0]
        !to and throw "G.send no such to: "+to
        return to
    }

    # we give things to others (who have defined g.receive)
    # eg Diring C -> Record via t=storage (an alias)
    send(t) {
        # vite doing SSR shouldnt get here
        this.notlive and return;
        #throw "G.send while not live: "+this.name
        $to = this._who_is(t)
        # Record hosts us
        $guest = to.receive(this)
        !guest and throw "!guest"
        # Diring remember the guest Record made for them
        #  see also Dome / &etos_6
        ahk(this,'sent_guest',to.name,guest)
    }
    # we may be called at the end of Construct()
    send_places() {
        $This = this
        each name,guest This.sent_guest {
            guesty&compute && guesty&compute()
        }
    }


    # they define reactive callbacks for:
    # changing the C they started with
    i(y) {
        this.input_to = y
    }
    # giving them the D they result in
    o(y) {
        this.output_to = y
    }

}




# Recollect Reco <- guest ...
    # Rec.svelte may be given Record/in/$guest-Rec
    # g is Record, and it is Construct()ing around this:
    export async function Recollect(g,s) {
        $This = sc&This
        $C = This?.C || s
        # always encode the latest thing (working dir state -> staging)
        $Reco = await mkReco(C)
        # pool it in sy&collect/-Reco, picking one to be now
        Reco = electReco(s,Reco)
        s.y.Reco = Reco

        # tell Record that it has an s ready
        g.o_done(s)
        # went via component for no reason
        # g.output_to(Reco)
    }

    # Reco = print C**
    async function mkReco(C) {
        $topK
        $encode = (C,d) => {
            # C cloning, compressing and encoding
            #  in eg C:"treeh $i"/C:Diring%dige are needed to look up that version of C:Diring

            # clone the C** into K**
            $K = C_(C.t,C.y.cv)
            ex(K.c,C.c)
            ex(K.sc,C.sc)
            # we reinput /*
            delete Ks&z
            d.K and i_(d.K,K)
            d.K = K
            topK ||= K
            
            # the usual K compressions...
            K.y = K.y.cv ? {cv:K.y.cv} : {}
            # < maybe any C in K.*.*, maybe any ref in K.c...

            # encode Lines
            $L = enL(K)
            K.y.string = L
            K.y.d = d

            # indentedly joining these
            return L
        }
        $string = inlace(C,{
            grab: (C,d) => indents(d.d*2, encode(C,d), 'notailnl'),
        }).join("\n")
        !topK and debugger

        $dige = await sha256(string)

        # < Betime could rename these better than 'a'
        $Reco = C_('a','-Reco',{},{string,dige})
        # also, have an immutable copy of it all
        Recos&z = [topK]

        return Reco
    }
    # multiple Reco compete for use
    # < the Reco+ and kommit|been/* serial-numbered lists
    #    are the same things. see Recolink_stillness
    function electReco(s,Reco) {
        # staging and recent states pool in N[Reco]
        # < s says it wants something else reset to, for undo
        #    git work via s, who might show all Reco?
        #    they want naming intelligently wrt the diff, enclosing headings etc...
        $co = s.y.collect ||= C_('collect','-Recollector')
        
        $latest = o_(co).slice(-1)[0]
        if (latest && latests&dige == Recos&dige) {
            # same, recycle object
            Reco = latest 
        }
        else {
            Recos&time = now()
            i_(co,Reco)
            ahk(co,'y','Reco_by_dige',Recos&dige,Reco)
        }
        return Reco
    }
    # Reco download to a C that hosts them 
    #  sto should be deleted by Recolink pushing news
    export function Recolink(guest,Reco,s) {
        guest.y.be = s
        guest.sc['░'] != Recos&dige and delete guesty&store
        guest.sc['░'] = Recos&dige
        guest.y.string = Recos&string
    }
    # "same, recycle object" for bloube/:guest
    export function Recolink_stillness(guest,Reco) {
        return guest?.sc['░'] == Recos&dige
    }
    # "same, recycle object" for kommit|been/* serial-numbered lists
    # for when you will later Recolink(guest,Reco) if ~
    export function host_Recolink_stillness(host,Reco) {
        $la = o_(host).slice(-1)[0]
        return la?.sc['░'] == Recos&dige
    }

# Aroundiness
    # note: things compile: '$N =' -> 'var N =', '...and...' -> 'if(...) { ... }'
    # a picture looking back through kommit:s/**
    # < when to make sure everything is stored
    export function Aroundiness(g,s) {
        # tumble down s/* and sy&be=s@origin
        #  looking back through the i ... that advanced it
        $links_by_depth = {}
        $deps_by_dige = {}
        $N = inroundce(s,{
            a_link: &sd{
                # collect all storables
                ahk(links_by_depth,[d.d],s)

                # track dependencies
                d.was_link = d
                $dependant = d.up?.was_link?.s
                if (dependant) {
                    # by the time we fine this, s should be stored anyway
                    #  the schema has that ipfs_in joint
                    $dige = dependant.sc['░']
                    ahk(deps_by_dige,[dige],s)
                }
            },
            climbs: &sdN{
                # do only the latest /been/Arounding
                d.d == 0 and N.splice(0,hak(N)-1)
            }
        })
        # deepest layers first
        $layers = reverse(havs(links_by_depth))
        # go async
        Around_layers(g,s,layers,deps_by_dige)

        # < drive an event now

        $by_path = map(N => hashkv(N.map(s => [slupath(s), s])), layers)
        return {deps_by_dige,layers}
    }
    # asyncily PUT each layers of requests
    async function Around_layers(g,s,layers,deps_by_dige) {
        each iN layers {
            $waits = map(s => upload_to_ipfs(s,deps_by_dige), N)
            await Promise.all(waits)
            # < handling errors?
        }
        g.o_done(s)
    }

    # tumble down s/* or sy&be=s@origin
    #  the latter are given to d.a_link()
    function inroundce(s,d) {
        fatal.isC(s)
        !d.a_link and debugger
        # tumble down s/* and sy&be=s@origin
        return inlace(s,{
            ...d,
            # include the first node, s|kommit
            inc:1,
            climb: &sd{
                # they sy&be=s@origin and s%░
                $linkish = sum(sy&be && 1, s.sc['░'] && 1)
                $z = o_(s)
                if (linkish) {
                    hak(z) and debugger

                    d.a_link and d.a_link(s,d)

                    # go to its origin
                    return [sy&be]
                }
                # have a This at the end our link trail
                if (sc&This) {
                    hak(z) and debugger
                    return []
                }
                # nothing but links and lists of links
                !hak(z) and debugger
                return z
            }
        })
    }
    
    # < cause async flickering in the uploading -Rec
    # < then come back here (a Promise group?)
    async function upload_to_ipfs(s,deps_by_dige) {
        # create|get|check sy&store
        $sto = store_init(s)

        stos&ok and return
        
        let t = stos&dige
        let para = {t}

        # check deps
        $deps = deps_by_dige[stos&dige]
        if (deps) {
            $ready = []
            $diges = []
            $unready = grep(z => {
                $zto = zy&store
                if (zto && ztos&ok) {
                    ready.push(zto)
                    diges.push(ztos&dige)
                }
                else return 1
            },deps)
            # updating faster than storage gets ready can get you here
            # < hmm we are probably not supposed to happen anymore?
            if (hak(unready)) {
                console.log("unready to "+s.t+" "+t+": ",
                    unready.map(n => n.t+" "+n.sc['░']))
                return
            }
            # make (s)/sto** (no y&up)
            stos&z = ready
            # as a URI z becomes comma-separated, server must know this means array
            # < didnt it used to make multiples? eg [1,2] -> ?z=1&z=2
            para.z = diges
        }

        # console.log("upload_to_ipfs: ",para)
        para.body = stos&string
        await store_send(para,s,sto)
    }
    function store_init(s) {
        $sto = sy&store ||= C_('store '+s.t)
        # what we copy from s%*
        $ons = {dige:s.sc['░'],string:sy&string}

        # checks:
            # check sto%dige,string are same
            #  we may be repeating this (from Aroundiness)
            #  sto should be deleted by Recolink pushing news
            $onsto = sex({},sto.sc,haks(ons))
            hak(onsto) && !heq(ons,onsto) and debugger
        
            # the server checks the given dige (called t in the PUT handler) is for the string
        
        ex(sto.sc,ons)
        return sto
    }
    async function store_send(para,s,sto) {
        # < global fetch queue? getContext a proxy, see g-j / R%Inn
        #  < testable calls to ipfs|sessionStorage
        $body = delete para.body
        let params = new URLSearchParams(para);

        let res = await fetch(
            `/ipfs?${params.toString()}`,
            {method:'POST',body}
        )

        if (res.ok) {
            delete stos&errors
            stos&ok = 1
        }
        else {
            # res doesn't .hasOwnProperty() all its info, peel it with map()
            res = sex({res},map(n=>n,res),'status,statusText')
            ahk(sto.sc,['errors'],res);
            debugger
        }
        # storage may get ready before Rec.svelte reacts to having this bit of Record/**
        #!sy&wake and debugger
        # 1 makes this not Construct
        sy&wake && sy&wake(1)
    }

# Betime, the UI functions
    # Record B/items|times** iterates here (at do_Pi_early) 
    export function Betime({C,s,d,items,times}) {
        # < inheritable C%somethings, targeting
        # the -Kom/s-Kom
        let uC = C.y.up?.c.Kom
        let us = s.y.up
        # switch planes
        let beof = (s) => fatal.isC(s.y.be)
        if (times == us) {
            # arbowa: finds one us/* before s, works on arrays or C
            let prev = arbowa(us,s)
            if (prev) {
                # to the previous (parent commit)

                # time difference
                # times/*%delta = pairwise *//@be%time 
                let pair = grep(map(s => beof(s).sc.time, [prev,s]))
                if (pair[0] && pair[1]) {
                    s.sc.delta = dec(pair[0] - pair[1],0)
                }

                # text difference
                # times/*%diff = pairwise *(//@be)+:treeh/**(//@be)+:bloub
                $Recotreeh = Recolink_lookup(sy&be)
                $RecobloubeN = Recolink_discovery(Recotreeh)
                sc&look = Recotreeh
                return

                $bloubesof = (s) => {
                    $Recotreeh = Recolink_lookup(sy&be)
                    $RecobloubeN = Recolink_discovery(Recotreeh)
                        .map(link => Recolink_lookup(link))
                    return RecobloubeN
                }
                $a = bloubesof(prev)
                $b = bloubesof(s)
                # .t union these...
                a = map((s) => {
                    $other = theone(grop(z => z.t == s.t,b))
                    return [a,other]
                },a)
                a.push(...b)
                sc&look = a

                
                # < look up this version in treeh//@collect/* ?
                #   that should be a clone+encode of treeh
                #    to capture the version of Diring
                #    ~~ A:K (or a C:K?) used to be the copy coming out of J osc
                #  < which need hash indexen
                #    and to garbage collect where times says
            }
            else if (!prev) {

            }
        }
        us && console.log("Seeing "+us.t+"/"+s.t, {C,s})
    }
    function Recolink_lookup(link) {
        $dige = link.sc['░']
        !dige and debugger
        # C:treeh, but is not immutable
        $origin = linky&be
        # look up the version
        $co = originy&collect
        $Reco = ahsk(co,'y','Reco_by_dige',dige)
        !Reco and debugger
        return Reco
    }
    function Recolink_discovery(s) {
        # s can be Reco, since Reco%dige
        #  aot the uber-presentable alternative name:
        return inlace(s,{grab:(s) => s.sc['░'] && s})
    }

# makeso, cull*
    # sync n/#@z with N[z]
    #  i $n/#@z:e o N/:z
    #  instead of recreating them every time (immutable state), which is also possible...
    # as in Record C/kommit -> B/times
    # usually adds one new item, sometimes they vanish
    export function makeso(n,N,d) {
        d ||= {}
        $was = ns&z || []
        $neu = N.slice()
        # find the old in the new (removingly)
        $goners = was.filter(e => !hak(grop(z => z == ey&be, neu)))
        # make them slink away
        goners.map(e => es&going ||= now())
        # z have a spacer made (#@z)
        neu.map(z => {
            # with y&up
            $e = pit(n,z.t)
            ey&be = z
            d.creation && d.creation(e,z,n)
        })
    }
    # deletes history
    # < shrinking ooze
    #   
    export function cull_around(s) {
        hak(ss&z) < 10 and return
        # we have many moments of "out"
        $cull = ss&z
        # keep any commits we made
        # < commit when we type into any of the Record** things
        # < folding it all up into a book after a while, %we and all
        cull = cull.filter(n => !ns&we)
        # < keep definitive moments in time
        #    ie before and after a bunch of stuff changed
        #     aggregating many rapid moments of stuff changing
        # < content-awareness is now all over there in Reco pools
        cull = cull.slice(1,-4)
        grop((s,i) => i%2,cull)
        
        !hak(cull) and debugger
        grop(cull,ss&z)
    }



# html elements -> somewhere
# < universal drag+drop interactions for all Con
    export function locate_ev(ev) {
        $E = {N:[]}
        $ta = ev.target
        while (1) {
            E.N.unshift({t:ta.nodeName,ta})
            ta = ta.parentNode
            !ta || ta == document.body and break
        }
        return E
    }