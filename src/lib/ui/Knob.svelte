
<script>
	import Knob from '@bismuthsoft/svelte-dj-knob';
	// < if 0-5, spread gesture out more... all ranges of the same expanse...
	//   gestures to step up|down scale... 
	//	  a C to the bottom 1/10, where the top of the previous range was
	export let value = 5
	export let min=1
	export let max=10
	export let step=1
	export let size="2rem"
</script>

<Knob bind:value={value} {min} {max} {step} {size} />
