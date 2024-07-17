<script lang="ts">
    import { onMount, untrack } from 'svelte';
    import But from './ui/But.svelte';
    import { C_ } from "$lib/St.svelte"
    import Con from "$lib/pi/Con.svelte"
    import { Construct } from "$lib/Co.svelte"
    import { inlace } from "$lib/St.svelte"
    import Coning from '$lib/Coning.svelte'
    import { Send } from '$lib/Gap.svelte';
    
    let {C} = $props()
    C ||= C_('/',1,{pi:'Dir',rootdir:1})
    let Record = Send("Record",C)

    let D = $state()
    async function ring() {
        let notD = untrack(() => D);
        D = Construct({I:{Pi:1,sent_places:[Record]},s:C,D:notD})
    }
    let dumped
    async function dumpD() {
        let Cons = inlace(D,{inc:1}).filter(D => D.c.pi == 'Con')
        dumped = Cons
    }
    let b = {ring,dumpD}

    
    $effect(() => {
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
