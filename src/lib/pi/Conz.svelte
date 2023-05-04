
<script lang="ts">
	import { scale } from 'svelte/transition'
    import {o_}  from '$lib/St'
    import Con from '$lib/pi/Con.svelte'

    export let C

    let nodules = o_(C)
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