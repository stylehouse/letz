<script>
    import { createEventDispatcher, onMount } from 'svelte'
    import { hak,ex,map } from "$lib/Y/Pic"
    import { pit,o_up } from "$lib/St"
    import { Construct } from "$lib/Co"
    import { G,Recollect,Aroundiness } from "$lib/G";
    import But from "$lib/ui/But.svelte";
    import Coning from "$lib/Coning.svelte";
    import Knob from '$lib/ui/Knob.svelte';
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
    
    // < the property adjuster thing. gestural 
    let msg = null
    let level = s.sc.level || 0
    function calc() {
        if (level) level *= 0.1; level = Math.round(level)
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



    let b = {Kom:calc}
    let togs = {}
    let tog = (t) => {
        togs[t] = !togs[t]
    }
</script>

<But {b} />
<Knob bind:value={level} min=0 max=50 />
<input bind:value={msg} />
    
<style>
    .ok { color: green }
    .error { color: red }
</style>