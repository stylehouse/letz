<script lang="ts">
    import Coning from "$lib/Coning.svelte";
    import Reco from "$lib/ui/Reco.svelte";
    import { G,locate_ev } from "$lib/G";
    import But from "$lib/ui/But.svelte";
    import { havs,dig, sha256 } from '$lib/Y/Pic.ts'


    import { getContext, get_current_component, onDestroy, onMount, setContext, tick } from 'svelte/internal';

    // this puts our name out there (Record), which others g.send() to
    let g = G(3)
    // invoking this receiver
    let recording = []
    g.rerecord = re => recording = re

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
    {#each recording as Rec (Rec.This.name) }
        <Reco {Rec} />
    {/each}
    {#if fourg}<Coning t="look at g" C={fourg} noC=1 />{/if}
</biggroup>