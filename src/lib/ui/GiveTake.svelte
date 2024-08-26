<script lang='ts'>
	import { fly,slide,scale,crossfade } from 'svelte/transition'
	import { quintOut,linear } from 'svelte/easing';
    // box model inner|outer size finder
    // sets n.y.el_giverto etc
    let {C,n,children} = $props()
</script>


<giverto
    in:slide={{ duration:333,easing:quintOut,opacity:1 }}
    out:scale={{ duration:222,easing:quintOut,opacity:1 }}
    bind:this={n.y.el_giverto}
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
        bind:this={n.y.el_takerto} >
        {@render children()}
    </takerto>
</giverto>