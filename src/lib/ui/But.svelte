
<script>
    import {map,isfu,isar,armap} from '$lib/Y/Pic'
    import { onMount } from 'svelte';
    import DropDown from "$lib/ui/DropDown.svelte"

	export let b = {on:()=>1}
    let N = []
    // compile b a bit
    onMount(() => {
    N = armap((c,t) => {
        if (isfu(c)) {
            // b.name = ()=>{...}
            return {t,do:c}
        }
        else if (isar(c)) {
            // b.name = [[one,two,three],()=>{...}]
            if (isar(c[0])) {
                return {t,DropDown:c[0],set:c[1]}
            }
        }
        throw "!b"
    },b)
    })
</script>

{#each N as c}
    <span>
    {#if c.DropDown}
        {c.t}<DropDown N={c.DropDown} set={c.set} title={c.t} />
    {:else}
        <button on:click={() => c.do()}> {c.t} </button>
    {/if}
    </span>
{/each}
