<script lang="ts">
    import { onMount } from 'svelte'
    import {sip_wiree}  from '$lib/Co'
    export let C
    sip_wiree(C, v => {
        C = v
    })
    let sym,Ct,say
    function upto() {
        ({sym,Ct,say} = C.sc)
    }
    $: upto(C)

    let wrapper
    onMount((e,t,c) => {
        if (Ct == 'Dublin City') {
            let geo = wrapper.getBoundingClientRect()
            //console.log("Con onMount", geo)
        }
        //if (Ct == 'Kerouac') debugger
    })
</script>

<div bind:this={wrapper}>
{#if sym} <span style="color:cornsilk">{sym}</span>{/if}
{#if Ct} <s_Ct style="color:gainsboro">{Ct}</s_Ct>{/if}
{#if say} <span style="color:darkcyan"> {say} </span>{/if}

</div>