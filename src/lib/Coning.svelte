<script lang="ts">
	import { onMount } from 'svelte';
    import { Construct, sip_dispatch } from "$lib/Co"
    import Con from '$lib/pi/Con.svelte'
    export let t = 'Coning'
    // doesn't have to be C:
    export let C
    let D
    function upto() {
        D = Construct({t:t,s:C,D})
    }
    function ring() {
        
    }
    $: upto(C)
</script>

<!-- <button on:click={() => ring()} > ring() </button> -->
{#if D}
    <Con C={D} />
{/if}
