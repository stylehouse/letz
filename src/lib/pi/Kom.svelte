<script>
    import { createEventDispatcher, onMount } from 'svelte'
    import { hak,ex,dex,map,haks,joint } from "$lib/Y/Pic"
    import { enj } from "$lib/Y/Text"
    import { pit,o_up } from "$lib/St.svelte"
    import { Construct } from "$lib/Co.svelte"
    import { G } from "$lib/G.svelte";
    import { Recollect,Aroundiness } from "$lib/treeing/Betimes.svelte";
    import But from "$lib/ui/But.svelte";
    import Coning from "$lib/Coning.svelte";
    import Knob from '$lib/ui/Knob.svelte';
    import Textin from '$lib/ui/Textin.svelte';
    import Proper from '$lib/ui/Proper.svelte';
    import Diff from '$lib/ui/Diff.svelte';
	const dispatch = createEventDispatcher();
    // Reco we know about, eg from a remote. changes slower than Rec.
    let N = []
    let co = {}
    let g = G(1,co)

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
        // we only read these once at init
        if (be) {
            msg = be.sc.msg || null
            level = be.sc.level || 0
        }
    })
    let delta
    let diff
    function calc() {
        // put any adjustments
        if (be) {
            let settings = {level,msg}
            // hash copy, deleting
            dex(be.sc,settings)
        }
        // get things to see
        if (s.sc.going || s.sc.goable) clas = 'going'
        delta = s.sc.delta
        diff = s.sc.diff
    }
    $: calc(), msg,level, C, s
    s.y.wake = () => calc()

    // < b.ui = {Kom,o,P,l}, a sub-panel to be opened
    let togs = {}
    let tog = (t) => {
        togs[t] = !togs[t]
    }
    let b = 'not'
    let bid = ''
    function leve() {
        b = {ui: () => tog('ui')}
        // we pull a tray of buttons out
        togs.ui && ex(b, {
            Kom: calc,
            o: () => tog('dump'),
            P:() => tog('Proper'),
            l:() => tog('leveladjs'),
        })
        // for some reason the above 'b = ...'
        //   is not enough to react <But {b}/>
        //  but 'togs[t] = ...' gets us here
        //   though it requires that '$: ..., togs'
        // so we make a cache version, see {#key bid}
        bid = joint(haks(b))
    }
    $: leve(),togs

</script>

{#if s.c.consoley}
    <h4>consoley!</h4>
{/if}

{#if be}
<div class={clas}>
    {#key bid}<But {b} />{/key}
    <Knob bind:value={level} min=0 max=5 step=1 />
    <Textin bind:v={msg} />
    {#if delta != null}
        <span>{delta}s</span>
    {/if}
    {#if diff}
        {#each diff as n}
        <zo>
            <zc>{n.t}</zc>
            <Diff diff={n.sc.z}/>
        </zo>
        {/each}
    {/if}
    {#if togs.Proper}
        <Proper {C} {s} ig="level,msg"/>
        {#if be}
            <div>y&be <Proper {C} s={be} /></div>
        {/if}
    {/if}

</div>
{/if}
    
<!-- data dump -->

    {#if s.c.look}
        <Coning t="look" C={s.c.look} noC=2  />
    {/if}
    {#if togs.dump}
        <Coning t="s" C={s} noC=2 />
    {/if}


<style>
    .going { opacity: 0.5; }
    /* div * { display:inline-block } */
    .ok { color: green }
    .error { color: red }
    zo {
        background-color: rgba(12, 15, 34, 0.418);
        border: 0.12em dotted rgb(114, 250, 159);
        border-radius: calc(max(0.4em, 15%));
        font-size: 86%;
        display:inline-table;
    }
    zc {
        color:rgb(173, 173, 189);
        display:table-cell;
    }
</style>