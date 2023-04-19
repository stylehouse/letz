<script lang="ts">
	import { scale } from 'svelte/transition'
    import { onMount } from 'svelte'

    import {detect_type, o_}  from '$lib/St'
    export let t = 'Con'
    export let s = undefined
    export let d:number = 0

    // params for children
    let chattr = {d: d+1}
    let boost = 0
    let typ = detect_type(s)
    let sym = typ.bracket || typ.sym
    let Ct
    // separate to the t this component got
    if (typ.Cish) {
        // < sometimes we avoid stating this if == t
        Ct = s.t
    }

    let nodules = []
    function nodulate() {
        let nodules = []
        // mix up an esteem for more
        let boots = ((typ.Cish && d < 2
            || typ.iter && d<3) ? 1 : 0) + boost
        if (typ.iter && boots > 0) {
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
        if (typ.Cish && boots > 0) {
            let N = o_(s)
            for (let [k, v] of Object.entries(N)) {
                nodules.push({
                    ...chattr,
                    t: k,
                    s: v
                })
            }
        }
        return nodules
    }
    $: nodules = nodulate(boost)

    function boosting (e, negate=false) {
        boost += e.ctrlKey || negate ? -1 : 1
        console.log("Boosting", boost)
    }

    let say
    if (typ.num || typ.str || typ.bool) {
        say = s
        if (typ.str) say = '"' + say + '"'
    }

    let wrapper
    onMount((e,t,c) => {
        if (Ct == 'Dublin City') {
            let geo = wrapper.getBoundingClientRect()
            console.log("Con onMount", geo)
        }
    })
    
</script>

<div bind:this={wrapper}>
<span style="color:deepskyblue" on:pointerdown={(e) => boosting(e)}>{t}</span>
{#if 0} <span style="color:blueviolet" >&lt;&lt;</span>{/if}
{#if boost} <span style="color:blueviolet" on:pointerdown={(e) => boosting(e,'negate')}>+{boost}</span>{/if}
{#if sym} <span style="color:cornsilk">{sym}</span>{/if}
{#if Ct} <span style="color:gainsboro">{Ct}</span>{/if}
{#if say} <span style="color:darkcyan"> {say} </span>{/if}
{#if nodules.length}
    <nodules transition:scale style="display:inline-block; vertical-align: middle; border:1px solid gainsboro; border-right:none; padding: 0 3px; margin: 0 3px; border-radius: 3px;">
    {#each nodules as n}
        <nodule transition:scale style="display:block">
            <svelte:self {...n} />
        </nodule>
    {/each}
    </nodules>
{/if}
</div>