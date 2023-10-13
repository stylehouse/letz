<script>
	import Counter from "./Counter.svelte";
	import Code from "./Code.svelte";
	import { onMount } from "svelte";

	onMount(() => {});
</script>

<svelte:head>
	<title>letz</title>
	<meta name="description" content="letz wording" />
</svelte:head>

<section>
	<Code />

	<!-- <Counter /> -->
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		flex-flow: row wrap;
		flex-direction: row;
	}
</style>
