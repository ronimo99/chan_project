<script>
	import { reply_box_coords } from "/src/stores.js";
	export let textarea_mouseover;
	let moving = false; 
	let tempX;
	let tempY;
	let screen_width;
	let screen_height;
	
	function start() {
		if (textarea_mouseover)
			moving = false;
		else moving = true;
	}
	
	function stop() {
		moving = false;
	}
	
	function move(e) {
		if (moving) {
			tempX = $reply_box_coords.x + e.movementX;
			tempY = $reply_box_coords.y + e.movementY;

			if (tempX >= 0 && tempX+200 < screen_width && tempY >= 0 && tempY+150 < screen_height) {
				$reply_box_coords.x = tempX;
				$reply_box_coords.y = tempY;
			}
		}
	}

	//$: console.log("Reply Box - X: "+ $reply_box_coords.x + " Y: "+ $reply_box_coords.y);
</script>

<svelte:window on:mouseup={stop} on:mousemove={move} bind:innerHeight={screen_height} bind:innerWidth={screen_width}/>

<section on:mousedown={start} style="left: {$reply_box_coords.x}px; top: {$reply_box_coords.y}px;" class="draggable">
	<slot></slot>
</section>

<style>
	.draggable {
		user-select: none;
		position: fixed;
	}
</style>