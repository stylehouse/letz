<script>
	import Counter from './Counter.svelte';
	import Code from './Code.svelte';
    import { onMount } from 'svelte';
	onMount(() => {

	})
</script>

<svelte:head>
	<title>letz</title>
	<meta name="description" content="letz wording" />
</svelte:head>

<section>
	<Code />

	<h2>
		trying to tediting <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
