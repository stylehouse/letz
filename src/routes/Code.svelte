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
        $res = await fetch('http://s:8000/7f6e164950d918f69148a849f59a89b5fc1483d5c15ffbe8018ae8a5c532c45e')
        
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
