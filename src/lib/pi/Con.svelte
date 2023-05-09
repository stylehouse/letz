<script lang="ts">
    import {onMount, onDestroy, getContext} from 'svelte'
	import { scale } from 'svelte/transition'
    import {o_}  from '$lib/St'
    import Cont from '$lib/pi/Cont.svelte';
    import Conz from '$lib/pi/Conz.svelte';
    let pis = {Cont, Conz}
    // our instructions: (-Con/(-Cont|-Conz))**
    export let C
    // label from above (key into here - Cont%Ct is the s.t on the inside)
    let t = C.t
    
    let sip = C.c.ip.join('.')
    let wire
    let update:number
    let unsubscribe:Function

    wire = getContext(sip)

    unsubscribe = wire.subscribe((v) => {
        if (!v) return
        console.log(sip+" got: "+v)
        C = v
        update = C.c.version
    });
    onDestroy(() => {
        unsubscribe()
    });

    onMount(() => {
        //if (sip == '1.2.1.2.2') debugger
    });

    let quee
    $: quee = update || '='
    if (!C.y.up) {
        // sleep the toplevel, only dispatch updates
        //if (C.t == 'toCon') debugger
        //quee = 'sleepytimenow'
    }

    // TODO not sure how to get boost into the toCon process
    let boost = 0
    function boosting (e, negate=false) {
        boost += e.ctrlKey || negate ? -1 : 1
        C.c.next_boost = boost
    }
    
</script>

<span in:scale style="color:deepskyblue" on:pointerdown={(e) => boosting(e)}>{t}</span>
{#if boost} <span style="color:blueviolet" on:pointerdown={(e) => boosting(e,'negate')}>+{boost}</span>{/if}

<c_sip style="font-size:70%"> {sip} </c_sip>
<revision style="color:darkcyan; text-decoration:underline">{quee}</revision>
{#key quee}
{#each o_(C) as n}
    <span style="display:inline-block; vertical-align: middle; border:2px solid gainsboro; border-right:none; padding: 0 3px; margin: 0 3px; border-radius: 3px;">
        <svelte:component this={pis[n.c.pi]} C={n}/>
    </span>
{/each}
{/key}
