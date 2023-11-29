
import type { SvelteComponent } from 'svelte';
import { get_current_component, tick, setContext,getContext } from 'svelte/internal';

import { ac, ahsk,ahk,hak,havs, dig, sha256,ex,now,grep,grop,sum,hashkv } from "$lib/Y/Pic.ts"
import { pit,C_,i_,o_,pito,o_path,o_up,inlace } from "$lib/St"
import {enL,deL,indents} from "$lib/Y/Text"

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
        console.log(name+" receive("+this.name+")"+again)
    }
    # we may be called at the end of Construct()
    send_places() {
        $This = this
        each name,guest This.sent_guest {
            let wake = guesty&wake
            wake and wake()
            else {
                console.info("No wake at send_places "+This.name)
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

    async function mkReco(C) {
        $string = inlace(C,{
            grab: (C,d) => indents(d.d*2,enL(C),'notailnl'),
        }).join("\n")

        $dige = await sha256(string)

        $Reco = {string,dige}
        return Reco
    }
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
    
    export function Recolink_stillness(host,Reco) {
        $la = o_(host).slice(-1)[0]
        return la?.sc['░'] == Reco.dige
    }

# Aroundiness
    # a picture looking back through around:s/**
    # < when to make sure everything is stored
    export function Aroundiness(s) {
        # tumble down s/* and sy&be=s@origin
        #  looking back through the i ... that advanced it
        $N = inlace(s,{
            # include the first node, s|around
            inc:1,
            climb: &sd{
                # they sy&be=s@origin and 
                $linkish = sum(sy&be && 1, s.sc['░'] && 1)
                $z = o_(s)
                if (linkish) {
                    hak(z) and debugger
                    # go to its origin
                    return [sy&be]
                }
                # This ends our link trail
                sc&This and return []
                # nothing but links and lists of links
                !hak(z) and debugger
                # select only the latest /around/*
                z = [z.pop()]
                return z
            }
        })
        $by_path = hashkv(N.map(s => [o_up(s).reverse().map(s => s.t).join("/"), s]))
        hak(by_path) != hak(N) and debugger
        return by_path
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
        cull.pop()
        cull.shift()
        grop((s,i) => i%2,cull)
        
        !hak(cull) and debugger
        grop(cull,ss&z)
    }


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