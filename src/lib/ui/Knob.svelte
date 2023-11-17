
<script>
	import Knob from '@bismuthsoft/svelte-dj-knob';
	export let value = 5
	export let min=1
	export let max=10
	export let step=1
	export let size="2rem"
</script>

<Knob bind:value={value} {min} {max} {step} {size} />
