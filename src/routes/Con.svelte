<script lang="ts">
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import { St_main, St_loop, ex } from "$lib/St"
    import { Construct, sip_dispatch } from "$lib/Co"
    import Con from '$lib/pi/Con.svelte'

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
</script>


<svelte:window on:keydown={handleKeydown}/>
<button on:click={() => bleep()} > bleep() </button>
<button on:click={() => bloop()} > bloop() </button>
<button on:click={() => reconver()} > reconver({conver}.{refresh}) </button>


{#if con}
{#key conver}
//   <p> <Con C={con}/> </p>
{/key}
{/if}