<script lang="ts">
    import Graph from "$lib/gra/Graph.svelte"
    import BigGroup from "$lib/ui/BigGroup.svelte"
    import Savable from "$lib/ui/Savable.svelte"
    import PlayDramatics from "./PlayDramatics.svelte"
    import { whatsthis,graphwhats } from "$lib/Le"
    import Diring from "$lib/Diring.svelte"
    import Codemirror from './Codemirror.svelte'
    import Coning from '$lib/Coning.svelte'
    import CompileLite from './CompileLite.svelte'
    import { writable } from 'svelte/store'
    import {EditorView} from "@codemirror/view"
    

    
    let b = ':3'
    console.log("<Code/>")
    let start = "# yeti etc\ni thung/with/etc\n\n\nS o yeses/because/blon_itn\n  yapto\n  o figura/datch/#chang\n"

    let code = writable(start)

    
    

    // this was not a '# comment'
    let look:Le
    let graph
    let save
    function kommit({detail:{view}}) {
        let text = view.state.doc.toString()
        look = whatsthis(view.state)
        
        save = look.y.state
        

        graph = graphwhats(look)
        //look = graph
        
    }
    let junk = [1,3,5,[6,[6,[6,[[6,[2]]]]]]]

    async function overdub() {
        let res = await fetch('http://s:8000/5835ea2230e6b4ee2b6c3645038ccaa54c110c01f0a2bfa4cefabf32ffe008bd')
        code.set(await res.text())
    }
    function bang() {
        throw "cake"
    }
    let more = 0



    let floatation
</script>

<p on:click={() => more = !more}>{#if more}no {/if}more?</p>
{#if more}
<CompileLite />

<Diring t="Direr" />

<PlayDramatics />
{/if}

<button on:click={() => overdub()}> req! </button>
<button on:click={() => bang()}> ✴ </button>

<biggroup>
    <p>{b}</p>
    <Codemirror {code} on:kommit={kommit} />
    {#if look}<Coning t="Le-look" C={look} style=display:block />{/if}
</biggroup>

{#if graph} 
    <BigGroup>
        <Graph {graph} />
    </BigGroup>
{/if}
{#if save} 
    <BigGroup>
        <Savable C={save} />
    </BigGroup>
{/if}


