<script lang="ts">
	import * as THREE from 'three';

	$effect(() => {
		const scene = new THREE.Scene();
		// const camera = new THREE.PerspectiveCamera(
		// 	75,
		// 	window.innerWidth / window.innerHeight,
		// 	0.1,
		// 	1000
		// );

		const camera = new THREE.OrthographicCamera(
			window.innerWidth / -2,
			window.innerWidth / 2,
			window.innerHeight / 2,
			window.innerHeight / -2,
			1,
			1000
		);
		scene.add(camera);

		// scene.background = new THREE.Color(0x111);

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.domElement.style.position = 'fixed';
		const canvasContainer = document.querySelector('#threejs-canvas-container');
		if (!canvasContainer) {
			console.error('not found canvas container');
			return;
		}
		canvasContainer.appendChild(renderer.domElement);

		const light = new THREE.HemisphereLight(0xffffff, 1);
		light.position.x = 100;
		light.position.y = 100;
		light.position.z = 100;
		scene.add(light);

		const geometry = new THREE.BoxGeometry(100, 100, 100);
		const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(0x2128eb) });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		camera.position.z = 100;

		const animate = () => {
			// cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			cube.rotation.z += 0.01;
			renderer.render(scene, camera);
		};

		renderer.setAnimationLoop(animate);

		return () => {
			canvasContainer.removeChild(renderer.domElement);
		};
	});
</script>

<div class="container" id="threejs-canvas-container">
	<text class="text">TITLE</text>
</div>

<style>
	.container {
		background: rgba(0, 0, 0, 255);
	}
	.text {
		color: white;
	}
</style>
