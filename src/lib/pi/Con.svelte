<script lang="ts">
    import {onMount, onDestroy, getContext} from 'svelte'
    import {o_}  from '$lib/St'
    import {sip_wiree, reConstruct}  from '$lib/Co'
    import Coning from '$lib/Coning.svelte';
    # < look into https://github.com/kaisermann/svelte-loadable to name these at runtime
    import Cont from '$lib/pi/Cont.svelte';
    import Conz from '$lib/pi/Conz.svelte';
    import Dir from '$lib/pi/Dir.svelte';
    let pis = {Cont, Conz, Dir}
    # our instructions: (-Con/(-Cont|-Conz))**
    export let C
    let boost = C.c.boost || 0
    
    # only changes when we are sent an update specifically
    let update:number
    sip_wiree(C, v => {
        C = v
        update = C.c.version
    })
    

    # label from above (key into here - Cont%Ct is the s.t on the inside)
    let t
    let sip
    let quee
    let chat = 0
    function upto() {
        t = C.t
        quee = update || '='
        sip = C.c.ip.join('.')
        chat && console.log("anbup",C.c.ip)
    }
    chat && console.log("mozwales",C.c.ip)
    $: upto(C,boost)

    onMount(() => {
        //if (sip == '1.2.1.2.2') debugger
    });

    // TODO not sure how to get boost into the toCon process
    function boosting (e, negate=false) {
        boost += e.ctrlKey || negate ? -1 : 1
        C.c.boost = boost
        # try again here
        #  saves having to click ring() at the top
        #   however: we dont reiterate the source data from the top,
        #    so often opening Dir** and looking at the D** generated
        #     require ring() to get the most unfolded D**
        reCon(e)
    }
    // refreshing the process, when children want to adjust things
    function reCon (e) {
        C = reConstruct(C)
    }
    # < this wants overlaying|geo via a parent
    $datadump
</script>

<span style="color:deepskyblue" on:pointerdown={(e) => boosting(e)}>{t}</span>
{#if boost} <span style="color:blueviolet" on:pointerdown={(e) => boosting(e,'negate')}>+{boost}</span>{/if}
{#if C.c.unwired} <span style="color:red">!wired</span>{/if}

<c_sip style="font-size:70%" on:pointerdown={(e) => datadump = 1}> {sip} </c_sip>
{#if datadump}
    <!-- data dump (leaving the mind our Con** is from) -->
    <Coning C={C.c.s} noC />
{/if}
<!-- <revision style="color:darkcyan; text-decoration:underline">{quee}</revision> -->


{#each o_(C) as n}
    <span style="display:inline-block; vertical-align: middle; border:2px solid gainsboro; border-right:none; padding: 0 3px; margin: 0 3px; border-radius: 3px;">
        <svelte:component on:reCon="{reCon}" this={pis[n.c.pi]} C={n}/>
    </span>
{/each}
