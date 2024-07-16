<script>
    import { createEventDispatcher, onMount } from 'svelte'
    import { pit,o_up } from "$lib/St.svelte"
	const dispatch = createEventDispatcher();

    // we are in a -Con(s)/-Dir:C
    export let C
    let Con = C.y.up
    let s = Con.c.s
    if (!s.c.pi == 'Dir') throw "!Dir"
    // climb the s**? find all -Dir above us we are relative to
    //   to formlink to the whole thing
    let path = o_up(s).filter(s => !s.c.rootdir && s.c.pi == 'Dir').reverse()
    let dir = path.map(s => s.t).join("/")
    
    // f is a file object from /dir/
    let formlink = (t,dir,file) => `http://${location.hostname}:5000/${t}/${dir}`+(file?'/'+file:'')
    // N[f+] come without src, since it is long
    let fsrc = (N) => {
        N.map(f => f.src = formlink('thu',dir,f.f)+'.webp')
        N.map(f => f.full_src = formlink('dir',dir,f.f))
    }
    async function fetchData() {
        const response = await fetch(formlink('dir',dir))
        let N = await response.json()
        fsrc(N)
        return N
    }
    let req
    function upto() {
        req ||= fetchData()
    }
    $: upto(C)
    function nestDir(f) {
        // promote listing f to being /-Dir
        pit(s,f.f,'-Dir')
        dispatch('reCon')
    }
    function animg(e,f) {
        let diff = e.ctrlKey ? -1 : 1
        let el = e.target
        let fl = el.getAttribute('flourish') || 4
        fl = (fl*1)+diff
        el.setAttribute('flourish',fl)
        // < apply a curve
        let al = -3 + fl
        al = al<0 ? al*-1*0.25 : al * 1.4 + 1
        e.target.style.transform = 'scale('+al+')'
    }
    function gist_thumb() {
        
    }
    let population_limit = 15
    let alive
    onMount(() => alive = 1)
</script>

{#if !alive}
<h1>Not Alive</h1>
{/if}

<div class="image-container">
    {#await req}
        <p>...waiting</p>
    {:then di}
        {@const peek = di.slice(0,population_limit) }
        {#each peek as f, i (f.f)}
            <descriptor style="{f.f.includes('4999') ? 'flex-basis: calc(75%);' : ''}">
            {#if f.d}
                <button on:click={() => nestDir(f)} class='large'>{f.f}</button>
            {:else}
                <p>{f.f}
                        <!-- sizes="(max-width: 800px) 400px, 100vw" -->
                    <img on:click={(e)=>animg(e,f)}
                        srcset={`${new URL(f.src)} 1200w, ${new URL(f.full_src)} 2100w`}
                         alt="pretty"/>
                    <!-- <img src={formlink('thv',dir,f.f)+'.gif'} alt="pretty"/>  -->
                </p>
                {#if f.interest}
                    <button on:click={() => gist_thumb(f)} class='large'>unique frames</button>
                {/if}
            {/if}
            </descriptor>
        {/each}
        <p style="transform:rotate(90deg);"><button on:click={() => population_limit+=5} >More</button></p>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>

<style>
    .image-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: stretch;
    }
    
    @media screen and (min-width: 721px) {
        .image-container descriptor {
            flex-basis: calc(20%);
        }
    }
    @media screen and (min-width: 1200px) {
        .image-container descriptor {
            flex-basis: calc(15%);
        }
    }
    .large {
        font-size: 2em;
    }
    
    .image-container img {
        width: 100%;
        height: auto;
        object-fit: cover;
        /* max-width: 400px;
        max-height: 400px; */
    }
    </style>
    