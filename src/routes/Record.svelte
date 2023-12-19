<script lang="ts">
    import Coning from "$lib/Coning.svelte";
    import { G,TheG,
        cull_around,Recolink,Recolink_stillness,host_Recolink_stillness,
        Recollect,Aroundiness,
        makeso,Betime,Betimes
     } from "$lib/G";
    import But from "$lib/ui/But.svelte";
    import Con from "$lib/pi/Con.svelte"
    import { Construct, reConstruct } from '$lib/Co'
    import { C_,pito,o_up,o_,i_,o_path } from '$lib/St'
    import { map,grep,ac, ahsk,ahk,havs,haks,hak,coint,joint, dig, sha256,sex,ex,nex,now,ispi,fatal } from "$lib/Y/Pic.ts"


    import { getContext, get_current_component, onDestroy, onMount, setContext, tick } from 'svelte/internal';
    import Grabber from "$lib/ui/Grabber.svelte";
    import BigGroup from "$lib/ui/BigGroup.svelte";

    // this puts our name out there (Record), which others g.send() to
    let g = G(3)
    g.I_am("storage")
  // compute(s)
    // how deep in Record** to wake
    // C|B indifferent (except for vaguely unused se)
    let computable_upward = (s) => {
        return o_up(s,{inc:1,all:s => s.y.C,sing:1})
    }
    let section_upward = (s) => {
        // < o_up d.sing=1 should work
        return o_up(s,{inc:1,until:s => s==C}).pop()
    }
    let compute = async (s) => {
        // what Record/*:se/...s is wanting to think
        let se = section_upward(s)
        let goer = computable_upward(s)
        if (goer == C && !C.y.C) {
            // we should be along soon...
            if (se.t != 'bloube') {
                debugger
            }
            return
        }
        // a place we have Constructed before
        let Something = goer.y.C
        // it's the -Con/Rec-Rec:Something
        if (!ispi(goer,Something.t)) debugger
        let Con = Something.y.up
        fatal.ispi(Con,'Con')

        // < debounce and group?
        // await tick()

        reConstruct(Con)
    }
  // C
    export let C = C_('Record',1,{pi:'Rec'})
    g.haveC(C,s => C = s)
    // init these so we can partition compute by them sooner
    pito(C,'bloube','-Rec')
    pito(C,'treeh','-Rec',{real:1})
    pito(C,'kommit','-Rec',{real:1,kommit:1})
    pito(C,'been','-Rec',{been:1})

    // wasteful compute of the entire C**, should only happen when its small
    $: C.y.wake = async () => {
        console.log("wake Record")
        await tick(); ring()
    }
    // output of our encoding process
    let D
    // our process
    let wake = (s) => {
        // if it's on the screen somewhere
        s.y.wake && s.y.wake()
    }
    let I = {
        // Con spawn their sc&pi, resolve etc is all figured out (somewhere)
        Pi:1,
        //  and then process them here:
        do_Pi_later: function (C,s) {
            let isa = coint(haks(nex({},s.c,'pi')))
            // console.log("do_Pi_later: "+s.t+"\t\t"+(ispi(s)||"")+"\t"+isa,{C,s})

            // mark as Construct()ed
            s.y.C = C

            // these two processes go async
            // both require some s/* to bother running - ie an empty kommit isn't a kommit
            //  unless s.c.This, which s pretends to be
            if (!s.c.This && !hak(o_(s))) return

            let real = s.c.real || s.c.This && 1
            if (real) {
                // encoding
                Recollect(g,s)
            }

            if (s.c.been) {
                // this makes a bunch of bunches of commits
                //  forking the async PUT business
                s.y.slook = Aroundiness(g,s)
            }
            
        }
    }
    async function ring() {
        D = Construct({I,s:C,D})
    }
    // < resolve $n each This properly
    //   one thing per g.name atm
    //   will be easy to path everything if we Con Code**
    // Record <- Diring C
    g.receive = (This:TheG) => {
        // Record/bloube-Rec:host/Diring-Rec:guest
        let host = pito(C,'bloube','-Rec')
        let guest = pito(host,This.name,'-Rec')

        // write on this sphere
        //  guest would encode itself but instead does c&This
        ex(guest.c,{The:g,This})

        // a "click save" interface for This, see send_places()
        guest.y.compute = () => { compute(guest) }
        guest.y.compute()
        return guest
    }
    g.o_done = async (s) => {
        // what Record/*:se/...s is done thinking
        let se = section_upward(s)
        let sect = se.t

        let Reco = s.y.Reco
        if (!Reco && s.t != 'been') throw "!Reco!? done otherthings?"

        // update UI if any
        wake(s)
        console.log("g.o "+sect+": "+s.t)

        if (done_from[sect]) {
            done_from[sect](s,Reco)
        }
        else {
            console.info("Unhandled Record o_done: "+sect)
        }
    }
    let done_from = {
        bloube: (s,Reco) => {
            // Record /bloube/$s:guest -> /treeh/#$s
            // s.y.wake && s.y.wake()
            // treeh/ will be real
            //  it will Lines Record/guest%%links
            let host = pito(C,'treeh','-Rec',{real:1})
            // the guest
            let guest = pito(host,s.t,'-Rec')
            if (Recolink_stillness(guest,Reco)) return

            //  sits there with these links
            Recolink(guest,Reco,s)

            // it happens up here
            compute(host)
        },
        treeh: (s,Reco) => {
            // Record /treeh -> /kommit/#@treeh

            let host = pito(C,'kommit','-Rec',{real:1,kommit:1})
            if (host_Recolink_stillness(host,Reco)) return

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

            compute(host)
            // C/kommit resync -> B/times
            bop()
        },
        kommit: (s,Reco) => {
            // Record /kommit -> /been/#@out
            // we commit a bunch of recent commits
            //  first, previous and current are always available
            //  < and branch meta objects
            // finally we stop encoding and just store the tree of stuff

            let host = pito(C,'been','-Rec',{been:1})
            if (host_Recolink_stillness(host,Reco)) return
            
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

            compute(host)
        },
        been: (s,Reco) => {
            console.log("been done")
        },
        // guest now -> downstream
    }
    

  // B
    // now, the elsewhere to display what's tangling
    let B = C_('Record portal',1,{pi:'Rec'})
    // it is recoverable from HMR that might recreate $C and $B
    B = C.y.theB || B
    C.y.theB = B
    let items = pito(B,'items','-Kom')
    let times = pito(B,'times','-Kom')
    let BD
    let BI = {
        // Con spawn their sc&pi, resolve etc is all figured out (somewhere)
        Pi:1,
        do_Pi_early: (C,s,d) => {
            Betime({C,s,d,items,times})
        },
        do_Pi_later: function (C,s) {
            // mark as Construct()ed
            s.y.C = C
        },
        do_later: (d) => {
        },
    }
    let bop = () => {

        // gather a limited view of Record**
        let creation = e => e.c.pi = 'Kom'
        makeso(items, o_path(C,'/bloube:se/*'),{creation});
        makeso(times, o_path(C,'/kommit:se/*'),{creation});
        // es&going = now() when it stops coming in

        // < es&goable
        Betimes({items,times})

        BD = Construct({I:BI,s:B,D:BD})
    }

    onMount(() => {
        ring()
        bop()
    })

    let b = {ring,bop,
        showC: (a) => tog('showC'),
    }
    let togs = {}
    let tog = t => togs[t] = !togs[t]
</script>
<biggroup>
    <h1>Record</h1>
    <But {b}/>
    <!-- <Grabber /> -->
    {#if togs.showC && D}
        <BigGroup>
            <!-- <Coning t="theD" C={D} /> -->
            <Con C={D} />
        </BigGroup>
    {/if}
    {#if 1 && BD}
        <BigGroup>
            <Con C={BD} />
        </BigGroup>
    {/if}
</biggroup>