<script lang="ts">
    import Coning from "$lib/Coning.svelte";
    import { G,Recollect,TheRec } from "$lib/G";
    import But from "./But.svelte";
    export let Rec:TheRec
    // Reco we know about, eg from a remote. changes slower than Rec.
    let N = []

    let string = ''
    let dige
    export async function show_something(Reco) {
        string = Reco.string
        dige = Reco.dige
    }
    let rec = () => Recollect(Rec,N)
    rec()
    let b = {rec}
</script>
<h1>Reco</h1>
<But {b} />
<Coning t="Rec {Rec.This.name}" C={Rec.This.C} />
{#if dige}
    <pre>{dige}
{string}</pre>
{/if}