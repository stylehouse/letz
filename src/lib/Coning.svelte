<script lang="ts">
    import { onMount } from "svelte";
    import { Construct, sip_dispatch } from "$lib/Co";
    import Con from "$lib/pi/Con.svelte";
    export let style = "";
    export let t = "Coning";
    // doesn't have to be C:
    export let C;
    // can treat C like data:
    export let noC = 0;
    let D;
    function upto() {
        D = Construct({ t: t, s: C, D, noC });
    }
    function ring() {}

    $: upto(C);
</script>

<biggroup {style}>
    <!-- <button on:click={() => ring()} > ring() </button> -->
    {#if D}
        <Con C={D} />
    {/if}
</biggroup>
