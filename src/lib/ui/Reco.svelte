<script lang="ts">
    import Coning from "$lib/Coning.svelte";
    import { G,Recollect,TheRec } from "$lib/G";
    import But from "./But.svelte";
    export let Rec:TheRec
    // Reco we know about, eg from a remote. changes slower than Rec.
    let N = []
    let g = G(1)

    let string = ''
    let dige
    g.o((Reco) => {
        string = Reco.string
        dige = Reco.dige
    })
    let rec = () => Recollect(g,Rec,N)
    $: rec(), Rec
    let b = {rec}
</script>
<h1>Reco</h1>
<But {b} />
<Coning t="Rec {Rec.This.name}" C={Rec.This.C} noC=2 />
{#if dige}
    <pre>{dige}
{string}</pre>
{/if}