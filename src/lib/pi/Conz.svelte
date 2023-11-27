
<svelte:options accessors/>
<script lang="ts">
	import { slide } from 'svelte/transition'
    import {hak,uniq,map}  from '$lib/Y/Pic'
    import {o_}  from '$lib/St'
    import {sip_wiree}  from '$lib/Co'
    import Con from '$lib/pi/Con.svelte'

    export let C
    let update = 0
    sip_wiree(C, v => {
        C = v
    })
    let nodules
    function upto() {
        nodules = o_(C)
        let nameclash = hak(uniq(map(n => n.t, nodules))) != hak(nodules)
        if (nameclash) debugger
    }
    $: upto(C)
</script>

{#if nodules.length}
    <nodules style="display:block; vertical-align: middle; border:5px solid #f8c; border-right:none; padding: 0 3px; margin: 0 3px; border-radius: 3px;">
    <!-- the (n.t) means indexed by that, should be a Cid - they are reused for identity -->
    {#each nodules as n (n.t)}
        <nodule style="display:table" >
            <Con C={n} />
        </nodule>
    {/each}
    </nodules>
{/if}