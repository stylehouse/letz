<script lang="ts">
    // import autoAnimate from '@formkit/auto-animate';
	import { fly,slide,scale,crossfade } from 'svelte/transition'
	import { quintOut,linear } from 'svelte/easing';
    import { spring } from 'svelte/motion';
    import { flip } from 'svelte/animate';
    import {Send}  from '$lib/Gap.svelte'
    import {slupath}  from '$lib/treeing/Betimes.svelte'
    import {sex,isC,now,map,dec,ex,heq,hak,haks,ahk,joint,sum}  from '$lib/Y/Pic'
    import {o_,o_up}  from '$lib/St.svelte'
    import {sip_wiree, reConstruct}  from '$lib/Co.svelte'
    import Coning from '$lib/Coning.svelte';
    // < look into https://github.com/kaisermann/svelte-loadable to name these at runtime
    import Cont from '$lib/pi/Cont.svelte';
    import Conz from '$lib/pi/Conz.svelte';
    import Dir from '$lib/pi/Dir.svelte';
    import Rec from '$lib/pi/Rec.svelte';
    import Kom from '$lib/pi/Kom.svelte';
    import Congeo from '$lib/ui/Congeo.svelte';
    import {uninlineablelabelable} from '$lib/ui/GiveTake.svelte.ts';
    import { getContext } from 'svelte';
    import GiveTake from '$lib/ui/GiveTake.svelte';
    let pis = {Cont, Conz, Dir, Rec,Kom}
    // our instructions: (-Con/(-Cont|-Conz))**
    let {C} = $props()
    let boost = $state(C.c.boost || 0)
    
    // only changes when we are sent an update specifically
    let update:number
    sip_wiree(C, v => {
        C = v
        update = C.c.version
    })

    // TODO not sure how to get boost into the toCon process
    function boosting (e, negate=false) {
        negate = e.ctrlKey || negate
        boost += negate ? -1 : 1
        C.c.boost = boost
        // try again here
        //  saves having to click ring() at the top
        //   however: we dont reiterate the source data from the top,
        //    so often opening Dir** and looking at the D** generated
        //     require ring() to get the most unfolded D**
        reCon(e)
    }
    

    // label from above (key into here - Cont%Ct is the s.t on the inside)
    let t = $state()
    let sip
    let quee
    function upto() {
        t = C.t
        quee = update || '='
        sip = C.c.ip.join('.')
        C.y.boosting = boosting
    }
    $effect(() => {
        upto(C,boost)
    })

    $effect(() => {
        //if (sip == '1.2.1.2.2') debugger
    });
    
    // are we charting
    let is_geometricating = () => {
        let geometricating = 1 && C.t.startsWith('kommi')

        if (0) {
            if (geometricating) {
                // another clause
                let number = C.t.split(' ')[1]*1
                let goodnumbers = [27] //16,27,40,55]
                geometricating = goodnumbers.includes(number)   
            }
            if (geometricating) {
                // another clause
                let upCon = o_up(C,{til:s => s.c.pi == 'Con',sing:1})
                geometricating = upCon && upCon.t == 'times'
            }
        }
        return geometricating
    }
    let geometricating = is_geometricating()
    let verbose = 1 && geometricating
    

    // refreshing the process, when children want to adjust things
    function reCon (e) {
        C = reConstruct(C)
    }
    // < this wants overlaying|geo via a parent
    let datadump
    
    // avoid stating this twice (as Con.t and Cont%Ct)
    let no_label = $state(false)
    if (C.sc.avoid_restating_Ct) {
        no_label = true
    }
    let duration = 0
    if (C.sc.animal) {
        duration = 491
    }
    let displaymode = C.c.d == 0 ? 'table' : 'table-cell'
    let unin = $state(0)
    $effect(() =>{
    if (C.c.s?.sc?.uninlineablelabelable) {
        let see_what = () => {
            // returns true if Conz is now uninlined, handles the style change
            let well = uninlineablelabelable(C,unin)
            if (well == null) {
                console.log("Missing some C/n.y.el_*erto !!")
            }
            else {
                // make this permanent once on
                //  since with our adjustment it stops triggering inlining
                unin = unin || well
                // < how to decide to get back?
            }
        }
        let ui = getContext('ui')

        
        setTimeout(()=>{
            if (C.t == 'kommit'
                || C.t == 'times'
                || C.t == 'TestBetimes') {
                if (ui) {
                    // let this be triggered by a button
                    let buts = {}
                    buts[C.t+"_geo"] = see_what
                    ui && ui.add_button(buts)
                }
                // and do it now
                see_what()
            }
        },300)
    }
    })
</script>
<nondual style="position: relative; width:100%;
     display:{displaymode};"
      >
     <!-- use:autoAnimate -->
{#snippet middle()}
    <span style="display:table-cell;
        background: hsla(255,255,255,255)" >
        ~
    {#if !no_label}<span style="color:deepskyblue" on:pointerdown={(e) => boosting(e)}>{t}</span>{/if}
    {#if boost} <span style="color:blueviolet" on:pointerdown={(e) => boosting(e,'negate')}>+{boost}</span>{/if}
    {#if C.c.unwired} <span style="color:red">!wired</span>{/if}
    {#if unin} <span style="color:red">UIN</span>{/if}


    <!-- <c_sip style="font-size:70%" on:pointerdown={(e) => datadump = 1}> {sip} </c_sip> -->
    <!-- <revision style="color:darkcyan; text-decoration:underline">{quee}</revision> -->
    </span>

    {#each o_(C) as n (n.t)}
    <!-- fly,slide,scale,crossfade -->
        <GiveTake {C} {n}>
            <svelte:component on:reCon="{reCon}" this={pis[n.c.pi]} C={n}/>
        </GiveTake>
        <!-- 
                display:table-cell;
                wdith:100%; -->
    {/each}


    {#if datadump}
        <span style="display:table-cell;" >
                <!-- data dump (leaving the mind our Con** is from) -->
                <Coning C={C.c.s} noC />
        </span>
    {/if}
{/snippet}

    {#if geometricating}
        <Congeo {C} {middle}/>
    {:else}
        {@render middle()}
    {/if}
</nondual>

<style>
</style>