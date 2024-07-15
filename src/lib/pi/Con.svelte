<script lang="ts">
	import { fly,slide,scale,crossfade } from 'svelte/transition'
	import { quintOut,linear } from 'svelte/easing';
    import { spring } from 'svelte/motion';
    import { flip } from 'svelte/animate';
    import {onDestroy, getContext, untrack} from 'svelte'
    import {Send}  from '$lib/Gap.svelte'
    import {slupath}  from '$lib/treeing/Betimes.svelte'
    import {sex,now,map,dec,ex,heq,hak,haks,ahk,joint,sum}  from '$lib/Y/Pic'
    import {o_,o_up}  from '$lib/St'
    import {sip_wiree, reConstruct}  from '$lib/Co'
    import Coning from '$lib/Coning.svelte';
    // < look into https://github.com/kaisermann/svelte-loadable to name these at runtime
    import Cont from '$lib/pi/Cont.svelte';
    import Conz from '$lib/pi/Conz.svelte';
    import Dir from '$lib/pi/Dir.svelte';
    import Rec from '$lib/pi/Rec.svelte';
    import Kom from '$lib/pi/Kom.svelte';
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
    
    // track space, maybe
    // the div|space that wraps everything in Con
    let wrapper:HTMLElement

    let spacer:HTMLElement
    // is fed from wrapper:
    let springiness = {
        stiffness: 0.1, damping: 0.96,
    }
    let spacerHeight = spring(0,ex({},springiness))
    let spacerWidth = spring(0,ex({},springiness))
    let spacerHeightUnsubscribe:Function, spacerWidthUnsubscribe:Function;
    onDestroy(() => {
        spacerHeightUnsubscribe && spacerHeightUnsubscribe();
        spacerWidthUnsubscribe && spacerWidthUnsubscribe();
    });
    $effect(() => {

        let nonspacer = spacer
        spacerHeightUnsubscribe = spacerHeight.subscribe(value => {
            nonspacer.style.height = `${value}px`;
        });
        spacerWidthUnsubscribe = spacerWidth.subscribe(value => {
            nonspacer.style.width = `${value}px`;
        });
    });

    // Con update version?
    let spam = {C,t:'geo',began:now(),vers:0,N:[]}
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
    // send us over to Charting
    //  Send (contains getContext()) must be called inside component initialization
    let Chart = geometricating && Send("Chart",C)
    let confusospam = spam
    let geometricate = (ge) => {
        let oldness = now() - (confusospam.asat||0)
        // about 5% of the time?
        if (oldness < 0.02) return verbose && console.log("freshness")
        confusospam.asat = now()
        spam.vers ++
        
        ge.time = dec(spam.asat - spam.began,3)
        confusospam.N.push(ge)

        // attach charts to us, we eventually Charting
        ahk(C.sc,'charts',"geo",spam)
        Chart && Chart.update && Chart.update()

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
    let spaciness = $state('relative')
    // < how folded up the nodules should be
    //  default is display:table-row
    let foldfactor = 0
    let look_selected = 0
    // high level

    // record of recent geometries
        let sizefield = []
        let sizefield_agelimit = 1.3
        let sizefield_poplimit = 77
        let sizehop = {}
        function add_size(ge) {
            sizefield.push(ex({now:now()},ge))
            // population limit
            while (sizefield.length > sizefield_poplimit) sizefield.shift()
        }
        function read_sizefield(k,timestamp) {
            timestamp ||= now()
            // age limit
            while (timestamp - sizefield[0]?.now > sizefield_agelimit) sizefield.shift()
            return sizefield.map(c => c[k])
        }
        // each wants padding based on its historical wildness
        // < but only in this foldfactor (ie we make things wrap differently)
        function getwobble(N) {
            let wobs = []
            let la = null
            N.map(v => {
                if (la != null) {
                    wobs.push(num_distance(la,v))
                }
                la = v
            })
            if (!wobs.length) {
                // wobbley geometries could be too long ago
                // < return la/9 if we are at the beginning of time?
                return 0
            }
            let total = sum(...wobs)
            let average = total / wobs.length
            return average
        }
        function num_distance(a,b) {
            let s = a - b
            if (isNaN(s)) debugger
            if (s < 0) s *= -1
            return s
        }
        function good_size(ge) {
            let timestamp = now()
            let ks = ['width','height']
            // record the apparent width|height
            add_size(ge);
            let de = {}
            map((k) => {
                // the recent values of this measurement
                let column = read_sizefield(k,timestamp)

                let max = Math.max(...column)

                // < std deviation?
                let wob = getwobble(column)
                let a_negligible_wob = max/50
                // < ever-widening due to width being l
                if (wob < a_negligible_wob) wob = 0
                let wob_margin = wob/5
                let good = dec(max + wob_margin,0)
                de[k] = good
                // make these available to Chart:
                ge['good_'+k] = good
                ge['wob_'+k] = wob*10

                if (isNaN(de[k])) debugger
                // de[k] = max
            }, ks)


            let sizehopped = ''
            if (!sizehop.now || now() - sizehop.now > 1.3) {
                // a while since sizehop, set to an ideal
                sizehop = ex({now:now()},de)
                sizehopped = 'ideal'
            }
            else {
                // see if what we set it to before (sizehop) is close enough to our current guess (ge)
                //  this should avoid lots of slight adjustments around wobbling geo
                let close_enough = 1
                map((k) => {
                    let wob = getwobble([de[k],sizehop[k]])
                    if (isNaN(wob)) debugger
                    let difference = de[k] - sizehop[k]
                    // increasing is more important
                    let sensitivity = difference > 0 ? 9 : 6
                    let allowed = de[k] / sensitivity
                    let far = wob > allowed
                    if (far) close_enough = 0
                }, ks)
                if (close_enough) {
                    // keep it how it is...
                    sizehopped = 'keep'
                    map((k) => {

                        de['void_'+k] = de[k]
                        de[k] = sizehop[k]
                    },ks)
                }
                else {
                    sizehopped = 'alter'
                }
                
            }

            // give Chart what we decided
            ex(ge,de)
            if (geometricating) {
                // console.log("good_size: "+sizehopped,de)
            }
            return de
        }
    
    let animalsize = {}
    let animalsizing = async (ge) => {
        if (spaciness != 'absolute') {
            spaciness = 'absolute'
        }
        // look_selected = 0
        if (ge?.width == null) throw "!ge"

        // desired shape of spacer, given recent turmoil
        let de =
        good_size(ge)
        // ex({},ge)
        // 
        
        let change = !heq(animalsize,sex({},de,'width,height'))
        sex(animalsize,de,'width,height')
        if (change) {
            // animated transition
            spacerWidth.set(de.width)
            spacerHeight.set(de.height)
            itisgiven()
        }
        
        
        // sample the animated transition
        // ex(ge,{
        //     he:dec($spacerHeight,0),
        //     wi:dec($spacerWidth,0)
        // })
        // console.log("animalsizing "+slupath(C),ge)

    }
    // low level - ripple
    let unique_animal
    $effect(() => {
        // await hmm()
        animalsizing_loop(unique_animal = {})
    })
    onDestroy(() => { unique_animal = {} })

    let animalsizing_loop = async (uniquely,ttl=null,was=null) => {
        // tidy parallel trails of this
        // geometricating && ttl && console.log("geomettl "+ttl)
        if (unique_animal != uniquely) return
        if (!C.sc.animal) return
        // if (C.c.d <3) return
        let number = C.t.split(' ')[1]*1
        let goodnumbers = [16,27,40,55]
        // if (!(goodnumbers.includes(number) || C.t == 'times' || C.c.d == 1)) return
        // if (C.c.d == 0) return
        if (C.c.d > 2) return
        if (unique_animal != uniquely) return
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
        // whether we came from $effect or by reverb
        if (ttl) ge.reverb = ttl
        // the wrapper
        ge.wrapperx = ge.width
        ge.wrappery = ge.height

        // model chaos
        // change && 
            await animalsizing(ge)
        
        await geometricating && geometricate(ge)
        // < includes Chart update after geometricate(ge)?
        await hmm()
        // verbose && console.log('sizing took '+(now()-modeledat))

        // sizing stabilises
        // if (ttl && !change) return verbose && console.log("sizing stabilises "+(ttl||0))

        // reverb - keep going a few times
        ttl ||= 0
        if (ttl < 15) {
            let next_ttl = ttl + 1
            let was = ex({},sizing)
            setTimeout(() => {
                animalsizing_loop(uniquely,next_ttl,was),
                400
            })
        }
        else {
            // datadump = 0
            verbose && console.log("All done?",{again:() => {
                animalsizing_loop(uniquely,ttl-1,was)
            }})
        }
    }


    // flash a background colour
    let givenbg = spring(0)
    let givenbgUnsubscribe:Function
    onDestroy(() => {
        givenbgUnsubscribe && givenbgUnsubscribe();
    });
    $effect(() => {untrack(() => {
        let nonsleeve = sleeve
        givenbgUnsubscribe = givenbg.subscribe(value => {
            value = dec(value,2)
            nonsleeve.style.borderLeft = `1em solid hsla(120, 100%, 75%, ${value})`;
        });
        // givenbg.set(0, { hard: true })
    })});
    function itisgiven() {
        // if (verbose) debugger
        givenbg.set(1, { hard: true })
        // .then(() => {
            givenbg.set(0);
        // });
    }
    let sleeve:HTMLElement
    

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
    let backgroundism = $derived(look_selected ? "#ffc2" : "none")
    let displaymode = C.c.d == 0 ? 'table' : 'table-cell'
</script>
<nondual style="position: relative; width:100%; display:{displaymode};" >
    <!--  -->
<div id="spacer" bind:this={spacer} style="border:2px dashed black;"></div>
<!-- width: {$spacerWidth||0}px; height: {$spacerHeight||0}px; -->
<div
    id="wrapper"
    bind:this={wrapper}

    style="
        left: {sizing.left||0}px;
         top: {sizing.top||0}px;
         position:{spaciness};
    ">
    <!--  -->
    <liner
    style="width:100%;height:100%;position:absolute;
        border:2px dashed white; pointer-events:none;
    "></liner>


    <sleeve bind:this={sleeve}
    style="width:cal(100% + 6px);height:100%;position:absolute;
    border-left:1em solid hsla(120, 100%, 75%, 0);
    border-radius: 0.3em;
    top:-3px;
    left:-3px;
    "></sleeve>

 
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
</style>