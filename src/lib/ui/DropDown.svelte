<script>
	import {defor,isar,map} from "$lib/Y/Pic"
    import DropDown from "$lib/ui/DropDown.svelte"
	export let N
	export let set
	export let n
	let hash = !isar(N) && N
	if (hash) {
		N = []
		map((s,t) => N.push({t}), hash)
	}
</script>


<select bind:value={n} on:change={() => set(hash ? hash[n.t] : n)}>
	{#each N as n}
		<option value={n}> {defor(n.t,n.name,"?")} </option>
	{/each}
</select>

<style>
	
.knob {
	display: block;
	width: 4em;
	height: 4em;
	padding: 0;
	border-radius: 50%;
	background-image: conic-gradient(white 0%, white 2%, black 2%, black 98%, white 98%, white 100%);
}
</style>

