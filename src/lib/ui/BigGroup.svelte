<script lang=ts>
    //import Knob from "$lib/ui/Knob.svelte"
    import Knob from '@bismuthsoft/svelte-dj-knob';
    let sizer = 31;

</script>


<biggroup style="min-width:{sizer}em; min-height: {sizer}em;">
    <span> size:<Knob bind:value={sizer} min=5 max=80 step=2 size="3rem" /> </span>
    <slot></slot>
</biggroup>