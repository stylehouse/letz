
import type { SvelteComponent } from 'svelte';
import { get_current_component, tick, setContext,getContext } from 'svelte/internal';

import { ac, ahsk,ahk,havs } from "$lib/Y/Pic.ts"

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

  # Diring sends Record its C
  haveC(name,C,setC) {
    this.C = C
    # reacts the component to a new C
    this.setC = setC
    $g = this.find_name(name)
    !g and return
    g.giveC(this)
  }
  # Record receives a C from Record
  # < resolve $n each This properly
  giveC(g) {
    $rec = ahsk(this,'received_giveC_g',g.name)
    # C not replaced yet it is given, look into it
    rec?.C == g.C and return rec.wake_slightly()
    # replace the Rec object
    rec = new Rec(this,g)
    ahk(this,'received_giveC_g',g.name,rec)
    rec.wake()
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
}
class Rec {
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
    wake() {
        # Record
        $g = this.The
        !g.rerecord and return console.warn("Record!g.rerecord")
        console.log("Record wake")
        g.rerecord(
            havs(g.received_giveC_g)
        )
    }
}

export function G(t, co) {
    co ||= get_current_component()
    $g = co.G
    if (g) {
        g.co != co and debugger
        g.embedSlope()
        return g
    }
    
    g = new TheG(t, co);

    $live = import.meta.env.SSR === false

    live and console.log('G:' + t + ' ', g);

    return g;
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