
<script lang="ts">
    import { Named } from "$lib/Gap";
    import { havs } from "$lib/Y/Pic";
    import Chart from '$lib/ui/Chart.svelte';

    let g = Named("Chart")
    g.charts ||= {}
    g.input = (C) => {
        g.charts[C.t] = C
        g.update()
        return g
    }
    let charts = []
    g.update = () => charts = havs(g.charts)
    // they have a collection of charts.$t = spam
    let list_charts = (C) => havs(C.sc.charts)
</script>
<biggroup>
    <h1 on:click={() => g.update()}>Charting</h1>

    {#each charts as n (n.t)}
        <h2>{n.t} -></h2>
        {#each list_charts(n) as spam (spam.t)}
            <h3>{spam.t} -></h3>
            <Chart {spam} />
            
        {/each}
    {/each}
</biggroup>
<style>
    h1,h2,h3 {
        color:darkseagreen;
        margin:0.2em;
    }
</style>