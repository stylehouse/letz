<script lang="ts">
    import Graph from "$lib/gra/Graph.svelte"
    import BigGroup from "$lib/ui/BigGroup.svelte"
    import Savable from "$lib/ui/Savable.svelte"
    import Knob from '$lib/ui/Knob.svelte';
    import But from "$lib/ui/But.svelte"
    import PlayDramatics from "./t/PlayDramatics.svelte"
    import TestBetimes from './t/TestBetimes.svelte'
    import CompileLite from './t/CompileLite.svelte'
    import Diring from "$lib/Diring.svelte"
    import Charting from "$lib/Charting.svelte"
    import { whatsthis,graphwhats,resume_selection_state } from "$lib/Le.svelte"
    import Codemirror from './Codemirror.svelte'
    import Coning from '$lib/Coning.svelte'
    import { writable } from 'svelte/store'
    import {EditorView} from "@codemirror/view"
    import { onMount, setContext, tick } from "svelte";
    import Record from "./Record.svelte";
    
    // < be the W we are currently in
    //   have its ioing from a mind interpreting things
    //   usually a code
    //   higher levels sprout
    // as above but for many things, eg Names.Charts and their io
    setContext('Names',{})
    
    let b = {}
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
        // look = graph
    }
    let junk = [1,3,5,[6,[6,[6,[[6,[2]]]]]]]

    
    b.req = async function overdub() {
        let res = await fetch('http://s:8000/5835ea2230e6b4ee2b6c3645038ccaa54c110c01f0a2bfa4cefabf32ffe008bd')
        code.set(await res.text())
    }
    b['✴'] = function bang() {
        throw "cake"
    }
    let more = 0
    // < explore bind:view={view} and Codemirror export let view?
    let cm = null


    
    async function resume(C) {
        resume_selection_state(cm.view,C)
            && whatsup(cm.view)
    }

    export function extra(t) {
        debugger
    }
    let sizer = 50
    
    let reset_TestBetimes = () => {
        key_TestBetimes = key_TestBetimes + 1
    }
    let key_TestBetimes = 1
</script>


<div class="mi fathandle" style="left:0%;width:{sizer}%;">
    <div>
        {#key key_TestBetimes}<TestBetimes resetself={reset_TestBetimes}/>{/key}
        <span on:click={() => more = !more}>{#if more}no {/if}more?</span>
        {#if more}
            <BigGroup>

                <CompileLite />

                <Diring />

                <PlayDramatics />
            </BigGroup>
        {/if}

        <But {b}/>
        <span>
            <Savable C={save} t='Codestate' {resume}/>
        </span>
        <Record />
    </div>
    <div>
        <BigGroup>
            <Codemirror {code} bind:this={cm} on:kommit={kommit} />
            {#if look}<Coning t="Le-look" C={look} style=display:block />{/if}
        </BigGroup>

    </div>
    <span style="position:fixed; top:1em; right: min(calc(100% - {sizer}%), calc(100% - 2rem)); z-index:500">
        <Knob bind:value={sizer} min=0 max=100 step=2 size="2rem" />
    </span>
</div>

<div class="mi" style="left:{sizer}%;width:{100-sizer}%;">
        <Charting />
        <Diring />
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
        vertical-align: top;
    }
    span {
        display:inline-block;
    }



</style>