<script lang="ts">
    import {detect_type}  from '$lib/St'
    export let t = 'Con'
    export let s = undefined
    export let d:Number = 0

    // params for children
    let chattr = {d: d+1}
    let boost = 0
    let typ = detect_type(s)
    let sym = typ.bracket || typ.sym
    let Ct
    // separate to the t this component got
    if (typ.Cish && t != s.t) {
        Ct = s.t
    }

    let nodules = []
    if (typ.iter && d <3) {
        // many parts of this object, or s/*
        // multiply chattr to make children
        for (let [k, v] of Object.entries(s)) {
            nodules.push({
                ...chattr,
                t: k,
                s: v
            })
        }
    }

    let say
    if (typ.num || typ.str || typ.bool) {
        say = s
        if (typ.str) say = '"' + say + '"'
    }
    
</script>

<span style="color:deepskyblue">{t}</span>
{#if sym} <span style="color:cornsilk">{sym}</span>{/if}
{#if Ct} <span style="color:gainsboro">{Ct}</span>{/if}
{#if say} <span style="color:darkcyan"> {say} </span>{/if}
{#if typ.iter}
    {#each nodules as n}
        <svelte:self {...n}/>
    {/each}
{/if}