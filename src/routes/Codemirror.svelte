<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte"
  import {EditorState} from "@codemirror/state"
  import {EditorView, keymap} from "@codemirror/view"
  import {defaultKeymap} from "@codemirror/commands"

  const dispatch = createEventDispatcher()

  export let ele
  export let view: EditorView
  export let value = ""

  let startState = EditorState.create({
      doc: value,
      extensions: [keymap.of(defaultKeymap)]
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
