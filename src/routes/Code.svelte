<script lang="ts">
    import { page } from '$app/stores'
	import { sto } from './stores.js';
    import { Le } from "$lib/Le"
    import { St_main, St_loop } from "$lib/St"
    import { toCon, sip_dispatch } from "$lib/Co"
    import Con from '$lib/pi/Con.svelte'
    
    import grammar from '../lang/style.grammar?raw'
    import { buildParser } from '@lezer/generator'
    let parser = buildParser(grammar)

    let b = ':3'





    console.log("Para",$page.url.searchParams)


    
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
        con = toCon({s:dat,D:laCon})
        laCon = con
        // set up stores to update them all (con.c.visit[Con+])
        sipd.setN(con.c.visit)
        moment = moment+1
    }
    let dat
    let refresh = 0
    function bleep() {
        dat = St_main()
        reset_tocon()
        tocon(dat)
        // repeated bleep()s version negatively (then dat.i -> 1,2,3...)
        conver = conver < 0 ? conver - 1 : -1
        con = con
        refresh = 0
    }
    let mind
    function bloop() {
        !dat && bleep()
        dat = St_loop(dat)
        if (dat.mind) mind = dat.mind
        if (dat.i % 2) {
            delete dat.mind
        }
        else {
            dat = {A:dat.a,lie:"bin",mind,street:['ca',['ar']],...dat}
        }
        tocon(dat)
        refresh = dat.i
        console.log('bloop! '+refresh)
    }
    $: moment, sipd.sync()
    $: refresh && sipd.refreshN(con.c.wake)
    

    let conver = 0
    function reconver() {
        conver = conver + 1
    }
    let keys = {w: bloop, e: bleep, r: reconver}
    window.addEventListener('keydown', (event) => {
        let y = keys[event.key]
        y && y()
    });





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
        dat.look = look
        tocon(dat)
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


<p> {b} yes </p>
<Codemirror value={$sto} {parser} on:kommit={dobla}></Codemirror>
{#if look}<Lezing {look}></Lezing>{/if}
