<script lang="ts">
	import { fly,slide,scale,crossfade } from 'svelte/transition'
	import { quintOut,linear } from 'svelte/easing';
    import { tweened } from 'svelte/motion';
    import { flip } from 'svelte/animate';
    import {onMount, afterUpdate, onDestroy, getContext} from 'svelte'
    import {slupath}  from '$lib/treeing/Betimes'
    import {sex,now,map,dec,ex,heq,hak,haks,joint}  from '$lib/Y/Pic'
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
    let verbose = 1 && geometricating
    let confusospam = spam
    let geometricate = (ge) => {
        let oldness = now() - (confusospam.asat||0)
        // about 5% of the time?
        if (oldness < 0.15) return verbose && console.log("freshness")
        confusospam.asat = now()
        spam.vers ++
        
        ge.time = dec(spam.asat - spam.began,3)
        confusospam.N.push(ge)

        // if (spam.vers == 42) debugger
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
    // never changes, position relative to Conz's <nodule>
    // where spacer sits the wrapper hovers
    ex(sizing,{top:0,left:0})
    // speed animal instincts will be applied
    let hmm = async (wait) => {
        await new Promise(resolve => setTimeout(resolve, wait||43));
    }
    // wrapper's positioning mode, becomes absolute
    let spaciness = 'relative'
    // < how folded up the nodules should be
    //  default is display:table-row
    let foldfactor = 0
    let look_selected = 0
    // high level
    let sizefield = []
    let animalsizing = async (ge) => {
        spaciness = 'absolute'
        look_selected = 0
        if (ge?.width == null) throw "!ge"
        // < each wants padding based on its historical wildness
        //   but only in this foldfactor
        // animated transition
        spacerWidth.set(ge.width)
        spacerHeight.set(ge.height)
        
        
        // sample the animated transition
        ex(ge,{
            he:dec($spacerHeight,0),
            wi:dec($spacerWidth,0)
        })
        // console.log("animalsizing "+slupath(C),ge)

        itisgiven()
    }
    // low level - ripple
    let unique_animal
    onDestroy(() => { unique_animal = 0 })

    let animalsizing_loop = async (uniquely,ttl,was) => {
        // tidy parallel trails of this
        if (unique_animal != uniquely) return
        if (!C.sc.animal) return

        // if (C.c.d <3) return
        let number = C.t.split(' ')[1]*1
        let goodnumbers = [16,27,40,55]
        // if (!(goodnumbers.includes(number) || C.t == 'times' || C.c.d == 1)) return
        // if (C.c.d == 0) return
        if (C.c.d > 2) return


        if (unique_animal != uniquely) return
        // happens a lot once we unMount!
        if (!wrapper) return

        // was may be passed from a longer ago
        was ||= ex({},sizing)
        // make sizing current
        let ge = {
            width: wrapper.offsetWidth,
            height: wrapper.offsetHeight
        }
        ex(sizing,ge)
        let change = !heq(was,sizing)
        // whether we came from afterUpdate or by reverb
        if (ttl) ge.reverb = ttl

        // model chaos
        let modeledat = now()
        change && await animalsizing(ge)
        await geometricating && geometricate(ge)
        // < includes Chart update after geometricate(ge)?
        await hmm()
        // verbose && console.log('sizing took '+(now()-modeledat))

        // sizing stabilises
        if (ttl && !change) return verbose && console.log("sizing stabilises "+(ttl||0))

        // reverb - keep going a few times
        ttl ||= 0
        if (ttl < 3) {
            let was = ex({},sizing)
            setTimeout(() => {
                animalsizing_loop(uniquely,ttl+1,was),
                500
            })
        }
    }

    afterUpdate(() => {
        animalsizing_loop(unique_animal = {})
    })

    // flash a background colour
    let givenbg = tweened(0,{duration:300,easing:linear})
    function itisgiven() {
        givenbg.set(1, { hard: true })
        .then(() => {
            givenbg.set(0);
        });
    }
    

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
        duration = 491
    }
    let backgroundism
    $: backgroundism = look_selected ? "#ffc2" : "none"
    let displaymode = C.c.d == 0 ? 'table' : 'table-cell'
</script>
<nondual style="position: relative; width:100%; display:{displaymode};" >
    <!--  -->
<div id="spacer" bind:this={spacer} style="width: {$spacerWidth||0}px; height: {$spacerHeight||0}px;"></div>
<div
    id="wrapper"
    bind:this={wrapper}

    style="
        left: {sizing.left||0}px;
         top: {sizing.top||0}px;
         position:{spaciness};
    ">
    <!--  -->

    <!-- display:table-row;
    width:100%; -->
{#if geometricating}
    <span id="geom">
        <Chart {spam} /> 
    </span>
{/if}
 
<span style="display:table-cell;
    background: hsla(255,255,255,255)" >
    ~
{#if !no_label}<span style="color:deepskyblue" on:pointerdown={(e) => boosting(e)}>{t}</span>{/if}
{#if boost} <span style="color:blueviolet" on:pointerdown={(e) => boosting(e,'negate')}>+{boost}</span>{/if}
{#if C.c.unwired} <span style="color:red">!wired</span>{/if}
<!-- <c_sip style="font-size:70%" on:pointerdown={(e) => datadump = 1}> {sip} </c_sip> -->
<!-- <revision style="color:darkcyan; text-decoration:underline">{quee}</revision> -->
</span>

{#each o_(C) as n (n.t)}
<!-- fly,slide,scale,crossfade -->
    <giverto
        in:slide={{ duration:333,easing:quintOut,opacity:1 }}
        out:scale={{ duration:222,easing:quintOut,opacity:1 }}
        style="display:inline-block; vertical-align: middle;
               border: 3px solid gainsboro;
               border-right:none; padding: 0 3px; margin: 0 3px;
               border-radius: 3px;
               position: relative;
               background: {backgroundism};
               display:table-cell;
               "
        title="{C.t}-{C.c.pi}/{n.t}-{n.c.pi}">
        <sleeve style="width:cal(100% + 6px);height:100%;position:absolute;
            border-left:1em solid hsla(120, 100%, 75%, {$givenbg});
            border-radius: 0.3em;
            top:-3px;
            left:-3px;
            "></sleeve>
        <takerto >
            <svelte:component on:reCon="{reCon}" this={pis[n.c.pi]} C={n}/>
        </takerto>
    </giverto>
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
</div>
</nondual>

<style>
    #geom {
        position: absolute;
        left: 42em;
        background: hsla(hue, saturation, lightness, alpha)
    }
</style>