<script lang='ts'>
	import { fly,slide,scale,crossfade } from 'svelte/transition'
    import {sex,isC,now,map,dec,ex,heq,hak,haks,ahk,joint,sum}  from '$lib/Y/Pic'
	import { quintOut,linear } from 'svelte/easing';
    import { onDestroy } from 'svelte';
    // box model inner|outer size finder
    // Con:C invoked us, for one of its:
    //  /Cont|Kom|Conz:n
    let {C,n,children} = $props()
    
    let givetake = $state({})
    type ageo = { width:number, height:number }
    givetake.for = (k,geo:ageo) => {
        if (givetake[k] && heq(geo,givetake[k],'width,height')) {
            // console.log(`rect ${k} geo same`)
            return
        }
        // givetake[k] && 
        //     console.log(`rect ${k} geo: ${geo.width}x${geo.height}`
        //         +` from ${givetake[k].width}x${givetake[k].height}`, {C})
        givetake[k] = geo
    }
    $effect(() => {
        if (n || givetake) n.y.givetake = givetake
    })

    let obs = {}
    let observe = (k,el,entries) => {
        let givetake = n.y.givetake
        if (!givetake) throw "No n.y.givetake "+C.t
        for (let entry of entries) {
            let { width, height } = entry.contentRect;
            width = dec(width,0)
            height = dec(height,0)
            givetake.for(k,{ el, width, height })
        }
    }
    let observer_attach = (k,el) => {
        if (obs[k]) debugger
        obs[k] = new ResizeObserver((entries) => observe(k,el,entries))
        obs[k].observe(el)
    }
    let el_giverto = $state()
    let el_takerto = $state()
    $effect(() => {
        el_giverto && observer_attach('giver',el_giverto)
        el_takerto && observer_attach('taker',el_takerto)
    })
    onDestroy(() => {
        map((ob,k) => {
            ob.disconnect()
        }, obs)
    });
</script>


<giverto
    in:slide={{ duration:333,easing:quintOut,opacity:1 }}
    out:scale={{ duration:222,easing:quintOut,opacity:1 }}
    bind:this={el_giverto}
    style="vertical-align: middle;
        border: 3px solid gainsboro;
        border-right:none; padding: 0 3px; margin: 0 3px;
        border-radius: 3px;
        position: relative;
        display:table-cell;
        "
    title="{C.t}-{C.c.pi}/{n.t}-{n.c.pi}">

    <takerto
        style="display:block;"
        bind:this={el_takerto} >
        {@render children()}
    </takerto>
</giverto>