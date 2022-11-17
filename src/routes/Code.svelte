<script lang="ts">
	import { onMount } from 'svelte'
    import {parser} from '../lang/style.js'
    let b = ':3'

    // lezer
        let flub = "i thing/with/etc\n\no yeses/because\n"
        let tree = parser.parse(flub)
        let cursor = tree.cursor()
        let lems = []
        while (cursor.next()) {
            lems.push(`Node ${cursor.name} from ${cursor.from} to ${cursor.to}`)
        }

    // EditorView
        import {EditorState} from "@codemirror/state"
        import {EditorView, keymap} from "@codemirror/view"
        import {defaultKeymap} from "@codemirror/commands"

        let startState = EditorState.create({
            doc: flub,
            extensions: [keymap.of(defaultKeymap)]
        })
        
        let ele
        let view
        onMount(() => {
            view = new EditorView({
                state: startState,
                parent: ele
            })
        })
</script>


<p> {b} </p>
<div bind:this={ele}></div>
<ul >
    {#each lems as lem}
        <li> {lem} </li>
    {/each}
</ul>