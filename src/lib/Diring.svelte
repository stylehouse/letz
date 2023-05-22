<script>
    import { onMount } from 'svelte';
  

    let fetcho
    let dir = '2112 PreXmas/'
    // f is a file object from /dir/
    let formlink = (t,dir,file) => `http://${location.hostname}:5000/${t}/${dir}`+(file||'')
    // N[f+] come without src, since it is long
    let fsrc = (N) => N.map(f => f.src = formlink('thu',dir,f.f)+'.webp')
    async function fetchData() {
        const response = await fetch(formlink('dir',dir))
        let N = await response.json()
        fsrc(N)
        return N
    }
    // ls
    function refetcho() {
        fetcho = fetchData()
    }
    // cd
    function adfetcho(f) {
        dir += f.f+'/'
        refetcho()
    }

    // open toolbox
    function animg(e,f) {
        console.log(f)
        // cat and gist a movie?
        f.interest = 1
    }
    
    let gists
    async function gist_thumb(e,f) {
        const response = await fetch(`http://${location.hostname}:5000/dir/${dir}`);
        let N = await response.json();
        fsrc(N)
        return N
    }

  
    onMount(async () => {
      // Fetch?
    });
</script>

<style>
.image-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.image-container descriptor {
    flex-basis: calc(33%);
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
    max-width: 400px;
    max-height: 400px;
}
</style>


<button on:click={() => refetcho()} > fetcho() </button>

{#if fetcho}
<div class="image-container">
    {#await fetcho}
        <p>...waiting</p>
    {:then di}
        {@const peek = di.slice(0,5) }
        {#each peek as f, i}
            <descriptor>
            {#if f.d}<a on:click={() => adfetcho(f)} class='large'>{f.f}</a>
            {:else}
                <p>{f.f}<img on:click={(e)=>animg(e,f)} src={f.src} alt="pretty"/>
                    <img src={formlink('thv',dir,f.f)+'.gif'} alt="pretty"/> </p>
                {#if f.interest}
                    <a on:click={() => gist_thumb(f)} class='large'>unique frames</a>
                {/if}
            {/if}
            </descriptor>
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>
{/if}


  