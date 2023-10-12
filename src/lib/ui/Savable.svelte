<script lang="ts">
    import { onMount } from 'svelte';
    import {enL,deL,indents} from "$lib/Y/Text"
    import {isst} from "$lib/Y/Pic"
    import {inlace} from "$lib/St"
    import { indentLess } from "@codemirror/commands";
    //import {inlace} from "$lib/St"
    export let C = null
    export let t = null
    export let resume = null

    let lines = 'non'
    if (!t) throw "Needs name"
    if (!resume) throw "Needs resume(C) callback"

    function proc (C) {
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
    // hiding sessionStorage use from SSR or something, https://stackoverflow.com/questions/56552343
    // < wait for cm.view to materialise! but be reactive!
    //    if you do Savable before Codemirror, view hasn't been created yet
    let ready = 0
    onMount(() => {
        ready = 1
        proc(C)
    })
    $: ready && proc(C)
</script>

<pre>{lines}</pre>

<style>
    pre {
        border: 3px solid green;
        border-radius:2em;
        font-family: Monospace
    }
</style>