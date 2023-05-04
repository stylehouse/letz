<script lang="ts">
    import {onMount, onDestroy, getContext} from 'svelte'
    import {o_}  from '$lib/St'
    import Cont from '$lib/pi/Cont.svelte';
    import Conz from '$lib/pi/Conz.svelte';
    let pis = {Cont, Conz}
    // our instructions: (-Con/(-Cont|-Conz))**
    export let C
    
    let sip = C.c.ip.join('.');
    let wire
    let update:number
    let unsubscribe:Function

    wire = getContext(sip)

    unsubscribe = wire.subscribe((v) => {
        if (!v) return
        console.log("Got:"+v)
        update = v
    });
    onDestroy(() => {
        unsubscribe();
    });


    let t = C.t
    // layers of identity leading onwards
    let bits = o_(C)
    let quee
    $: quee = update || 'no update'


    // TODO not sure how to get boost into the toCon process
    let boost = 0
    function boosting (e, negate=false) {
        boost += e.ctrlKey || negate ? -1 : 1
        C.c.next_boost = boost
    }
    
</script>

<span style="color:deepskyblue" on:pointerdown={(e) => boosting(e)}>{t}</span>
{#if boost} <span style="color:blueviolet" on:pointerdown={(e) => boosting(e,'negate')}>+{boost}</span>{/if}

<small> {sip}</small>
{#if update} <span style="color:darkcyan; text-decoration:underline">{quee}</span>{/if}
{#key quee}
{#each bits as n}
    <span style="display:inline-block; vertical-align: middle; border:1px solid gainsboro; border-right:none; padding: 0 3px; margin: 0 3px; border-radius: 3px;">
        <svelte:component this={pis[n.c.pi]} C={n}/>
    </span>
{/each}
{/key}
