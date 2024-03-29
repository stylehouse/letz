<script lang="ts">
    import { onDestroy, tick } from "svelte";

	// < gestures to step up|down scale...
	//	  a C to the bottom 1/10, where the top of the previous range was
    //   so Knob can be used for any number, ie guessing min|max
	//  < sideways going to components beside this one, with surface tensions
	// < pending value, actually set on release
	//    alternative props that set value and imply when (how streamingly) you want it changed
	//    a sale is more stable than a value, right?
	// < feeding a function to show the pending value
	//    as a colour space explorer, make bluenoise|phi pointilism glow
	export let value = 5;
	export let min = 1;
	export let max = 10;
	// how finely you notch the range
	//  step=0.001 is too small to adjust with movement in pixels
	export let step = 1;
	//  300px seems good can be done in either direction by a relaxed hand
	export let space = 300;
	export let size = "2rem";

	let elem: Element;
	let elemVal: Element;
	let unlock: Function = () => 1;
	// a lock becomes a selection when not moved
	let moved = false;
	// remember where we started each time
	let started = null
	// once a new value has been output, each time
	let outpute = false
	// buffer value until it has changed a whole step
	let rawValue = null;
	// usually there's a pointerup event to release the lock
	let release = () => {
		// console.log("On release")
		// knob settles into where it may be rounded to
		rawValue = value
		// workaround a kwin-wayland bug?
		move_pointer_to_where_it_started()
		// the essential unlock()
		//  can also be called ad hoc when our claim to the interaction seems to be falling apart
		unlock()
		// just clicking on the value takes you to typing in a new one
		if (!moved) elemVal.select()
	}
	let locksanity = () => document.pointerLockElement != elem && unlock()
	let lock = (ev) => {
		elem.requestPointerLock();
		// to not stick around after alt-tab (or other unknown interference)
		let lockchange = () => locksanity()
		document.addEventListener("pointerlockchange", lockchange)
		document.addEventListener("pointermove", knobMove)

		moved = false
		started = {clientX:ev.clientX,clientY:ev.clientY}
		outpute = false

		// console.log("Start pointer at ",started)
		unlock = () => {
			// console.log("unlock")
			document.removeEventListener("pointermove", knobMove)
			document.removeEventListener("pointerlockchange", lockchange)
			document.pointerLockElement == elem
				&& document.exitPointerLock()
			unlock = () => {}
		};
	};
	onDestroy(unlock);

	// fit our range onto a standard drag-distance space
	let range = max - min;
	let scaleFactor = space / range;
	function scaleMovement(distance: number) {
		return (distance /= scaleFactor);
	}

	// make v multiple of step
	function roundToStep(v: number) {
		let surplus = v % step;
		v -= surplus
		if (surplus*2 >= step) {
			v -= -step
		}
		return dec(v,8);
	}
	function knobMove(event: PointerEvent): void {
		let { movementY } = event;
		if (movementY) {
			moved = true;
			if (rawValue == null) rawValue = value;
			if (outpute == false && scaleFactor >= 42) {
				// to the first step (either way) a bit easier
				movementY *= 1.618
			}
			// accumulate this change
			rawValue = clamp(min, rawValue - scaleMovement(movementY), max);
			// output a multiple of step near that
			let newValue = roundToStep(rawValue)
			if (newValue != value) {
				outpute = true
				value = newValue
			}
		}
		locksanity()
	}
	// < this doesn't seem to work around this bug: https://bugs.kde.org/show_bug.cgi?id=478462
	let move_pointer_to_where_it_started = async () => {
		if (!started) return
    	await new Promise(resolve => setTimeout(resolve, 150));
		// await tick()
		var event = new MouseEvent('mousemove', {
			bubbles: true,
			cancelable: true,
			view: window,
			clientX: started.clientX,
			clientY: started.clientY
		});
		document.dispatchEvent(event)
	}
	let clamp = (a,b,c) => {
		return Math.min(Math.max(a, b), c);
	}
	let dec = (s,precision) => {
        if (null == precision) precision = 4
        let mul = '1e'+precision
        return (s * mul).toFixed() / mul
    }
	// also, we can type stuff in
	let onInputChange = (ev) => {
		let v = ev.currentTarget.value
		if (v*1 != v) return console.error("Ungood knob input", v)
		value = v
	}

	// the min and max values cause the knob to lean either way
	let lean
	$: lean = value == min ? +5 : value == max ? -5 : 0
	let width = "1.2em"
	let height = "1.2em"
</script>

<zf bind:this={elem} on:pointerdown|stopPropagation={lock} on:pointerup={release}>
	<span id="knobaura">
		<span id="knobblob">
			<svg {width} {height}>
				<circle class="knobBg" cx="5" cy="{10 + lean}" r="10"/>
			</svg>
		</span>
	</span>
	<input
		type="text"
		bind:this={elemVal}
		on:change={onInputChange}
		value={value}
		/>
	<!-- <span bind:this={elemVal} contenteditable="true">{value}</span> -->
</zf>

<style>
	#knobaura {
    	position: relative;
	}
	#knobblob {
		position: absolute;
		z-index: -1;
		pointer-events: none;
		color: #394a;
	}
	.knobBg {
		fill:rgb(75, 75, 55);
	}
	svg {
		overflow: hidden;
	}
	input {
		width: 1.2em;
		text-align: center;
		background: none;
		border: none;
		outline: none;
		pointer-events: none;
	}
	input:focus {
		pointer-events: auto;
	}
	zf {
		display: inline-block;
		min-width: 1.2em;
		min-height: 1.2em;
		border-left: 1px solid black;
		overflow: hidden;
        border-radius: 0.5em;
		vertical-align: middle;
	}
	zf span {
		pointer-events:none;
	}
</style>
