<script>
    // what ghostily to write there
    export let t = " "
    export let v = "bind:v={somevar} me"
    let waits = v
    let ghostily = 'ghostily'
    function enter() {
        ghostily = ''
        // empty it of ghost text while they are in it
        t = ''
    }
    function keydown(e) {
        console.log("Textin press: "+e.key)
    }
    function leave() {
        v = waits
    }
</script>

<span id="typeyspace" contenteditable="true" bind:textContent={waits}
    class={ghostily} on:focus={enter} on:keydown={keydown} on:blur={leave}
    >{t}</span>

<style>
    #typeyspace {
        background: black;
        color: green;
        display: inline-block;
        min-width: 1em;
    }
    .ghostily {
        opacity:0.5
    }
</style>
