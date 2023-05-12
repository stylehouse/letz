
<script lang="ts">
	import { scale } from 'svelte/transition'
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
    }
    $: upto(C)
</script>

{#if nodules.length}
    <nodules style="display:inline-block; vertical-align: middle; border:1px solid gainsboro; border-right:none; padding: 0 3px; margin: 0 3px; border-radius: 3px;">
    {#each nodules as n}
        <nodule in:scale style="display:block">
            <Con C={n}/>
        </nodule>
    {/each}
    </nodules>
{/if}