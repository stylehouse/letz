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

<img src={data.png} in:fly={{ y: 20 }} out:slide class=inscreen alt="Page {data.page} of my PDF file" />
