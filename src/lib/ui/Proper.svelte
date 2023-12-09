<script>
    import Coning from "$lib/Coning.svelte";
    import { hak,ex,dex,map,isC,ahk,peel } from "$lib/Y/Pic"
    // somewhere in -Con**
    export let C
    // what to look at, if not C
    export let s
    // what to ignore, a list,of,gk
    export let ig
    let ignore_gk = ig && peel(ig)

    s ||= C
    if (!isC(s)) debugger
    $: seewhat(), C, s

    let what = []
    function seewhat() {
        map((nk) => {
            let nkx = s[nk]
            let huh = {nk}
            what.push(huh)
            map((v,gk) => {
                let say = ''
                if (isC(v)) say = "C"
                let a = {gk,say}
                ahk(huh,['N'],a)
            },nkx)
        },['y','c','sc'])
    }
</script>

<!-- <Coning t="Ohno what" C={what} /> -->

<span id="typeyspace">
    {#each what as huh (huh.nk)}
        <zo>
            <zc class="big">{huh.nk}</zc>
            {#if huh.N}
                <ze>
                    {#each huh.N as a (a.gk)}
                        <zl>{a.gk}</zl>{#if a.say}<zg>{a.say}</zg>{/if}
                    {/each}
                </ze>
            {/if}
        </zo>
    {/each}
</span>

<style>
    .big {font-size:130%}
    zc {
        color:rgb(173, 173, 189);
    }
    zl {
        color:rgb(0, 225, 255);
    }
    zg {
        color:rgb(97, 97, 163);
    }
    ze {
        color:rgb(11, 11, 109);
        margin:0.12em;
    }
    zo {
        background-color: rgba(47, 102, 33, 0.418);
        border: 0.12em dotted rgb(114, 250, 159);
        border-radius: calc(max(0.4em, 15%));
    }
    #typeyspace {
        background: rgba(107, 84, 41, 0.548);
        color: green;
        display: inline-block;
        margin:0.2em;
    }
    .ghostily {
        opacity:0.5
    }
</style>
