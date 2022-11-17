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
	import Codemirror from './Codemirror.svelte';
</script>

<p> {b} </p>
<Codemirror value={flub}></Codemirror>
<ul >
    {#each lems as lem}
        <li> {lem} </li>
    {/each}
</ul>