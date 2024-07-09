<script>
    import { createEventDispatcher, onMount } from 'svelte'
    import { hak,ex } from "$lib/Y/Pic"
    import { pit,o_up } from "$lib/St"
    import { Construct } from "$lib/Co"
    import { G } from "$lib/G";
    import { Recollect,Aroundiness } from "$lib/treeing/Betimes";
    import But from "$lib/ui/But.svelte";
    import Coning from "$lib/Coning.svelte";
	const dispatch = createEventDispatcher();
    // Reco we know about, eg from a remote. changes slower than Rec.
    let N = []
    let co = {}
    let g = G(1,co)

    // we are in a -Con(s)/-Rec:C
    export let C
    let Con = C.y.up
    // aka guest
    let s = Con.c.s
    if (!s.c.pi == 'Rec') throw "!Rec"
    //  will be asked for later...
    // g.haveC(s)
    // however, some -Rec are just folders...
    // < invent a new pi, not needing a .svelte file - define it in mind.pi.such?
    let real = s.c.real || s.c.This && 1

    let string = ''
    let dige
    let slook
    let errors
    let ok
    let sto
    let slo = async () => {
        // sc&been datadumps deps
        //  it used to do Aroundiness(s) here
        slook = s.y.slook
        // things get this as they are stored
        sto = s.y.store
        if (sto) {
            if (sto.sc.errors) errors = sto.sc.errors
            if (sto.sc.ok) ok = 1
        }
        // on the origin side (s.y.be) from a s.y.store there was s.y.Reco:
        string = s.y.Reco?.sc.string
        dige = s.y.Reco?.sc.dige
        N = s.y.collect?.sc.z
        // s = s
    }
    

    let path = o_up(s,{until: (s) => s.c.pi != 'Rec',inc:1}).reverse()
    let dir = path.map(s => s.t).join("/")
    

    s.y.wake = () => slo()
    let rec = () => s.y.wake()
    $: rec(), s

    let extras
    $: extras = hak(N) > 1 && hak(N)-1

    let o = () => tog('dump')
    let b = {rec,o}
    let togs = {}
    let tog = (t) => {
        togs[t] = !togs[t]
    }
</script>

<But {b} />
{#if real}
    {#if extras}+{extras} more{/if}
{/if}

{#if s.sc['░']}ipfs{/if}

{#if dige}
    <span on:click={()=>tog('string')}>{ dige.slice(0,12) }</span>
    
    {#if togs.string}<pre>{string}</pre>{/if}
{/if}

<!-- data dump -->

{#if togs.dump}
    <Coning t="s" C={s} noC=2 />
{/if}

<!-- /been/ data -->
{#if slook}
    <span on:click={()=>tog('slook')}>slook?</span>
    
    {#if togs.slook}
        <Coning t="guest" C={slook} noC=2 />
    {/if}
{/if}

<!-- if s.y.store -->
{#if sto}
    {#if errors}
        <span class="ok">Errors:</span>
            <Coning C={errors} />
    {/if}
    {#if ok}<span class="ok">OK</span>{/if}

    <span on:click={()=>tog('sto')}>sto?</span>
    {#if togs.sto}
        <Coning t="sto" C={{s,sto}} noC=2 />
    {/if}
{/if}

    
<style>
    .ok { color: green }
    .error { color: red }
</style>