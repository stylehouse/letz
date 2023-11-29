<script>
    import { createEventDispatcher, onMount } from 'svelte'
    import { hak,ex } from "$lib/Y/Pic"
    import { pit,o_up } from "$lib/St"
    import { Construct } from "$lib/Co"
    import { G,Recollect,Aroundiness } from "$lib/G";
    import But from "$lib/ui/But.svelte";
    import Coning from "$lib/Coning.svelte";
	const dispatch = createEventDispatcher();
    // Reco we know about, eg from a remote. changes slower than Rec.
    let N = []
    let g = G(1)

    // we are in a -Con(s)/-Rec:C
    export let C
    let Con = C.y.up
    // aka guest
    let s = Con.c.s
    if (!s.c.pi == 'Rec') throw "!Rec"
    //  will be asked for later...
    g.haveC(s)
    // however, some -Rec are just folders...
    // < invent a new pi, not needing a .svelte file - define it in mind.pi.such?
    let real = s.c.real || s.c.This && 1
    // this is a bunch of bunches of commits
    let slook
    let slo = () => {
        if (s.c.been) {
            slook = Aroundiness(s)
        }
    }
    $: slo(), s

    let path = o_up(s,{until: (s) => s.c.pi != 'Rec',inc:1}).reverse()
    let dir = path.map(s => s.t).join("/")
    

    s.y.wake = () => {
        console.log("guest wake(): "+dir)
        dispatch('reCon')
        s = s
    }

    let string = ''
    let dige

    
    g.o((Reco) => {
        string = Reco.string
        dige = Reco.dige
        N = N

        let The = g.slope[3]
        let sect = path[1].t
        // a state -> guest%*
        The.o_done(sect,Reco,s)
    })
    let rec = () => real && Recollect(g,s,N)
    $: rec(), s

    let extras
    $: extras = hak(N) > 1 && hak(N)-1

    let b = {rec}
</script>


{#if real}
    <But {b} />
    {#if extras}+{extras} more{/if}
    {#if slook}<Coning t="guest" C={slook} noC=2 />{/if}
{/if}
{#if s.sc['░']}ipfslink{/if}
{#if dige}
    <pre>{dige}
{string}</pre>
{/if}