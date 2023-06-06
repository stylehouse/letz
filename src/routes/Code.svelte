<script lang="typescript">
	import { onMount } from 'svelte';
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
	import { sto } from './stores.js';
    import { Le } from "$lib/Le"
    import { St_main, St_loop, ex } from "$lib/St"
    import { Construct, sip_dispatch } from "$lib/Co"
    import Diring from "$lib/Diring.svelte"
    import Con from '$lib/pi/Con.svelte'
    import { stylehouse_lite } from "$lib/Compile.js"
    
    import grammar from '../lang/style.grammar?raw'
    import { buildParser } from '@lezer/generator'
    let parser = buildParser(grammar)

    let b = ':3blatant'


    console.log("Code")

    let a = $page.url.searchParams
    function para () {
        let args = {}
        for (let k of a.keys()) {
            args[k] = a.get(k)
        }
        return args
    }


    
    // < ping changes carefully
    let sipd = new sip_dispatch()

    let moment = 0

    let laCon
    let con
    function reset_tocon() {
        laCon = undefined
        sipd.reset()
    }
    // scan into (-Con/(-Cont|-Conz))**
    function tocon(dat) {
        //con = toCon({s:dat,D:laCon})
        con = Construct({t:'Writers',s:dat,D:laCon})
        laCon = con
        // set up stores to update them all (con.c.visit[Con+])
        sipd.setN(con.c.visit)
        moment = moment+1
    }
    let dat
    let refresh = 0
    function bleep() {
        dat = St_main()
        reset_tocon()
        tocon(dat)
        // repeated bleep()s version negatively (then dat.i -> 1,2,3...)
        conver = conver < 0 ? conver - 1 : -1
        con = con
        refresh = 0
    }
    let mind
    function bloop() {
        !dat && bleep()
        dat = St_loop(dat)
        if (dat.mind) mind = dat.mind
        if (dat.i % 2) {
            delete dat.mind
        }
        else {
            dat = {A:dat.a,mind,...dat}
        }
        dat.args = para()
        tocon(dat)
        refresh = dat.i
        console.log('bloop! '+refresh)
        //a.set('ierorag',dat.i)
        //goto(`?${a.toString()}`)
    }
    $: moment, sipd.sync()
    $: refresh && sipd.refreshN(con.c.wake)
    

    let conver = 0
    function reconver() {
        conver = conver + 1
    }
    let keys = {w: bloop, e: bleep, r: reconver}
    let handleKeydown = (event) => {
        let y = keys[event.key]
        y && y()
    }
    onMount(() => {
        bloop()
    })

    # yes
    // blatant
    let compiler = source => ex({source}, stylehouse_lite(source))
    let compiled = compiler("and...\n# < notwicably\n    $art = 5\n'bla"+"tant figs'\n    things and logs and stuff\nelse near\n")
    
    // lezer
        let flub = "i thung/with/etc\n\no yeses/because/blatant\n"
        sto.set(flub)

    // EditorView
	    import Codemirror from './Codemirror.svelte';
	    import Lezing from './Lezing.svelte';

    # this was a '# comment'
    let look:Le = undefined
    'one thing'
    'thince blatant'
    function dobla({detail:{view}}) {
        look = new Le(view.state)
        dat.look = look
        tocon(dat)
    }
    let junk = [1,3,5,[6,[6,[6,[[6,[2]]]]]]]
</script>



<svelte:window on:keydown={handleKeydown}/>
<button on:click={() => bleep()} > bleep() </button>
<button on:click={() => bloop()} > bloop() </button>
<button on:click={() => reconver()} > reconver({conver}.{refresh}) </button>

<pre><table>
    {#each Object.entries(compiled) as [k,v]}
    <tr>
        <td><h1>{k}</h1></td>
        <td>{v}</td>
    </tr>
    {/each}
</table></pre>

<Diring t="Direr"/>

{#if con}
{#key conver}
//   <p> <Con C={con}/> </p>
{/key}
{/if}




<p> {b} </p>
<Codemirror value={$sto} {parser} on:kommit={dobla}></Codemirror>
{#if look}<Lezing {look}></Lezing>{/if}
