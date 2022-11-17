<script lang="ts">
	import { onMount } from 'svelte'
	import { sto } from './stores.js';
    import {parser} from '../lang/style.js'
    let b = ':3'
    let lemit = 3

    // lezer
        let flub = "i thing/with/etc\n\no yeses/because\n"
        sto.set(flub)

        let parseout = s => {
            let tree = parser.parse(s)
            let cursor = tree.cursor()
            while (cursor.next()) {
                lems.push(`Node ${cursor.name} from ${cursor.from} to ${cursor.to}`)
            }
            lems = lems.slice(0,lemit*10)
        }
        let lems: string[] = []
        function flurb(event) {
            console.log("Parsed!!"+event.detail.text)
            parseout(event.detail.text)
        }
        sto.subscribe(flub => {
            console.log("Parstores!!"+flub)
            parseout(flub)
        })
        parseout($sto)

    // EditorView
	    import Codemirror from './Codemirror.svelte';

</script>

<p> {b} </p>
<Codemirror value={$sto} on:message={flurb}></Codemirror>
<label>
    {lemit} <input type=range bind:value={lemit} min=0 max=10>
</label>
<ul>
    {#each lems as lem}
        <li> {lem} </li>
    {/each}
</ul>