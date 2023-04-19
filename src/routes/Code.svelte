<script lang="ts">
	import { sto } from './stores.js';
    import { Le } from "$lib/Le"
    import { St_main, St_loop } from "$lib/St"
    import Con from '$lib/Con.svelte';
    
    import grammar from '../lang/style.grammar?raw'
    import { buildParser } from '@lezer/generator'
    import { browser } from '$app/environment';
    let parser = buildParser(grammar)

    let b = ':3'
    let dat
    function bleep() {
        dat = St_main()
    }
    function bloop() {
        St_loop(dat)
    }

    // lezer
        let flub = "i thung/with/etc\n\no yeses/because\n"
        sto.set(flub)

    // EditorView
	    import Codemirror from './Codemirror.svelte';
	    import Lezing from './Lezing.svelte';

    let look:Le = undefined
    function dobla({detail:{view}}) {
        look = new Le(view.state)
    }
</script>

<button on:click={() => bleep()} > bleep() </button>
<button on:click={() => bloop()} > bloop() </button>
{#if dat}<p> <Con s={dat}></Con> </p>{/if}
<p> {b} </p>
<Codemirror value={$sto} {parser} on:kommit={dobla}></Codemirror>
{#if look}<Lezing {look}></Lezing>{/if}
