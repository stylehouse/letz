<script>
    import { onMount } from 'svelte';
  

    let fetcho
    let dir = '2112 PreXmas/'
    async function fetchData() {
        const response = await fetch(`http://${location.hostname}:5000/dir/${dir}`);
        return await response.json();
    }
    // ls
    function refetcho() {
        fetcho = fetchData()
            // Slice the array to show only the first 15 things
        //    .then(N => N.slice(0,15))
    }
    // cd
    function adfetcho(f) {
        dir += f.f+'/'
        refetcho()
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
            {#if f.d}<p on:click={() => adfetcho(f)} style="color: green; text-decoraction: underline">{f.f}</p>
            {:else}<p>{f.f}<img src="http://{location.hostname}:5000/thu/{dir}{f.f}.webp" alt="pretty"/></p>{/if}

        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>
{/if}


  