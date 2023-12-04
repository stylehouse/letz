<script lang="ts">
    import Coning from "$lib/Coning.svelte";
    import {G,cull_around,Recolink,Recolink_stillness} from "$lib/G";
    import But from "$lib/ui/But.svelte";
    import Con from "$lib/pi/Con.svelte"
    import { Construct } from '$lib/Co'
    import { C_,pito } from '$lib/St'
    import { ac, ahsk,ahk,havs,haks,coint,joint, dig, sha256,sex,ex,nex,now,ispi } from "$lib/Y/Pic.ts"


    import { getContext, get_current_component, onDestroy, onMount, setContext, tick } from 'svelte/internal';
    import Grabber from "$lib/ui/Grabber.svelte";

    // this puts our name out there (Record), which others g.send() to
    let g = G(3)
    // which fills this out:
    export let C = C_('Record',1,{pi:'Rec'})
    // wasteful compute of the entire C**, should only happen when its small
    $: C.y.wake = async () => { await tick(); ring() }
    // output of our encoding process
    let D
    // our process
    let I = {
        // Con spawn their sc&pi
        Pi:1,
        //  and then process them here:
        midule: function (C,s) {
            let isa = coint(haks(nex({},s.c,'pi')))
            console.log("midule:   "+(ispi(s)||"")+"   "+isa,{C,s})
            // define -Rec that c&real|been
        }
    }
    async function ring() {
        D = Construct({I,s:C,D})
    }
    onMount(() => ring())
    // g.haveC(C,s => C = s)
    // < resolve $n each This properly
    //   one thing per g.name atm
    // Record <- Diring C
    g.receive = (This) => {
        // Record/bloube-Rec:host/Diring-Rec:guest
        let host = pito(C,'bloube','-Rec')
        let guest = pito(host,This.name,'-Rec')

        // download
        ex(guest.c,{The:g,This})

        // tell someone
        let wake = guest.y.wake || C.y.wake
        wake()

        return guest
    }
    g.o_done = async (sect,Reco,s) => {
        // tax(s.sc,{string,dige})
        //s.c.░ = dige
        console.log("g.o "+sect+": "+s.t)

        if (sect == 'bloube') {
            // Record /bloube/$s:guest -> /treeh/#$s

            // treeh/ will be real
            //  it will Lines Record/guest%%links
            let host = pito(C,'treeh','-Rec',{real:1})
            // the guest, without enough .c to be real
            let guest = pito(host,s.t,'-Rec')

            //  sits there with these links
            Recolink(guest,Reco,s)

            // it happens up here
            let wake = host.y.wake || C.y.wake
            wake()
        }
        else if (sect == 'treeh') {
            // Record /treeh -> /kommit/#@treeh

            let host = pito(C,'kommit','-Rec',{real:1,kommit:1})
            if (Recolink_stillness(host,Reco)) return

            let i = host.c.kommit++
            // picture of treeh (which is really Record)
            let guest = pito(host,s.t+" "+i,'-Rec')
            //  sits there with these links
            Recolink(guest,Reco,s)
            //  also the time
            guest.sc.time = now()


            // host/#treeh:guest+ pool like N[Reco+]
            //  we also have N[Reco+] from encoding host/**
            // < shrinking ooze effect
            cull_around(host)

            let wake = host.y.wake || C.y.wake
            wake()
        }
        else if (sect == 'kommit') {
            // Record /kommit -> /been/#@out
            // we commit a bunch of recent commits
            //  first, previous and current are always available
            //  < and branch meta objects
            // finally we stop encoding and just store the tree of stuff

            let host = pito(C,'been','-Rec',{been:1})
            if (Recolink_stillness(host,Reco)) return
            
            let i = host.c.been++
            // a picture of kommit
            let guest = pito(host,s.t+" "+i,'-Rec')
            //  sits there with these links
            Recolink(guest,Reco,s)
            //  also the time
            guest.sc.time = now()


            // host/#out:guest+ pool like N[Reco+]
            //  we also have N[Reco+] from encoding host/**
            // < shrinking ooze effect
            cull_around(host)

            let wake = host.y.wake || C.y.wake
            wake()
        }
        else if (sect == 'been') {
        }
        else {
            console.info("Unhandled Record o_done: "+sect)
        }
        // guest now -> downstream
    }


    let b = {}
</script>
<biggroup>
    <h1>Record</h1>
    <But {b}/>
    <Grabber />
    {#if D}
        <Coning t="theD" C={D} />
        <Con C={D} />
    {/if}
</biggroup>