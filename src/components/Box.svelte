<script>
	import { gsap } from 'gsap';

	const animate = () => {
		gsap.to('.box', {
			x: 200
		});
	};
</script>

<button onclick={animate}>animate</button>
<div class="box"></div>

<style>
	.box {
		width: 200px;
		height: 200px;
		background-color: green;
	}
</style>
