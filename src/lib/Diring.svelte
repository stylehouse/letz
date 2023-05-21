<script>
    import { onMount } from 'svelte';
  

    let fetcho
    let dir = '2112 PreXmas/'
    async function fetchData() {
        const response = await fetch(`http://${location.hostname}:5000/dir/${dir}`);
        let N = await response.json();
        N.map(f => f.src = `http://${location.hostname}:5000/thu/${dir}${f.f}.webp`)
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

    async function blab(N) {
        await N
        console.log(N)
        //N.map(f => //f.src = `http://${location.hostname}:5000/thu/${dir}${f.t}.webp`)
    }
    $: fetcho && blab(fetcho)
  
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

.image-container p {
    flex-basis: calc(20% - 10px);
    margin: 5px;
}

.image-container img {
    width: 100%;
    height: auto;
    object-fit: cover;
}
</style>


<button on:click={() => refetcho()} > fetcho() </button>

{#if fetcho}
<div class="image-container">
    {#await fetcho}
        <p>...waiting</p>
    {:then di}
        {@const peek = di.slice(0,15) }
        {#each peek as f, i}
            <descriptor>
            {#if f.d}<p on:click={() => adfetcho(f)} style="color: green; text-decoraction: underline">{f.f}</p>
            {:else}<p>{f.f}<img src={f.src} alt="pretty"/></p>{/if}
            </descriptor>
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>
{/if}


  