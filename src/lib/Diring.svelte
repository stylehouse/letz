<script lang="ts">
    import { onMount } from 'svelte';
    import But from './ui/But.svelte';
    import { C_ } from "$lib/St"
    import Con from "$lib/pi/Con.svelte"
    import { Construct } from "$lib/Co"
    import { inlace } from "$lib/St"
    import Coning from '$lib/Coning.svelte'
    import { G } from './G';
    
    export let C = C_('/',1,{pi:'Dir',rootdir:1})
    let g = G(2)
    g.haveC(C,s => C = s)
    g.send("storage")

    let D
    async function ring() {
        D = Construct({I:{Pi:1,sent_places:g},s:C,D})
    }
    let dumped
    async function dumpD() {
        let Cons = inlace(D,{inc:1}).filter(D => D.c.pi == 'Con')
        dumped = Cons
    }
    let b = {ring,dumpD}

    
    onMount(() => {
      // Fetch?
      ring()
    });
//endregion
</script>

<biggroup>
<h1>Diring</h1>
<But {b} />
{#if dumped}
    <Coning t="N = D**" C={dumped} />
{/if}
{#if D}
    <Coning t="theD" C={D} />
    <Con C={D} />
{/if}
</biggroup>
