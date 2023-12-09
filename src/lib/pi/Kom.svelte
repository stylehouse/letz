<script>
    import { createEventDispatcher, onMount } from 'svelte'
    import { hak,ex,map } from "$lib/Y/Pic"
    import { pit,o_up } from "$lib/St"
    import { Construct } from "$lib/Co"
    import { G,Recollect,Aroundiness } from "$lib/G";
    import But from "$lib/ui/But.svelte";
    import Coning from "$lib/Coning.svelte";
    import Knob from '$lib/ui/Knob.svelte';
    import Textin from '$lib/ui/Textin.svelte';
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

    let thinghood
    if (s.y.be) {
        // a /kommit/*
        thinghood = 1 
    }
    
    // < the property adjuster thing. gestural 
    let msg = null
    let level = s.sc.level || 0
    function calc() {
        // if (level) level *= 0.1; level = Math.round(level)
        let settings = {level,msg}
        console.log("-Kom "+s.t+" sets: ",settings)
        map((v,k) => {
            if (v) {
                s.sc[k] = v
            }
            else {
                delete s.sc[k]
            }
        },settings)
    }
    $: calc(), level,msg



    let o = () => tog('dump')
    let b = {Kom:calc,o}
    let togs = {}
    let tog = (t) => {
        togs[t] = !togs[t]
    }
</script>
{#if thinghood}
<div>
    <But {b} />
    <!-- <Knob bind:value={level} min=0 max=5 /> -->
    <Textin bind:v={msg} />
</div>
{/if}
    
<!-- data dump -->

    {#if togs.dump}
        <Coning t="s" C={s} noC=2 />
    {/if}


<style>
    div * { display:inline-block }
    .ok { color: green }
    .error { color: red }
</style>