<script lang="ts">
	import { onMount } from 'svelte';
    import But from '$lib/ui/But.svelte';
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'
    import {TheA,C_,A_,i_,inlace,o_path,o_up} from "$lib/St"
    import { Construct, sip_dispatch } from "$lib/Co"
    import Con from '$lib/pi/Con.svelte'

//#region the main functions, mocked up -
    
    // have a play
    function St_main () {
        let A = C_('toplevel')
        A.c.ip = [1]

        let dub = St_writers(A)

        // make A1.sc.mind=Cmind /Cthing/Cact
        St_minds(A)

        // walk the A** tree with the mind
        return St_walkies(dub)
    }
    
    // walk the A** tree with the mind
    function St_walkies (A) {
        // o A^%mind (the to return a singular %mind above, not an array)
        let mind = o_up(A,{thes:'mind'})
        let branch = o_up(A)
        // TODO the nearest mind is branched out to index happenings for us here
        //   so various walkies can be reset, etc.
        // TODO interate mind
        let got = []
        o_path(mind,['mind','thing','act']) .map(({thing,act}) => {
            got.push({thing,act})
        })
        
        let dat = {A,mind,branch,got}
        return dat
    }
    // keep going, same things
    function St_loop (dat) {
        let A = dat.A
        dat.i ||= 0
        dat.i += 1

        // code to run
        let mind = o_up(A,{thes:'mind'})
        // communication channel|electrode to this iterator
        let T = {}
        for (let {thing,act} of o_path(mind,['mind','thing','act'])) {
            // when to
            //if (A.c.cv >= act.y.cv) return
            if (act.c.for == 'C') {
                // what to: C** until A
                let N = inlace(A,{until: s => s instanceof TheA})
                for (let C of N) {
                    act.c.code(A,C,{t:'Gee'},T)
                }
            } 
            else { throw 'act.c?'}
            A.c.cv = act.y.cv
        }
        return dat
    }


    // construct a one-trick mind
    function St_minds (A1:A) {
        let mind = C_('mind')
        let thing = C_('wear')
        let act = C_('act',3)
        i_(mind, thing)
        i_(thing, act)
        act.c.code = function (A,C,G,T) {
            // knock a letter off anywhere, deterministically
            let t = C.t
            if (t.length == 1) return
            t = t.length % 2 ? t.substring(1) : t.substring(0, t.length - 1)
            C.t = t
        }
        act.c.for = 'C'
        A1.sc.mind = mind
    }
    function St_writers (A1) {
        let A11 = A_(A1,'Earth')
    
        // create some Cs for authors
        let Joyce = C_('Joyce',{},{}, {style: 'modernist', theatrics: ['experimental', 'stream of consciousness']})
        let Faulkner = C_('Faulkner',{},{}, {style: 'southern gothic', theatrics: ['tragic', 'haunting']})
        let Woolf = C_('Woolf',{},{}, {style: 'feminist', theatrics: ['intimate', 'psychological']})
        let Ginsberg = C_('Ginsberg',{},{}, {style: 'beat', theatrics: ['rebellious', 'spontaneous']})
        let Kerouac = C_('Kerouac',{},{}, {style: 'beat', theatrics: ['wandering', 'energetic']})
        let Burroughs = C_('Burroughs',{},{}, {style: 'Cut-up Technique', nationality: 'American', theatrics: 'avant-garde'})
        let Rimbaud = C_('Rimbaud',{},{}, {style: 'Symbolism', nationality: 'French', theatrics: 'haunting'})
        let Baudelaire = C_('Baudelaire',{},{}, {style: 'Modernism', nationality: 'French', theatrics: 'decadent'})
    
        // create some As with authors
        let A111 = A_(A11, 'Dublin')
        i_(A111, Joyce)
    
        let A1111 = A_(A111, 'Sandymount')
        i_(A1111, Joyce)
    
        let A1112 = A_(A111, 'Malahide')
        i_(A1112, Faulkner)
    
        let A1113 = A_(A111, 'Bray')
        i_(A1113, Woolf)
        i_(A1113, Burroughs)
    
        let A112 = A_(A11, 'Paris')
        i_(A112, Joyce)
        i_(A112, Rimbaud)
        i_(A112, Baudelaire)
    
        let A1121 = A_(A112, 'Montparnasse')
        i_(A1121, Faulkner)
    
        let A1122 = A_(A112, 'Saint-Germain')
        i_(A1122, Woolf)
    
        let A113 = A_(A11, 'London')
        i_(A113, Woolf)
    
        let A1131 = A_(A113, 'Bloomsbury')
        i_(A1131, Woolf)
    
        // create a district with a writer in it
        let A1114 = A_(A111, 'Dublin City')
        i_(A1114, Joyce)
        i_(A1114, Kerouac)
        i_(A1114, Ginsberg)



        // check A.c.ip of a few of these, eg A1114's .c.ip == [1,1,1,4]
        let samp = {A113, A1114, A1111, A111}
        for (let k in samp) {
            let A = samp[k]
            let k_ipbits = k.slice(1).split('').join('.')
            let A_ipbits = A.c.ip.join('.')
            if (k_ipbits != A_ipbits) {
                throw `k_ipbits != A_ipbits: ${k_ipbits} != ${A_ipbits}`
            }
        }
        return A1114
    }
//#endregion



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
        conver = ((conver < 0) ? conver - 1 : -1)
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
    let b = {
        "↺":bleep,
        "✴":reconver,
        "🠖":bloop,
    }
</script>
<svelte:window on:keydown={handleKeydown}/>

<biggroup>
    <h1>PlayDramatics</h1>
<panel class=big>
    <But {b} />
    <span class="numero dial">{conver}.{refresh}</span>
</panel>


{#if con}
{#key conver}
   <p> <Con C={con}/> </p>
{/key}
{/if}
</biggroup>

<style>
    .numero {
        background: black;
        color: rgb(22, 203, 91);
        font-family: Spirax;
    }
    .big {
        font-size: 36px;
    }
    .dial {
        border-radius:15%;
        padding: 0.2em;
        margin:0.3em;
    }
    panel * {
        vertical-align: middle;
    }
    panel button {
        height: 1.2em;
        width: 1.23em;
        
        border-radius:35%;
    }
</style>