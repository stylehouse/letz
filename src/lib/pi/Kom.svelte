<script>
    import { createEventDispatcher, onMount } from 'svelte'
    import { hak,ex,dex,map } from "$lib/Y/Pic"
    import { pit,o_up } from "$lib/St"
    import { Construct } from "$lib/Co"
    import { G,Recollect,Aroundiness } from "$lib/G";
    import But from "$lib/ui/But.svelte";
    import Coning from "$lib/Coning.svelte";
    import Knob from '$lib/ui/Knob.svelte';
    import Textin from '$lib/ui/Textin.svelte';
    import Proper from '$lib/ui/Proper.svelte';
	const dispatch = createEventDispatcher();
    // Reco we know about, eg from a remote. changes slower than Rec.
    let N = []
    let g = G(1)

    // we are in a -Con(s-Rec)/-Kom:C
    export let C
    let Con = C.y.up
    // aka guest
    let s = Con.c.s
    if (!s.c.pi == 'Rec') throw "!Rec"

    let be
    if (s.y.be) {
        // a /kommit/*, or something we put there
        be = s.y.be
    }
    let clas = ''
    
    // < the property adjuster thing. gestural
    let msg
    let level
    onMount(() => {
        if (be) {
            msg = be.sc.msg || null
            level = be.sc.level || 0
        }
    })
    function calc() {
        if (be) {
            // if (level) level *= 0.1; level = Math.round(level)
            let settings = {level,msg}
            console.log("-Kom "+s.t+" sets: ",settings)
            // hash copy, deleting
            dex(be.sc,settings)
        }
        if (s.sc.going) clas = 'going'
    }
    $: calc(), level, msg, C, s


    let o = () => tog('dump')
    let b = {Kom:calc,o: () => tog('dump'),P:() => tog('Proper')}
    let togs = {}
    let tog = (t) => {
        togs[t] = !togs[t]
    }
</script>
{#if be}
<div class={clas}>
    <But {b} />
    <!-- <Knob bind:value={level} min=0 max=5 /> -->
    <Textin bind:v={msg} />
    {#if togs.Proper}
        <Proper {C} {s} ig="level,msg"/>
        {#if be}
            <div>y&be <Proper {C} s={be} /></div>
        {/if}
    {/if}

</div>
{/if}
    
<!-- data dump -->

    {#if togs.dump}
        <Coning t="s" C={s} noC=2 />
    {/if}


<style>
    .going { opacity: 0.5; }
    /* div * { display:inline-block } */
    .ok { color: green }
    .error { color: red }
</style>