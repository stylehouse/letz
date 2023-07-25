<script lang="ts">
	import { sto } from './stores.js'
    import PlayDramatics from "./PlayDramatics.svelte"
    import { Le } from "$lib/Le"
    import Diring from "$lib/Diring.svelte"
    import Codemirror from './Codemirror.svelte'
    import Lezing from './Lezing.svelte'
    import CompileLite from './CompileLite.svelte'
    
    let b = ':3'
    # otherlang
    console.log("<Code/>")



    // lezer
        let flub = "# etc etc\ni thung/with/etc\n\no yeses/because/blatant\n"
        sto.set(flub)

    // EditorView

    # this was a '# comment'
    let look:Le = undefined
    function dobla({detail:{view}}) {
        look = new Le(view.state)
        # < elvis it over there!
        # dat.look = look
        # tocon(dat)
    }
    let junk = [1,3,5,[6,[6,[6,[[6,[2]]]]]]]

    async function overdub() {
        $res = await fetch('http://s:8000/5835ea2230e6b4ee2b6c3645038ccaa54c110c01f0a2bfa4cefabf32ffe008bd')
        
        sto.set(res.text())
    }
</script>

<CompileLite/>

<Diring t="Direr"/>

<PlayDramatics/>

<button on:click={() => overdub()} > ✴req </button>


<biggroup>
<p> {b} </p>
<Codemirror value={$sto} on:kommit={dobla}></Codemirror>
{#if look}<Lezing {look}></Lezing>{/if}
</biggroup>
