<script>
	import RippleCircle from '$lib/UI/RippleCircle.svelte';
  
	let {
		rippleTrigger = false,
		color = '#555',
		spread = 300,
		time = 200,
		disabled = false,
		center = false,
		rippleEnded = () => {}
	} = $props();

	let ripples = $state([]);
	let container = $state();

	$effect(() => {
		//console.log("This should be called when rippletrigger is changed. But it's not")
		if (rippleTrigger) {
			//console.log("start ripple")
			startRipple(rippleTrigger);
		}
	});

	function startRipple(e) {
		if (disabled) return;
		ripples.push({
			x: e.clientX,
			y: e.clientY,
			top: container.getBoundingClientRect().top,
			left: container.getBoundingClientRect().left,
			id: new Date().getTime(),
		});
		update();
	}

	function stopRipple(index, id) {
		if (ripples[index].id == id) {
			ripples.splice(index, 1);
			update();
		} 
    else {
      ripples = ripples.filter((r) => r.id != id);
    }
	}

	function update() {
		ripples = ripples;
	}
</script>


<div class="ripple" onclick={startRipple}	bind:this={container}>
	{#each ripples as { x, y, top, left, id }, index (id)}
		<RippleCircle	{x}	{y}	{top}	{left} {color} {spread} {time} {center} height={container.offsetHeight}	width={container.offsetWidth}
			finished={() => {
				rippleEnded();
				stopRipple(index, id);
			}} />
	{/each}
</div>


<style>
	.ripple {
		position: absolute;
		overflow: hidden;
		display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
	}
</style>