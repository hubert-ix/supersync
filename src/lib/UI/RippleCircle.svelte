<script>
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';

	let {
		x,
		y,
		top,
		left,
		time,
		color,
		spread,
		center,
		height,
		width,
		finished
	} = $props();

	const opacity = tweened(0.6, {duration: time});
	const size = tweened(0, {duration: time});

	onMount(() => {
		opacity.set(0);
		size.set(spread);
		let done = false;
		opacity.subscribe((val) => {
			if (done && val == 0) finished();
			else done = true;
		});
	});
</script>


<div class="s-toolbox-ripple" style="background: {color}; opacity: {$opacity}; width: {$size}px; height: {$size}px; top: {center ? height / 2 - $size / 2 : y - $size / 2 - top}px; left: {center ? width / 2 - $size / 2 : x - $size / 2 - left}px;"></div>
  

<style>
	div {
		position: absolute;
		opacity: .6;
		border-radius: 50%;
	}
</style>