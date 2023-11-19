
import type { SvelteComponent } from 'svelte';
import { get_current_component, onDestroy, onMount, setContext,getContext } from 'svelte/internal';

// call in onMount with your timeslopenumber
export function G(t,co) {
    co ||= get_current_component()

    # events want to find ways up
    # more
    setContext('G:'+t,co)
    # and less specific roles
    setContext('G',co)


    $slope = {}
    slope[t] = co
    $c = {t,co,slope}
    resolve_slope(c)
    console.log('G:'+t+' ',c)


    co.late = &s{
        console.log('G:'+t+' late ',{co,s})
    }
    co.parent = &{
        return c.up
    }
    co.G = &{
        return c
    }

    return c
}

function resolve_slope(c) {
    $t = c.t*1
    while (t <5) {
        t++
        $upco = getContext('G:'+t)
        upco and c.slope[t] = upco
    }
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