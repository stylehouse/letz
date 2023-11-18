<script lang="ts">
    import { G } from "$lib/G";
    import But from "$lib/ui/But.svelte";
    import { getContext, get_current_component, onDestroy, onMount, setContext } from 'svelte/internal';

    let on = 0
    function enL() {
        on = 1
    }
    function enL2(ev) {
        if (!on) return
        on = 0
        ev.preventDefault()
        setContext
        // < ev.target.parentNode loop until 
        console.log({target:ev.target,name:ev.target.name})
        const co = get_current_component();
        if (co) {
            // Your logic here
            console.log({co,name:co.constructor.name})

        }
    }

    let A = G('3')
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
</biggroup>