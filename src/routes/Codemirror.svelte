<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte"
  import {EditorState, Prec} from "@codemirror/state"
  import {EditorView, keymap} from "@codemirror/view"
  import {defaultKeymap} from "@codemirror/commands"
	import { sto,ge } from './stores.js';
  let updge = () => ge.update(ge => ge+'e')

  const dispatch = createEventDispatcher()

  export let ele
  export let view: EditorView
  export let value = ""

  // possible...
  let via_store = (e) => {
    let val = view.state.doc.toString()
    value = val+"thiryto"
    sto.set(value)
    console.log("Yep",value)
  }
  let via_dispatch = (e) => {
    console.log("Inniyt")
    view.dispatch(view.state.replaceSelection("★"))
    0 && dispatch('kommit', {text: view.state.doc.toString()})
    return 1
  }

  let startState = EditorState.create({
      doc: value,
      extensions: [
        keymap.of(defaultKeymap),
        Prec.high(keymap.of([{key:"Escape", run: via_dispatch}])),
        EditorView.updateListener.of((v:ViewUpdate) => {
            if (v.docChanged) {
              // Document changed
              sto.set(view.state.doc.toString())
            }
        }) 
      ]
  })
  

  onMount(() => {
    view = new EditorView({
        state: startState,
        parent: ele
    })

    // editor.on("change", (e: Editor) => {
    //   dispatch("change", e);
    // });
    // editor.on("scroll", (e: Editor) => {
    //   dispatch("scroll", e);
    // });
  })
</script>

<style type="css">
  .Codemirror {
      border: 1px solid black
  }
</style>
<div class="Codemirror" bind:this={ele}></div>
<button on:click={updge}></button>
