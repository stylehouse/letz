<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte"
  import {EditorState} from "@codemirror/state"
  import {EditorView, keymap, ViewUpdate} from "@codemirror/view"
  import {
    LanguageSupport,
    LRLanguage,
    syntaxTree
  } from "@codemirror/language"
  import {defaultKeymap} from "@codemirror/commands"
  import {basicSetup} from "codemirror"
	import { sto,ge } from './stores.js';
  let updge = () => ge.update(ge => ge+'e')

  const dispatch = createEventDispatcher()

    import gram from '../lang/style.grammar?raw'
  export let ele
  export let view: EditorView
  export let value = ""
  export let parser
  let language = LRLanguage.define({ parser: parser });
  let langsup = new LanguageSupport(language);

  // < "Esc" should escalate committal of the editor contents
  let firmup = (e) => {
    let str = view.state.sliceDoc(
      view.state.selection.main.from,
      view.state.selection.main.to
    )
    let here = view.state.selection.main.anchor
    let tree = syntaxTree(view.state)
    let cursor = tree.cursor()
    let lems = []
    while (cursor.next()) {
        lems.push(`Node ${cursor.name} from ${cursor.from} to ${cursor.to}`)
    }
    console.log("Treewalk:",lems)

    console.log("Fiup:",{here,tree});
    0 && view.dispatch(view.state.replaceSelection("★"))
    0 && dispatch('kommit', {text: view.state.doc.toString()})
    return 1
  }
  

  let startState = EditorState.create({
      doc: value,
      extensions: [
        langsup,
        keymap.of([{key:"Escape", run: firmup}]),
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
  

  onMount(() => {
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
<button on:click={updge}></button>
