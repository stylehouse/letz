<script context="module">
    import stho from "../lang/stho.ts";
    export let lang = stho();
</script>

<script lang="ts">
    import {recur} from "$lib/Sv"
    import { onMount, onDestroy, createEventDispatcher } from "svelte"
    import {EditorState} from "@codemirror/state"
    import {EditorView, keymap, ViewUpdate} from "@codemirror/view"
    import {defaultKeymap} from "@codemirror/commands"
    import {basicSetup} from "codemirror"
	import { sto,ge } from './stores.js';
    # < https://github.com/replit/codemirror-minimap

    $garbage = []
    onDestroy(() => garbage.map(y => y()))
    // to sync these two
    export let code
    let view: EditorView = undefined
    $cha = &{
        view.dispatch({changes:[...arguments]})
    }
    // subscribe for init and more
    let value
    garbage.push( code.subscribe((v) => {
        value = v
        if (view) {
            // view and "load into codemirror"
            $was = view.state.doc.toString()
            cha({from:0, to:was.length, insert: value})
            console.log("value sub!")
        }
    }) )
    function overdub() {
        cha({from:0, insert: "warp\n"})
    }

    const dispatch = createEventDispatcher()
    export let ele = undefined
    let updge = () => ge.update(ge => ge+'e')
    // < "Esc" should escalate committal of the editor contents
  

    let startState = EditorState.create({
        doc: value,
        extensions: [
            lang,
            EditorView.lineWrapping,
            keymap.of([{key:"Escape", run: () => {
                dispatch('kommit', {view})
                return 1
            }}]),
            keymap.of(defaultKeymap),
            EditorView.updateListener.of((v:ViewUpdate) => {
                if (v.docChanged) {
                // Document changed
                sto.set(view.state.doc.toString())
                }
            }),
            basicSetup
        ]
    })

  
    onMount(async () => {
        // now that ele has a value
        view = new EditorView({
            state: startState,
            parent: ele
        })
    })
    $focus
    recur(() => {
        focus = view.hasFocus
    })
</script>

<div class="Codemirror" bind:this={ele} />
<button on:click={() => updge()}> updge() </button>
<button on:click={() => overdub()}> overdub </button>
{#if focus}FOCUS{/if}

<style type="css">
    .Codemirror {
        border: 3px solid black;
        min-height: 4em;
        min-width: 16em;
        max-height: 84em;
        max-width: 49em;
    }
</style>
