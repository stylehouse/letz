<script lang="ts">
	import { slide } from 'svelte/transition'
	import { quintOut } from 'svelte/easing';
    import { tweened } from 'svelte/motion';
    import { flip } from 'svelte/animate';
    import {onMount, afterUpdate, onDestroy, getContext} from 'svelte'
    import {slupath}  from '$lib/treeing/Betimes'
    import {sex,now,map,dec,ex,heq}  from '$lib/Y/Pic'
    import {o_,o_up}  from '$lib/St'
    import {sip_wiree, reConstruct}  from '$lib/Co'
    import Coning from '$lib/Coning.svelte';
    // < look into https://github.com/kaisermann/svelte-loadable to name these at runtime
    import Cont from '$lib/pi/Cont.svelte';
    import Conz from '$lib/pi/Conz.svelte';
    import Dir from '$lib/pi/Dir.svelte';
    import Rec from '$lib/pi/Rec.svelte';
    import Kom from '$lib/pi/Kom.svelte';
    import Chart from '$lib/ui/Chart.svelte';
    let pis = {Cont, Conz, Dir, Rec,Kom}
    // our instructions: (-Con/(-Cont|-Conz))**
    export let C
    let boost = C.c.boost || 0
    
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
    let t
    let sip
    let quee
    function upto() {
        t = C.t
        quee = update || '='
        sip = C.c.ip.join('.')
        C.y.boosting = boosting
    }
    $: upto(C,boost)

    onMount(() => {
        //if (sip == '1.2.1.2.2') debugger
    });
    
    // track space, maybe
    // the div|space that wraps everything in Con
    let wrapper

    let spacer
    // is fed from wrapper:
    let spacerHeight = tweened(0, {
        duration: 300,
        easing: quintOut
    });
    let spacerWidth = tweened(0, {
        duration: 300,
        easing: quintOut
    });


    // Con update version?
    let spam = {C,began:now(),vers:0,N:[]}
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
    let confusospam = spam
    let geometricate = (ge) => {
        let oldness = now() - (confusospam.asat||0)
        if (oldness < 0.3) return
        confusospam.asat = now()
        spam.vers ++
        
        ge.time = dec(spam.asat - spam.began,3)
        confusospam.N.push(ge)

        if (spam.vers == 50) debugger
        // console.log("geometricate ")

        // < this may be necessary if we contract elsewhere to graph this
        // spam.update && spam.update()
    }

    // to put juddering stuff-changing-everywhere elements
    //  into a spatial suspension
    //  wrapper's width+height become spacer's
    //  wrapper is position:absolute referenced to their parent, see <nodule> in Conz
    
    // the theory is simple:
    // $: {
    //     spacerHeight.set(wrapperHeight);
    // }
    // afterUpdate(() => {
    //     wrapperHeight = wrapper.offsetHeight;
    // });
    let sizing = {}
    let hmm = async (wait) => {
        await new Promise(resolve => setTimeout(resolve, wait||43));
    }
    // wrapper's positioning mode
    let spaciness = 'relative'
    let unique_animal
    onDestroy(() => { unique_animal = 0 })
    let spatialising = 0
    let animalsizing = async (uniquely,ttl,was) => {
        if (unique_animal != uniquely) return
        if (!C.sc.animal) return
        // if (C.c.d <3) return
        let number = C.t.split(' ')[1]*1
        let goodnumbers = [16,27,40,55]
        if (!(goodnumbers.includes(number) || C.t == 'times' || C.c.d == 1)) return

        await hmm()
        if (unique_animal != uniquely) return
        // happens a lot once we unMount!
        if (!wrapper) return

        // was may be passed from a longer-ago moment of animalsizing
        was ||= ex({},sizing)
        let ge = {
            width: wrapper.offsetWidth,
            height: wrapper.offsetHeight
        }
        // animated transition
        spacerWidth.set(ge.width + 3)
        spacerHeight.set(ge.height)
        // sizing stabilises
        ex(sizing,ge)
        if (was && heq(was,sizing)) return
        
        await hmm()

        // never changes, position relative to Conz's <nodule>
        // where spacer sits the wrapper hovers
        ex(sizing,{top:0,left:0})
        
        spaciness = 'absolute'
        spatialising = 1
        
        // sample the animated transition
        ex(ge,{
            he:dec($spacerHeight,0),
            we:dec($spacerWidth,0)
        })
        console.log("animalsizing "+slupath(C),ge)
        // whether we came from afterUpdate or by reverb
        if (ttl) ge.reverb = ttl
        geometricating && geometricate(ge)

        // reverb - keep going a few times
        ttl ||= 0
        if (ttl < 3) {
            let was = ex({},sizing)
            await hmm(555)
            animalsizing(uniquely,ttl+1,was)
        }
    }

    afterUpdate(() => {
        animalsizing(unique_animal = {})
    })
    

    // refreshing the process, when children want to adjust things
    function reCon (e) {
        C = reConstruct(C)
    }
    // < this wants overlaying|geo via a parent
    let datadump
    
    // avoid stating this twice (as Con.t and Cont%Ct)
    let no_label = false
    if (C.sc.avoid_restating_Ct) {
        no_label = true
    }
    let duration = 0
    if (C.sc.animal) {
        duration = 90
    }
    let backgroundism
    $: backgroundism = spatialising ? "#ffc2" : "none"
</script>

<div id="spacer" bind:this={spacer} style="width: {$spacerWidth||0}px; height: {$spacerHeight||0}px;"></div>
<div
    id="wrapper"
    bind:this={wrapper}

    style="left: {sizing.left||0}px; top: {sizing.top||0}px; position:{spaciness};">
{#if geometricating}
    <span id="geom">
        <Chart {spam} /> 
    </span>
{/if}
 
{#if !no_label}<span style="color:deepskyblue" on:pointerdown={(e) => boosting(e)}>{t}</span>{/if}
{#if boost} <span style="color:blueviolet" on:pointerdown={(e) => boosting(e,'negate')}>+{boost}</span>{/if}
{#if C.c.unwired} <span style="color:red">!wired</span>{/if}

<!-- <c_sip style="font-size:70%" on:pointerdown={(e) => datadump = 1}> {sip} </c_sip> -->
{#if datadump}
    <!-- data dump (leaving the mind our Con** is from) -->
    <Coning C={C.c.s} noC />
{/if}
<!-- <revision style="color:darkcyan; text-decoration:underline">{quee}</revision> -->


{#each o_(C) as n (n.t)}
    <span
        transition:slide={{ duration, easing: quintOut }}
        animate:flip={{ duration: 300 }}
        style="display:inline-block; vertical-align: middle; border:2px solid gainsboro;
               border-right:none; padding: 0 3px; margin: 0 3px;
               border-radius: 3px;
               position: relative;
               background: {backgroundism};
               ">
        <svelte:component on:reCon="{reCon}" this={pis[n.c.pi]} C={n}/>
    </span>
{/each}
</div>

<style>
    #geom {
        position: absolute;
        left: 42em;
    }
</style>