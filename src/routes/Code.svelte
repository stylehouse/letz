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

        let lemit = 3
</script>

<p> {b} </p>
<Codemirror value={flub}></Codemirror>
<label>
    {lemit} <input type=range bind:value={lemit} min=0 max=10>
</label>
<ul >
    {#each lems.slice(0,lemit*10) as lem}
        <li> {lem} </li>
    {/each}
</ul>