<script>
    import { onMount } from 'svelte';
    import { C_ } from "$lib/St"
    import Con from "$lib/pi/Con.svelte"
    import { Construct } from "$lib/Co"
    import Coning from '$lib/Coning.svelte'
    
    export let C = C_('/',1,{pi:'Dir',rootdir:1})
    let D
    async function ring() {
        D = Construct({I:'In',s:C,D})
    }

  
    onMount(() => {
      // Fetch?
      ring()
    });
//endregion
</script>

<button on:click={() => ring()} > ring() </button>
{#if D}
    <Coning t="theD" C={D} />
    <Con C={D} />
{/if}
