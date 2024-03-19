
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
    let updated = 0
    // sweep together (delay and singularise) calls to g.update()
    let updating = null
    let updatingHz = 2
    g.update = (to) => {
        if (!updating || updating != to) {
            if (!updating) {
                // the first call comes back:
                updating = {}
                setTimeout(() => { g.update(updating) }, 1000/updatingHz)
            }
        }
        else {
            updating = null
            charts = havs(g.charts)
            updated++
        }
    }

    // they have a collection of C%charts.$t = spam
    let list_charts = (C) => havs(C.sc.charts)
</script>

<biggroup>
    <h1 on:click={() => g.update()}>Charting v{updated}</h1>

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