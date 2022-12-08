<script lang="ts">
	import { onMount } from 'svelte'
	import { sto } from './stores.js';
    
    import grammar from '../lang/style.grammar?raw'
    import { buildParser } from '@lezer/generator'
    let parser = buildParser(grammar)

    let b = ':3'
    let lemit = 4

    // lezer
        let flub = "i thing/with/etc\n\no yeses/because\n"
        sto.set(flub)

    // EditorView
	    import Codemirror from './Codemirror.svelte';
	    import Lezing from './Lezing.svelte';

    function dobla(ev) {
        b = "---"
    }
</script>

<p> {b} </p>
<Codemirror value={$sto} {parser} on:kommit={dobla}></Codemirror>
<Lezing {parser}></Lezing>