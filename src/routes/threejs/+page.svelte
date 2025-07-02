<script lang="ts">
	import * as THREE from 'three';

	$effect(() => {
		const scene = new THREE.Scene();
		let camera = new THREE.OrthographicCamera(
			window.innerWidth / -2,
			window.innerWidth / 2,
			window.innerHeight / 2,
			window.innerHeight / -2,
			1,
			1000
		);
		camera.position.z = 100;

		scene.background = new THREE.Color(0x999999);

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		window.addEventListener('resize', () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera = new THREE.OrthographicCamera(
				window.innerWidth / -2,
				window.innerWidth / 2,
				window.innerHeight / 2,
				window.innerHeight / -2,
				1,
				1000
			);
			camera.position.z = 100;
		});

		renderer.domElement.style.position = 'absolute';
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

		const boxSize = 100;
		const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
		const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(0x2128eb) });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

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

<div class="container" id="threejs-canvas-container"></div>
<div class="text-container">
	<text class="text">TITLE</text>
</div>

<style>
	.text-container {
		position: absolute;
	}
	.text {
		color: red;
	}
</style>
