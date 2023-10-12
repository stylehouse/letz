<script lang="ts">
    import Graph from "$lib/gra/Graph.svelte"
    import BigGroup from "$lib/ui/BigGroup.svelte"
    import Savable from "$lib/ui/Savable.svelte"
    import PlayDramatics from "./PlayDramatics.svelte"
    import { whatsthis,graphwhats,resume_selection_state } from "$lib/Le"
    import Diring from "$lib/Diring.svelte"
    import Codemirror from './Codemirror.svelte'
    import Coning from '$lib/Coning.svelte'
    import CompileLite from './CompileLite.svelte'
    import { writable } from 'svelte/store'
    import {EditorView} from "@codemirror/view"
    import { tick } from "svelte";
    

    
    let b = ':3'
    console.log("<Code/>")
    let start = "# yeti etc\ni thung/with/etc\n\n\nS o yeses/because/blon_itn\n  yapto\n  o figura/datch/#chang\n"

    let code = writable(start)

    
    

    // this was not a '# comment'
    let look:Le
    let graph
    let save
    function kommit({detail:{view}}) {
        whatsup(view)
        
    }
    function whatsup(view) {
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
    // < explore bind:view={view} and Codemirror export let view?
    let cm = null

    async function resume(C) {
        resume_selection_state(cm.view,C)
        whatsup(cm.view)
    }

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
    <Codemirror {code} bind:this={cm} on:kommit={kommit} />
    {#if look}<Coning t="Le-look" C={look} style=display:block />{/if}
</biggroup>

{#if graph} 
    <BigGroup>
        <Graph {graph} />
    </BigGroup>
{/if}

<p>
    <Savable C={save} t='Codestate' {resume}/>
</p>

