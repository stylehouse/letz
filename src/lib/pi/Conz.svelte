
<svelte:options accessors/>
<script lang="ts">
	import { slide } from 'svelte/transition'
    import {hak,uniq,map}  from '$lib/Y/Pic'
    import {o_}  from '$lib/St.svelte'
    import {sip_wiree}  from '$lib/Co.svelte'
    import Con from '$lib/pi/Con.svelte'

    export let C
    let update = 0
    sip_wiree(C, v => {
        C = v
    })
    let nodules
    function upto() {
        nodules = o_(C)
        // check names
        //  the '#each ... (n.t)' below means those things are keyed by n.t
        //   keyed|indexed|addressed|identified|individuated|remembered
        //  atm we use the array indices to individuate [C,C,C],
        //   which gets very incorrect if things start rearranging
        //  < should be a Cid - they identity
        let nameclash = hak(uniq(map(n => n.t, nodules))) != hak(nodules)
        if (nameclash) debugger
    }
    $: upto(C)
</script>

{#if nodules.length}
    <nodules style="
        display:inline-table;
        vertical-align: middle;
        border:5px solid #f8c;
        border-right:none;
        padding: 0 3px; margin: 0 3px;
        border-radius: 3px;
        width:100%;
        ">
    <!-- the (n.t) means indexed by that, should be a Cid - they are reused for identity -->
    {#each nodules as n (n.t)}
        <nodule style="
            position: relative;
            width:100%;
            display:table-row;
            " >
            <!--  -->
            <!-- <zo>(t:{n.t})</zo> -->
            <Con C={n} />
        </nodule>
    {/each}
    </nodules>
{/if}