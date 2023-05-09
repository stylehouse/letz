<script lang="ts">
    import {setContext} from 'svelte'
    import {writable} from 'svelte/store'
	import { sto } from './stores.js';
    import { Le } from "$lib/Le"
    import { St_main, St_loop } from "$lib/St"
    import { toCon, sip_dispatch } from "$lib/Co"
    import Con from '$lib/pi/Con.svelte';
    
    import grammar from '../lang/style.grammar?raw'
    import { buildParser } from '@lezer/generator'
    import { browser } from '$app/environment';
    let parser = buildParser(grammar)

    let b = ':3'
    let dat, refresh
    function bleep() {
        dat = St_main()
        reset_tocon()
        tocon(dat)
        // repeated bleep()s version negatively (then dat.i -> 1,2,3...)
        conver = conver < 0 ? conver - 1 : -1
    }
    function bloop() {
        !dat && bleep()
        dat = St_loop(dat)
        tocon(dat)
        refresh = dat.i
    }
    // < ping changes carefully
    let sipd = new sip_dispatch()

    let moment = 0

    let laCon
    let con
    function reset_tocon() {
        laCon = undefined
        sipd.reset()
    }
    // scan into (-Con/(-Cont|-Conz))**
    function tocon(dat) {
        con = toCon(dat, {D:laCon})
        laCon = con
        // set up stores to update them all (con.c.visit[Con+])
        sipd.addN(con.c.visit)
        moment = moment+1
    }

    $: moment, sipd.sync()

    function busybusy () {
        sipd.o('1.2.1.2.2')
        // < ping only the -Cont etc? only -Con subscribe so far
        //sipd.o('1.2.1.2.2.1',refresh)
    }
    $: refresh && busybusy()
    

    let conver = 0
    function reconver() {
        conver = conver + 1
    }

    // lezer
        let flub = "i thung/with/etc\n\no yeses/because\n"
        sto.set(flub)

    // EditorView
	    import Codemirror from './Codemirror.svelte';
	    import Lezing from './Lezing.svelte';
    import { set_custom_element_data } from 'svelte/internal';

    let look:Le = undefined
    function dobla({detail:{view}}) {
        look = new Le(view.state)
    }
</script>


<button on:click={() => bleep()} > bleep() </button>
<button on:click={() => bloop()} > bloop() </button>
<button on:click={() => reconver()} > reconver({conver}.{refresh}) </button>

{#if con}
    {#key conver}
    <p> <Con C={con}/> </p>
    {/key}
{/if}


<p> {b} </p>
<Codemirror value={$sto} {parser} on:kommit={dobla}></Codemirror>
{#if look}<Lezing {look}></Lezing>{/if}
