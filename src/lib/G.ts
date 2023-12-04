
import type { SvelteComponent } from 'svelte';
import { get_current_component, tick, setContext,getContext } from 'svelte/internal';

import { ac, ahsk,ahk,hak,haks,havs, dig, sha256,sex,ex,now,grep,grop,map,sum,hashkv,fatal,heq,reverse } from "$lib/Y/Pic.ts"
import { pit,C_,i_,o_,pito,o_path,o_up,inlace } from "$lib/St"
import {enL,deL,indents} from "$lib/Y/Text"

# f
    # s^^^ -> a/pa/th
    function slupath(s,d) {
        # < d.til?
        return o_up(s).reverse().map(s => s.t).join("/")
    }

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

        $live = import.meta.env.SSR === false

        live and console.log('G:' + t + ' ', g);

        return g;
    }
    class TheG {
        
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
        $old_G = g.t_G[this.name]
        g.t_G[this.name] = this
    }
    # look up name
    find_name(name) {
            $g = this.up || this
            return g.t_G[name]
                # or try at /^ ie this.up ie g
                || g != this && g.find_name(name)
    }

# g.haveC, g.i|o

    # showing C to g
    haveC(C,setC) {
        # they have a C
        this.C = C
        # they can react the component to a new C
        this.i(setC)
    }
    # we give things to others
    # eg Diring C -> Record
    send(name,C,setC) {
        this.notlive and return console.log("G.send while not live: "+this.name)
        $g = this.find_name(name)
        !g and debugger; return

        # Record hosts us
        $guest = g.receive(this)
        !guest and debugger
        # Diring remember the guest Record made for them
        #  see also Dome / &etos_6
        ahk(this,'sent_guest',g.name,guest)

        # diag
        #  they get y&wake once in a Rec.svelte
        let again = guest.y.wake ? " again" : ""
        # console.log(name+" receive("+this.name+")"+again)
    }
    # we may be called at the end of Construct()
    send_places() {
        $This = this
        each name,guest This.sent_guest {
            let wake = guesty&wake
            wake and wake()
            else {
                # it seems to manage
                # console.info("No wake at send_places "+This.name)
            }
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
    # Rec.svelte given Record/in/$guest-Rec
    export async function Recollect(g,guest,N) {
        $This = guestc&This
        $C = This?.C || guest
        # always encode the latest thing (working dir state -> staging)
        $Reco = await mkReco(C)
        # pool it in N[Reco], picking one to be now
        Reco = electReco(guest,N,Reco)


        g.output_to(Reco)
    }

    # Reco = print C**
    async function mkReco(C) {
        $string = inlace(C,{
            grab: (C,d) => indents(d.d*2,enL(C),'notailnl'),
        }).join("\n")

        $dige = await sha256(string)

        $Reco = {string,dige}
        return Reco
    }
    # multiple Reco compete for use
    # < the Reco+ and kommit|been/* serial-numbered lists
    #    are the same things. see Recolink_stillness
    function electReco(guest,N,Reco) {
        # staging and recent states pool in N[Reco]
        # < guest says it wants something else reset to, for undo
        #    git work via guest, who might show all Reco?
        #    they want naming intelligently wrt the diff, enclosing headings etc...
        if (N[0] && N[0].dige == Reco.dige) {
            # same, recycle object
            Reco = N[0]
        }
        else {
            Reco.time = now()
            N.push(Reco)
        }
        return Reco
    }
    # Reco download to a C that hosts them 
    #  sto should be deleted by Recolink pushing news
    export function Recolink(guest,Reco,s) {
        guest.y.be = s
        guest.sc['░'] != Reco.dige and delete guesty&store
        guest.sc['░'] = Reco.dige
        guest.y.string = Reco.string
    }
    # "same, recycle object" for kommit|been/* serial-numbered lists
    export function Recolink_stillness(host,Reco) {
        $la = o_(host).slice(-1)[0]
        return la?.sc['░'] == Reco.dige
    }

# Aroundiness
    # note: things compile: '$N =' -> 'var N =', '...and...' -> 'if(...) { ... }'
    # a picture looking back through kommit:s/**
    # < when to make sure everything is stored
    export function Aroundiness(s) {
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
        Around_layers(layers,deps_by_dige)

        $by_path = map(N => hashkv(N.map(s => [slupath(s), s])), layers)
        return {deps_by_dige,layers}
    }
    # asyncily PUT each layers of requests
    async function Around_layers(layers,deps_by_dige) {
        each iN layers {
            $waits = map(s => upload_to_ipfs(s,deps_by_dige), N)
            await Promise.all(waits)
            # < handling errors?
        }
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