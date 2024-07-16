<script lang="ts">
    import { onMount, tick } from 'svelte';
    import {enL,deL,indents} from "$lib/Y/Text"
    import {isst} from "$lib/Y/Pic"
    import {inlace} from "$lib/St.svelte"
    import { indentLess } from "@codemirror/commands";
    import But from './But.svelte';
    //import {inlace} from "$lib/St"
    export let C = null
    export let t = null
    export let resume = null

    let lines = 'non'
    if (!t) throw "Needs name"
    if (!resume) throw "Needs resume(C) callback"

    async function proc (C) {
        await tick()
        C ? saves(C) : resumes()
    }
    function saves (C) {
        lines = inlace(C,{
            grab: (C,d) => indents(d.d*2,enL(C),'notailnl'),
        }).join("\n")

        sessionStorage.setItem(t, lines)
    }
    function resumes () {
        let saved = sessionStorage.getItem(t)
        if (!saved ) return
        let N = deL(saved)
        if (N[1]) debugger
        resume(N[0])
    }
    // delete C/* and save
    //  currently the only way to stop having a saved selection in codemirror
    //   since we only save state in whatsthis(), there is no sense of neutralising the selection
    // < better feed of glance state from the developer.
    function forgetit () {
        C.sc.z = []
        proc(C)
    }
    // hiding sessionStorage use from SSR or something, https://stackoverflow.com/questions/56552343
    // < wait for cm.view to materialise! but be reactive!
    //    if you do Savable before Codemirror, view hasn't been created yet
    let ready = 0
    onMount(() => {
        ready = 1
        proc(C)
    })
    $: ready && proc(C)
    let b = {nah:forgetit}
</script>


<code>
    <huh>Savable</huh>
    <But {b} />
    <code>{lines}</code>
</code>

<style>
    .nah {
        color: burlywood;
    }
    code huh {
        font-size: 1.4rem;
    }
    code {
        border: 3px solid green;
        border-radius:2em;
        font-family: Monospace;
        white-space: pre;
        display:inline-block;
    }
</style>