<script lang="ts">
    import {enL,indents} from "$lib/Y/Text"
    import {inlace} from "$lib/St"
    import { indentLess } from "@codemirror/commands";
    //import {inlace} from "$lib/St"
    export let C = null

    let lines = 'non'

    function proc (C) {
        lines = inlace(C,{
            grab: (C,d) => indents(d.d*2,enL(C),'notailnl'),
        }).join("\n")
    }
    $: proc(C)

</script>

<pre>{lines}</pre>

<style>
    pre {
        border: 3px solid green;
        border-radius:2em;
        font-family: Monospace
    }
</style>