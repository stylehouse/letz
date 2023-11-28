<script lang="ts">
    import Coning from "$lib/Coning.svelte";
    import { G} from "$lib/G";
    import But from "$lib/ui/But.svelte";
    import Con from "$lib/pi/Con.svelte"
    import { Construct } from '$lib/Co'
    import { C_ } from '$lib/St'
    import { havs,dig, sha256 } from '$lib/Y/Pic'


    import { getContext, get_current_component, onDestroy, onMount, setContext, tick } from 'svelte/internal';

    // this puts our name out there (Record), which others g.send() to
    let g = G(3)
    // which fills this out:
    export let C = C_('Record',1,{pi:'Rec'})
    g.haveC(C,s => C = s)
    $: C.y.wake = async () => { await tick(); ring() }
    
    g.guest_done = (s) => {
        g.transceive(s)
    }
    
    // bloop!!
    let D
    async function ring() {
        D = Construct({I:{Pi:1},s:C,D})
        // < pipe into step 2
    }
    onMount(() => {
      // Fetch?
      ring()
    });




    let fourg
    function look_at_g() {
        // fourg = g.slope[4]
        fourg = g
    }
    
    let on = 0
    function enL() {
        on = 1
    }
    let tar = {}
    function enL2(ev) {
        if (!on) return
        on = 0
        ev.preventDefault()
        let E = locate_ev(ev)
        console.log(E)
        tar = E
    }

    async function ipfs_test() {

        let default_blob = "# yeti etc\ni thung/with/etc\n\n[y]\nS o yeses/because/blon_itn\n  yapto\n  o figura/datch/#chang\n"
        let t = await sha256(default_blob)
        let para = {t}
        // z becomes comma-separated, server knows this means array
        // para.z = ['blah', 'fort']
        let params = new URLSearchParams(para);
        let res = await fetch(
            `/ipfs?${params.toString()}`,
            {method:'POST',body:default_blob}
        )
        tar = await res.text()
    }

    let flee
    onMount(async () => {
        flee = await sha256("Theis")
        // setTimeout(() => look_at_g(), 10)
    })
    let upg = () => g.counti = (g.counti ?? 0) + 1

    let b = {enL,ipfs_test,look_at_g,upg}
</script>
<svelte:window on:mousedown={enL2} />
<biggroup>
    <h1>Record i={g.counti||0}</h1>
    <But {b}/>
    {#if on}click a thing{/if}
    ...
    {#if tar}<Coning t="ev.target" C={tar} />{/if}
    {#if D}
        <Coning t="theD" C={D} />
        <Con C={D} />
    {/if}
    {#if fourg}<Coning t="look at g" C={fourg} noC=1 />{/if}
</biggroup>