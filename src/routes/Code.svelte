<script lang="ts">
	import { sto } from './stores.js';
    import { Le } from "../lib/Le"
    
    import grammar from '../lang/style.grammar?raw'
    import { buildParser } from '@lezer/generator'
    let parser = buildParser(grammar)

    let b = ':3'

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

<p> {b} </p>
<Codemirror value={$sto} {parser} on:kommit={dobla}></Codemirror>
{#if look}<Lezing {look}></Lezing>{/if}
