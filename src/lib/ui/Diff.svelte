<script>
    import { hak,ex,dex,map,grep,sum } from "$lib/Y/Pic"

    export let diff
    
    let tally = N => sum(map(n => n.c.s.length,N))
    let neu = tally(grep(n => n.t == 'new',diff))
    let gone = tally(grep(n => n.t == 'gone',diff))

    let textfilter = (s) => {
        s = s.replaceAll(/^\s+|\s+$/g,"")
        s = s.replaceAll("\n","")
        return s
    }
</script>

<zo>{#if neu}<zneu>+{neu}</zneu>{/if}{#if gone}<zgone>-{gone}</zgone>{/if}</zo>
<zo>
    {#each diff as n}
        {#if n.t == 'new'}
            <zneu><code>{textfilter(n.c.s)}</code></zneu>
        {/if}
        {#if n.t == 'gone'}
            <zgone><code>{textfilter(n.c.s)}</code></zgone>
        {/if}
    {/each}
</zo>

<style>
    code {
        white-space: pre;
    }
    zo {
        background-color: rgba(47, 102, 33, 0.418);
        border: 0.12em dotted rgb(114, 250, 159);
        border-radius: calc(max(0.4em, 15%));
    }
    .zneu { color: green }
    .zgone { color: red }
</style>
