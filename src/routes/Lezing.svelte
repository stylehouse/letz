<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { sto,ge } from './stores.js';
    import { Le } from "../lib/Le"
    export let look:Le = undefined

    let lems: string[] = []
    let lemit = 3
    let parseout = (Le) => {
        lems = Le.lems
        lems = lems.slice(0,lemit*5)
    }
    $: parseout(look)
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