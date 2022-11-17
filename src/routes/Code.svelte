<script lang="ts">
	import { onMount } from 'svelte'
	import { sto } from './stores.js';
    let b = ':3'
    let lemit = 4

    // lezer
        let flub = "i thing/with/etc\n\no yeses/because\n"
        sto.set(flub)

    // EditorView
	    import Codemirror from './Codemirror.svelte';
	    import Lezing from './Lezing.svelte';

</script>

<p> {b} </p>
<Codemirror value={$sto}></Codemirror>
<Lezing $sto></Lezing>