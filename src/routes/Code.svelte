<script lang="ts">
    import {setContext} from 'svelte'
	import { sto } from './stores.js';
    import { Le } from "$lib/Le"
    import { St_main, St_loop, toCon } from "$lib/St"
    import Con from '$lib/pi/Con.svelte';
    
    import grammar from '../lang/style.grammar?raw'
    import { buildParser } from '@lezer/generator'
    import { browser } from '$app/environment';
    let parser = buildParser(grammar)

    let b = ':3'
    let dat, refresh
    function bleep() {
        dat = St_main()
        tocon(dat)
        // repeated bleep()s version negatively (then dat.i -> 1,2,3...)
        conver = conver < 0 ? conver - 1 : -1
    }
    function bloop() {
        dat = St_loop(dat)
        tocon(dat)
        refresh = dat.i
    }
    // < ping changes carefully
    $: refresh, setContext('1.2.1.2.2',refresh);


    let laCon
    let con
    // scan into (-Con/(-Cont|-Conz))**
    function tocon(dat) {
        con = toCon(dat, {D:laCon})
        laCon = con
    }
    let conver = 0
    function refresh_Con() {
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
<button on:click={() => refresh_Con()} > refresh({refresh}) </button>
{#if con}
    {#key conver}
    <p> <Con C={con}/> </p>
    {/key}
{/if}


<p> {b} </p>
<Codemirror value={$sto} {parser} on:kommit={dobla}></Codemirror>
{#if look}<Lezing {look}></Lezing>{/if}
