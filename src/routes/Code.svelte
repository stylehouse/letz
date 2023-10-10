<script lang="ts">
    import Graph from "$lib/gra/Graph.svelte"
    import PlayDramatics from "./PlayDramatics.svelte"
    import { whatsthis } from "$lib/Le"
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
    function kommit({detail:{view}}) {
        let text = view.state.doc.toString()
        look = whatsthis(view.state)





        graph = {
            nodes: [
                { id: 'N1', label: 'Start' },
                { id: 'N2', label: '4' },
                { id: 'N4', label: '8' },
                { id: 'N5', label: '15' },
                { id: 'N3', label: '16' },
                { id: 'N6', label: '23' },
                { id: 'N7', label: '42' },
                { id: 'N8', label: 'End' }
            ],

            edges: [
                { id: 'E1', source: 'N1', target: 'N2' },
                { id: 'E2', source: 'N2', target: 'N3' },
                { id: 'E3', source: 'N3', target: 'N6' },
                { id: 'E4', source: 'N2', target: 'N4' },
                { id: 'E5', source: 'N4', target: 'N5' },
                { id: 'E6', source: 'N5', target: 'N4', label: '2' },
                { id: 'E7', source: 'N5', target: 'N6' },
                { id: 'E8', source: 'N6', target: 'N7' },
                { id: 'E9', source: 'N7', target: 'N7', label: '3' },
                { id: 'E10', source: 'N7', target: 'N8' }
            ],
        }
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
    <biggroup>
        <Graph {graph}></Graph> 
    </biggroup>
{/if}


