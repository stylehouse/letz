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
    import Knob from '@bismuthsoft/svelte-dj-knob';
    

    
    let b = ':3'
    console.log("<Code/>")
    let start = "# yeti etc\ni thung/with/etc\n\n[y]\nS o yeses/because/blon_itn\n  yapto\n  o figura/datch/#chang\n"

    let code = writable(start)

    
    

    // this was not a '# comment'
    let look:Le
    let graph
    let save
    function kommit({detail:{view}}) {
        whatsup(view)
        
    }
    function whatsup(view) {
        look = whatsthis(view.state)
        save = look.y.state
        graph = graphwhats(look)
        console.log("Yup")
        // look = graph
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
    let sizer = 50
</script>


<div class="mi fathandle" style="left:0%;width:{sizer}%;">
    <div>
        <span on:click={() => more = !more}>{#if more}no {/if}more?</span>
        {#if more}
        <BigGroup>
            <CompileLite />

            <Diring t="Direr" />

            <PlayDramatics />
    </BigGroup>
        {/if}

        <button on:click={() => overdub()}> req! </button>
        <button on:click={() => bang()}> ✴ </button>
        <span>
            <Savable C={save} t='Codestate' {resume}/>
        </span>
    </div>
    <div>
        <BigGroup>
            <p>{b}</p>
            <Codemirror {code} bind:this={cm} on:kommit={kommit} />
            {#if look}<Coning t="Le-look" C={look} style=display:block />{/if}
        </BigGroup>

    </div>
    <span style="position:fixed; top:1em; right: calc(100% - {sizer}%);">
        <span> size:<Knob bind:value={sizer}
            min=0 max=100 step=2 size="3rem" /> </span>
    </span>
</div>

<div class="mi" style="left:{sizer}%;width:{100-sizer}%;">
        {#if graph} 
            <BigGroup>
                <Graph {graph} />
            </BigGroup>
        {/if}
</div>
<style>
    .mi {
        position:absolute;
        height:100%;
        width:50%;
        overflow:scroll;
    }
    div {
        display:block;
    }
    span {
        display:inline-block;
    }



</style>