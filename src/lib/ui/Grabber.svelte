<script lang="ts">
    import Coning from "$lib/Coning.svelte";
    import But from "$lib/ui/But.svelte";
    import {G,locate_ev} from "$lib/G";

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

    let b = {enL}
</script>
<svelte:window on:mousedown={enL2} />
<biggroup>
    <h1>Grabber</h1>
    <But {b}/>
    {#if on}click a thing{/if}
    ...
    {#if tar}<Coning t="ev.target" C={tar} />{/if}
</biggroup>