<script lang="ts">
    import {onMount, onDestroy, getContext} from 'svelte'
    import {o_}  from '$lib/St'
    import {sip_wiree}  from '$lib/Co'
    import Cont from '$lib/pi/Cont.svelte';
    import Conz from '$lib/pi/Conz.svelte';
    let pis = {Cont, Conz}
    // our instructions: (-Con/(-Cont|-Conz))**
    export let C
    let boost = 0
    
    // only changes when we are sent an update specifically
    let update:number
    sip_wiree(C, v => {
        C = v
        update = C.c.version
    })
    

    // label from above (key into here - Cont%Ct is the s.t on the inside)
    let t
    let sip
    let quee
    function upto() {
        t = C.t
        quee = update || '='
        sip = C.c.ip.join('.')
        let vas = C.y.D?.c.next_boost
        if (vas) {
            sip += ' boost:' + vas
        }
    }
    $: upto(C,boost)

    onMount(() => {
        //if (sip == '1.2.1.2.2') debugger
    });

    // TODO not sure how to get boost into the toCon process
    function boosting (e, negate=false) {
        boost += e.ctrlKey || negate ? -1 : 1
        C.c.next_boost = boost
    }
    
</script>

<span style="color:deepskyblue" on:pointerdown={(e) => boosting(e)}>{t}</span>
{#if boost} <span style="color:blueviolet" on:pointerdown={(e) => boosting(e,'negate')}>+{boost}</span>{/if}
{#if C.c.unwired} <span style="color:red">!wired</span>{/if}

<c_sip style="font-size:70%"> {sip} </c_sip>
<!-- <revision style="color:darkcyan; text-decoration:underline">{quee}</revision> -->
{#each o_(C) as n}
    <span style="display:inline-block; vertical-align: middle; border:2px solid gainsboro; border-right:none; padding: 0 3px; margin: 0 3px; border-radius: 3px;">
        <svelte:component this={pis[n.c.pi]} C={n}/>
    </span>
{/each}
