
import type { SvelteComponent } from 'svelte';
import { get_current_component, tick, setContext,getContext } from 'svelte/internal';

import { ac, ahsk,ahk,havs,dig, sha256 } from "$lib/Y/Pic.ts"
import { pit,C_,i_,o_,o_path,inlace } from "$lib/St"
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
        # naming the two TheG as the usual outsphere|insphere dualism
        #  The being more permanent (eg Record having saved stuff)
        $The = this
        # we have the last thing (as made into rec)
        $rec = ahsk(The,'received_g',This.name)
        $again = rec && " again" || ""

        # svelte will chase this object being different
        #  and hopefully not eat stale This.C?
        rec = new TheRec(The,This)
        ahk(The,'received_g',This.name,rec)

        #  when we show it a new array:
        # reactive list of Reco+
        rec.wake()

        # they remember having sent this rec we made for them
        #  see also Dome / &etos_6
        ahk(This,'sent_g',The.name,rec)
        console.log(The.name+" receive("+This.name+")"+again)
    }
    # we may be called at the end of Construct()
    send_places() {
        $This = this
        each name,rec This.sent_g {
            rec.wake()
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

# a candidacy for recording sent to Record from somewhere
export class TheRec {
    constructor(The,This) {
        # Record, the stored end
        this.The = The
        # Diring, the wild end
        this.This = This
    }

    # react to a C coming in
    async wake_slightly() {
        # a remote has shared a C (repeatedly)
        await tick()
        # < now remote will be ready?
    }
    # react list of Record/Reco+
    wake() {
        $The = this.The
        The.rerecord(havs(The.received_g))
    }
}

# Reco.svelte given Rec, to pool N[Reco]
# we always encode the latest thing...
export async function Recollect(g,Rec,N) {
    $co = g.co
    
    $string = inlace(Rec.This.C,{
        grab: (C,d) => indents(d.d*2,enL(C),'notailnl'),
    }).join("\n")

    $dige = await sha256(string)

    $Reco = {string,dige}
    
    if (N[0] && N[0].dige == Reco.dige) {
        # no different to last staged (encoded) thing
    }
    else {
        N.push(Reco)
    }

    console.log("To show!")
    g.output_to(Reco)
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