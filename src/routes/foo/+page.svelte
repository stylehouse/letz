<script>
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	export let data;
	export let form;
</script>

<form method="POST" use:enhance>
	<label>
		the page:
		<input name="page" value={data.page} />
        {#if form?.error}
                <p class="error">{form.error}</p>
        {/if}
	</label>
</form>

{#key data.page}
<img src={data.png} out:slide alt="Page {data.page} of my PDF file" />
{/key}