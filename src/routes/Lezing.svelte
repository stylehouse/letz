<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { sto,ge } from './stores.js';
    import {parser} from '../lang/style.js'
    

    let lems: string[] = []
    let lemit = 3
    let parseout = (s: string) => {
        let tree = parser.parse(s)
        let cursor = tree.cursor()
        lems = []
        while (cursor.next()) {
            lems.push(`Node ${cursor.name} from ${cursor.from} to ${cursor.to}`)
        }
        lems = lems.slice(0,lemit*5)
    }
    let latest: string
    onDestroy(sto.subscribe(flub => {
        console.log("Parstores!!"+flub)
        latest = flub
        //parseout(flub)
        //lems = lems
    }))
    $: parseout(latest)
    $: lems.push("Yod")
    //parseout($sto)
</script>

<label>
    {lemit} <input type=range bind:value={lemit} min=0 max=10>
</label>
<ul>
    <p>mostly: {$ge}</p>
    {#each lems as lem}
        <li> {lem} </li>
    {/each}
</ul>