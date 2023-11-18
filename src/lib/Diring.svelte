<script lang="ts">
    import { onMount } from 'svelte';
    import But from './ui/But.svelte';
    import { C_ } from "$lib/St"
    import Con from "$lib/pi/Con.svelte"
    import { Construct } from "$lib/Co"
    import { inlace } from "$lib/St"
    import Coning from '$lib/Coning.svelte'
    
    export let C = C_('/',1,{pi:'Dir',rootdir:1})
    let D
    async function ring() {
        D = Construct({I:'In',s:C,D})
    }
    let Consimg
    async function range() {
        let Cons = inlace(D,{inc:1}).filter(D => D.c.pi == 'Con')
        
        Consimg = Cons
    }
    let b = {ring,range}
  
    onMount(() => {
      // Fetch?
      ring()
    });
//endregion
</script>

<biggroup>
<h1>Diring</h1>
<But {b} />
{#if Consimg}
<Coning t="Consimg" C={Consimg} />
{/if}
{#if D}
    <Coning t="theD" C={D} />
    <Con C={D} />
{/if}
</biggroup>
