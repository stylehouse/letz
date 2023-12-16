<script>
    import { hak,ex,dex,map,grep,sum } from "$lib/Y/Pic"

    export let diff
    
    let tally = N => sum(map(n => n.c.s.length,N))
    let neu = tally(grep(n => n.t == 'new',diff))
    let gone = tally(grep(n => n.t == 'gone',diff))

    let textfilter = (s) => {
        s = s.replace(/^\s+|\s+$/g,"")
        // escape html
        //  turns out {@html string} will not get that element name's styles
        //   as they are instead put in a class, that this element we hid in here doesn't get
        // s = s.replace(/</g, '&lt;')
        // add html
        // s = s.replace(/\t/g, '<ztab>␉</ztab>')
        // s = s.replaceAll("\n","")
        return s
    }
</script>

<!-- <zo>{#if neu}<zneu>+{neu}</zneu>{/if}{#if gone}<zgone>-{gone}</zgone>{/if}</zo> -->
    {#each diff as n}
        {#if n.t == 'same'}
            <!-- <code>x{n.c.s.length}</code> -->
        {:else}
    <zo class={n.t}>
            <code>
            {#each textfilter(n.c.s).split("\t") as s,i}
                {#if i > 0}
                    <ztab>␉</ztab>
                {/if}
                {s}
            {/each}
            </code>
    </zo>
        {/if}
    {/each}

<style>
    code {
        white-space: pre;
    }
    zo {
        background-color: rgba(12, 15, 34, 0.418);
        border: 0.12em dotted rgb(114, 250, 159);
        border-radius: calc(max(0.2em, 15%));
        font-size: 86%;
    }
    ztab { color: rgb(160, 86, 17); margin: 0.1em; }
    .same { color: rgb(21, 31, 21); margin: 0.7em; }
    .new { color: green }
    .gone { color: red }
</style>
