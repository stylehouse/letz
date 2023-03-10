<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte"
  import {EditorState} from "@codemirror/state"
  import {EditorView, keymap, ViewUpdate} from "@codemirror/view"
  import {
    LanguageSupport,
    LRLanguage
  } from "@codemirror/language"
  import {defaultKeymap} from "@codemirror/commands"
  import {basicSetup} from "codemirror"
	import { sto,ge } from './stores.js';
  let updge = () => ge.update(ge => ge+'e')

  const dispatch = createEventDispatcher()

  export let ele = undefined
  export let view: EditorView = undefined
  export let value = ""
  export let parser
  let language = LRLanguage.define({ parser: parser });
  let langsup = new LanguageSupport(language);

  // < "Esc" should escalate committal of the editor contents
  let firmup = (e,v) => {
    return 1
  }
  
  let startState = EditorState.create({
      doc: value,
      extensions: [
        langsup,
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
</script>

<style type="css">
  .Codemirror {
      border: 1px solid black
  }
</style>
<div class="Codemirror" bind:this={ele}></div>
<button on:click={() => updge()} > updge() </button>