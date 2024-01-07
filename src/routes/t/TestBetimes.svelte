<script lang="ts">
    import { onMount } from "svelte";
    import { G,TheG,
        cull_around,Recolink,Recolink_stillness,host_Recolink_stillness,
        Recollect,Aroundiness,
        makeso,Betime,Betimes
    } from "$lib/G";
    import BigGroup from "$lib/ui/BigGroup.svelte";
    import But from "$lib/ui/But.svelte";
    import Con from "$lib/pi/Con.svelte"
    import { Construct, reConstruct } from '$lib/Co'
    import { C_,pito,o_up,o_,i_,o_path } from '$lib/St'
    import { map,grep,ac, ahsk,ahk,havs,haks,hak,coint,joint, dig, sha256,sex,ex,nex,now,ispi,fatal } from "$lib/Y/Pic.ts"
    import Coning from "$lib/Coning.svelte";

    

    // the C** -> D situator
    export let C = C_('TestBetimes',1,{pi:'Rec'})
    // the kommit/* -> times/* situator
    let kommit = pito(C,'kommit','-Kom',{kommit:1})
    let times = pito(C,'times','-Kom')
    // the one-thing processor
    //  per thing as part of Construct() climbing C**
    let I = {
        // Con spawn their sc&pi, resolve etc is all figured out (somewhere)
        Pi:1,
        do_Pi_early: (C,s,d) => {
            Betime({C,s,d,times})
        },
    }
    let D

    // < ui/Time
    let conver = 1
    let refresh = 1
    // the many-thing processor
    //  and re-situator
    // < could be tacked onto the start of Construct() via I
    // < new stuff (via makeso()) should Betime() before it is Betimes()
    let bop = () => {
        // gather a limited view of Record**
        let creation = e => e.c.pi = 'Kom'
        makeso(times, o_path(C,'/kommit:se/*'),{creation});
        let kommit = pito(C,'kommit')
        // es&going = now() when it stops coming in
        console.log("get Betimes",kommit)
        Betimes({times,kommit})

        D = Construct({I,s:C,D})
    }
    onMount(() => {
        bop()
    })

    // what we encode -> kommit/*
    let stuff = C_("stuff")

    let tock = async () => {
        refresh++
        // reality changes, ie /bloube
        let s = stuff
        pito(s,'bit of a '+refresh)
        await Recollect({o_done:()=>{}}, s)

        let Reco = s.y.Reco
        if (!Reco) return console.error("No Reco",s)




        // we just pop this here
        //  a bit less than shunting through /bloube and /treeh

        let host = kommit
        if (host_Recolink_stillness(host,Reco)) return console.log("still Reco",s)

        let i = host.c.kommit++
        // picture of treeh (which is really Record)
        let guest = pito(host,s.t+" "+i,'-Rec')
        //  sits there with these links
        Recolink(guest,Reco,s)
        //  also the time
        guest.sc.time = now()




        stuff = stuff
    }
    $: bop(), stuff

    let b = {bop,tock}
</script>


<biggroup>
    <h1>TestBetimes</h1>

    <panel class=big>
        <But {b} />
        <span class="numero dial">{conver}.{refresh}</span>
    </panel>

    <h1> Stuff </h1>
    <BigGroup>
        <!-- <Coning t="theD" C={D} /> -->
        {#if D}
            <Con C={D} />
        {/if}
        <Coning t="the stuff" C={stuff} />
    </BigGroup>

</biggroup>