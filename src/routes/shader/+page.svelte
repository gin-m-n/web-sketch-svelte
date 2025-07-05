<script>
	import { Stage, BgMeshManager } from '../../three/utils';
	$effect(() => {
		const stage = new Stage('webgl-canvas');
		const meshManager = new BgMeshManager();
		const mesh = meshManager.gen();
		window.addEventListener('mousemove', (event) => {
			const x = event.clientX;
			const y = event.clientY;
			meshManager.onMouseMove(x, y);
		});
		stage.add(mesh);
		stage.startRenderLoop();
		stage.addRenderProcess(() => meshManager.incrementTime());
	});
</script>

<div>
	<canvas id="webgl-canvas"></canvas>
	<script id="js-vertex-shader" type="x-shader/x-vertex">
		varying vec2 vUv;
		
		void main()	{
		  vUv = uv;
		  gl_Position = vec4(position, 1.0);
		}
	</script>

	<script id="js-fragment-shader" type="x-shader/x-fragment">
		precision mediump float;
		uniform float time;
		uniform vec2 mouse;
		varying vec2 vUv;

		void main() {
		  gl_FragColor = vec4(mouse.x,mouse.y, 0.0, 1.0);
		}
	</script>

	<script id="js-fragment-shader-2" type="x-shader/x-fragment">
		precision mediump float;
		uniform float time;
		varying vec2 vUv;
		void main() {
		  vec2 p = vUv * 1.0 - 0.5;
		  float r = 1.0 + 0.5 * (sin(5.0 * p.x + time));
		  float g = 1.0 + 0.5 * (sin(5.0 * p.y) + sin(time + 2.0 * p.x));  
		  float b = 1.0 + 0.5 * (sin(5.0 + p.x * p.y * 17.0) + sin(time * 0.4  + 4.0 * p.y));
		  gl_FragColor = vec4(r, g, b, 1.0);
		}
	</script>
</div>
