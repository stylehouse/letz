<script lang="ts">
    import { onMount } from 'svelte'
    import {sip_wiree}  from '$lib/Co'
    export let C
    sip_wiree(C, v => {
        C = v
    })
    let sym,Ct,say,unk
    function upto() {
        ({sym,Ct,say,unk} = C.sc)
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
{#if unk} <span style="color:darkcyan;font-size:large"> ? </span>{/if}
{#if say} <span style="color:darkcyan"> {say} </span>{/if}
{#if unk} <span style="color:darkcyan;font-size:large"> ? </span>{/if}

</div>