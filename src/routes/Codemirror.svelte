<script context="module">
  import stho from '../lang/stho.ts'
  export let lang = stho()
</script>
<script lang="ts">
  import {recur} from "$lib/Sv"
  import { onMount, onDestroy, createEventDispatcher } from "svelte"
  import {EditorState} from "@codemirror/state"
  import {EditorView, keymap, ViewUpdate} from "@codemirror/view"
  import {defaultKeymap} from "@codemirror/commands"
  import {basicSetup} from "codemirror"
	import { sto,ge } from './stores.js';



  const dispatch = createEventDispatcher()

  let updge = () => ge.update(ge => ge+'e')


  export let ele = undefined
  export let view: EditorView = undefined
  export let value = ""

  // < "Esc" should escalate committal of the editor contents
  let firmup = (e,v) => {
    return 1
  }
  
  let startState = EditorState.create({
      doc: value,
      extensions: [
        lang,
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

<style type="css">
  .Codemirror {
      border: 3px solid black;
      min-height: 4em;
      min-width: 16em;
      max-height: 84em;
      max-width: 49em;
  }
</style>
<div class="Codemirror" bind:this={ele}></div>
<button on:click={() => updge()} > updge() </button>
{#if focus}FOCUS{/if}