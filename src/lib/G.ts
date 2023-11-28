
import type { SvelteComponent } from 'svelte';
import { get_current_component, tick, setContext,getContext } from 'svelte/internal';

import { ac, ahsk,ahk,havs, dig, sha256,ex,now } from "$lib/Y/Pic.ts"
import { pit,C_,i_,o_,pito,o_path,inlace } from "$lib/St"
import {enL,deL,indents} from "$lib/Y/Text"

# *.svelte do: g = G()
    export function G(t, co) {
        co ||= get_current_component()
        $g = co.G
        if (g) {
            console.log("rediscovered G:"+g.name)
            g.co != co and debugger
            g.embedSlope()
            return g
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
        $g = this.find_name(name)
        !g and debugger; return
        g.receive(this)
    }
    # we host those things
    #  using TheRec per thing, which we list to you via your g.rerecord handler
    # < resolve $n each This properly
    #   one thing per g.name atm
    # Record <- Diring C
    receive(This) {
        # naming the two TheG The|This as the usual outsphere|insphere dualism
        #  The being more permanent (eg Record having saved stuff)
        $The = this

        # < modular intro, we know a lot about Record here
        # Record:C/in-Rec:host/Diring-Rec:guest
        $C = The.C
        $host = pito(The.C,'in','-Rec')
        $guest = pito(host,This.name,'-Rec')
        # download new? This
        ex(guest.c,{The,This})
        # tell someone
        $wake = guesty&wake || Cy&wake
        !wake and debugger
        wake()
        
        $again = guesty&wake ? " again" : ""
        # they remember having sent this guest we made for them
        #  see also Dome / &etos_6
        ahk(This,'sent_guest',The.name,guest)
        console.log(The.name+" receive("+This.name+")"+again)
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
        $C = This.C
        # always encode the latest thing (working dir state -> staging)
        $Reco = await mkReco(C)
        # pool it in N[Reco], picking one to be
        Reco = electReco(guest,N,Reco)
        # < put Rec

        console.log("To show!")
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