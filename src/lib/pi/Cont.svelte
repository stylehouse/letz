<script lang="ts">
    import { onMount } from 'svelte'
    import {sip_wiree}  from '$lib/Co'
    export let C
    sip_wiree(C, v => {
        C = v
    })
    let sym,Ct,say,unk
    // the -Con/-Cont:C
    let Con
    // may be relying on us to draw the main clickable label, in a less leftward position
    let primary_label = false
    let Ct_style = 'color:gainsboro'
    let boosting = (e) => {
        // pass up to the Con
        Con.y.boosting(e)
    }
    function upto() {
        ({sym,Ct,say,unk} = C.sc)
        // and our actual name, since C.t='Cont' all the time
        Con = C.y.up

        if (Con.sc.avoid_restating_Ct) {
            primary_label = true
            Ct_style = 'color:deepskyblue'
        }
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
{#if Ct} <s_Ct style={Ct_style} on:pointerdown={(e) => boosting(e)}>{Ct}</s_Ct>{/if}
{#if unk} <span style="color:darkcyan;font-size:large"> ? </span>{/if}
{#if say} <span style="color:darkcyan"> {say} </span>{/if}
{#if unk} <span style="color:darkcyan;font-size:large"> ? </span>{/if}

</div>