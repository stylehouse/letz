
import type { SvelteComponent } from 'svelte';
import { tick, setContext,getContext } from 'svelte';

import { ac, ahsk,ahk,theone,hak,haks,havs, dec,dig, sha256,sex,ex,nex,now,grep,grop,armap,map,sum,ksaf,hashkv,flatten,fatal,heq,reverse } from "$lib/Y/Pic.ts"
import { pit,C_,i_,o_,pito,o_path,o_up,inlace } from "$lib/St.svelte"
import {diff,enj,enL,deL,indents} from "$lib/Y/Text"

# < GOING? these are A
# *.svelte do: g = G()
    export function G(t, co) {
        if (!co) throw "G !co"
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
            g = fo && fo.t_G && fo.t_G[co.constructor.name]
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
    # see _who_is(t) which uses getContext() instead.
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
        if (this.old_G?.C) {
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