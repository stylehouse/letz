
<script lang="ts">
    import {recur} from "$lib/Sv"
    import { onMount, onDestroy, createEventDispatcher } from "svelte"
    import {EditorState, Compartment} from "@codemirror/state"
    import {EditorView, keymap, ViewUpdate} from "@codemirror/view"
    import {defaultKeymap} from "@codemirror/commands"
    import {basicSetup} from "codemirror"
    import {stho} from "../lang/stho.ts";
    import {javascript} from "@codemirror/lang-javascript"
    # < https://github.com/replit/codemirror-minimap

    # < GOING:
	import { sto,ge } from './stores.js';
    const dispatch = createEventDispatcher()
    export let ele = undefined
    let updge = () => ge.update(ge => ge+'e')
    // < "Esc" should escalate committal of the editor contents


    # value
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
            console.log("value sub!!!")
        }
    }) )
    $overdub = &{
        cha({from:0, insert: "warp\n"})
    }


    # lang
    # the language is changeable
    # < nest grammars and everything instead?
    #    they would like some tractorgramming where to merge their definitions
    #     eg an expression on a line
    $langs = [stho,javascript]
    // selected lang
    export let lang = langs[0]
    $language = new Compartment
    $setlang = &lang,{
        view.dispatch({effects: language.reconfigure(lang())})
    }

    
    let startState = EditorState.create({
        doc: value,
        extensions: [
            language.of(lang()),
            
            EditorView.lineWrapping,
            keymap.of([{key:"Escape", run: () => {
                dispatch('kommit', {view})
                return 1
            }}]),
            EditorView.updateListener.of((v:ViewUpdate) => {
                if (v.docChanged) {
                // Document changed
                sto.set(view.state.doc.toString())
                }
            }),
            keymap.of(defaultKeymap),
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

<p>lang:
<select bind:value={lang} on:change={() => (setlang(lang))}>
    {#each langs as lang}
        <option value={lang}> {lang.name} </option>
    {/each}
</select></p>

<style type="css">
    .Codemirror {
        border: 3px solid black;
        min-height: 4em;
        min-width: 16em;
        max-height: 84em;
        max-width: 49em;
    }

    /* from a bot on fedi:
        Inch Worm #B2FF6C
        Persian Blue #382FB4
    */
    .moodyblue {
        color: #7d84ee;
    }
    .woodrush {
        color: #262906;
    }
</style>
