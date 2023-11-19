<script lang="ts">
    import Coning from "$lib/Coning.svelte";
    import { G,locate_ev } from "$lib/G";
    import But from "$lib/ui/But.svelte";

    import { getContext, get_current_component, onDestroy, onMount, setContext } from 'svelte/internal';

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

    let A = G(3)
    let b = {enL,doing:()=>{
        A.co.late("Stuff")
    }}
</script>
<svelte:window on:mousedown={enL2} />
<biggroup>
    <h1>Record</h1>
    <But {b}/>
    {#if on} />{/if}
    ...
    {#if tar}<Coning t="ev.target" C={tar} />{/if}
</biggroup>