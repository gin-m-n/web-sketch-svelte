<!-- https://aozora.binb.jp/reader/main.html?cid=46268 -->
<script lang="ts">
	import gsap from 'gsap';
	import { BgMeshManager, Stage } from '../../three/utils';
	let currentPage = 0;

	$effect(() => {
		const pageNumber = 4;
		const dummyHeight = window.innerHeight + 1000;
		const totalScrollableHeight = dummyHeight - window.innerHeight;
		const stage = new Stage('bg-canvas');
		stage.startRenderLoop();
		const bgMeshManager = new BgMeshManager();
		const bgMesh = bgMeshManager.gen();
		stage.add(bgMesh);
		stage.addRenderProcess(() => bgMeshManager.incrementTime());
		stage.startRenderLoop();

		const dummyHeightDom = document.getElementById('dummy-height');
		if (!dummyHeightDom) throw new Error('not found #dummy-height');
		dummyHeightDom.style.height = `${dummyHeight}px`;

		const textContainerDom = document.getElementById('text-container');
		if (!textContainerDom) throw new Error('not found #text-container');

		const scrollToCurrentPage = () => {
			const scrollRatio = window.scrollY / totalScrollableHeight;
			const page = Math.floor(scrollRatio * pageNumber);
			if (page === currentPage || page > pageNumber - 1) return;

			currentPage = page;
			const scrollX = page * textContainerDom.clientWidth;
			const duration = 0.8;
			gsap.to('#text-container', {
				x: scrollX,
				ease: 'power2.in',
				duration
			});
		};

		scrollToCurrentPage();
		window.addEventListener('scroll', () => {
			scrollToCurrentPage();
		});

		window.addEventListener('resize', () => {
			stage.onWindowResize();
			bgMeshManager.onWindowResize();
		});
	});
</script>

<div id="dummy-height">
	<div id="sticky">
		<canvas id="bg-canvas"></canvas>
		<script id="js-vertex-shader" type="x-shader/x-vertex">
		varying vec2 vUv;
		
		void main()	{
		  vUv = uv;
		  gl_Position = vec4(position, 1.0);
		}
		</script>

		<script id="js-fragment-shader" type="x-shader/x-fragment">
		    precision mediump float;
		    uniform vec2 resolution;
		    uniform float time;
		    varying vec2 vUv;
		    void main() {
				vec2 uv = (gl_FragCoord.xy) / resolution.xy;
				vec2 center = vec2(0.5, 0.5);
		      	float gray = pow(distance(uv, center),2.8);
				float baseGray = -1.0;
				float wide = 0.1;
				float r = gray + 0.5 + sin(time) * wide + baseGray;
				float g = gray + 0.5 + sin(time) * wide + baseGray;
				float b = gray + 0.5 + sin(time) * wide + baseGray + 0.5;
		      	gl_FragColor = vec4(vec3(r,g,b), 1.0);
		    }
		</script>

		<div id="text-container">
			<div class="page title">
				<p class="auther dummy">dummy</p>
				<h1>星めぐりの歌</h1>
				<p class="auther">宮澤賢治</p>
			</div>
			<div class="page">
				<p class="page-content">
					あかいめだまの　さそり<br />
					ひろげた鷲の　　つばさ<br />
					あをいめだまの　小いぬ、<br />
					ひかりのへびの　とぐろ。
				</p>
			</div>
			<div class="page">
				<p class="page-content">
					オリオンは高く　うたひ<br />
					つゆとしもとを　おとす、<br />
					アンドロメダの　くもは<br />
					さかなのくちの　かたち。
				</p>
			</div>
			<div class="page">
				<p class="page-content">
					大ぐまのあしを　きたに<br />
					五つのばした　　ところ。<br />
					小熊のひたいの　うへは<br />
					そらのめぐりの　めあて。
				</p>
			</div>
			<!-- <div class="page">
				<p class="page-content">ここに、開発者の私の情報を乗っける</p>
			</div> -->
		</div>
	</div>
</div>

<style>
	#sticky {
		position: sticky;
		top: 0;
		right: 0;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	#bg-canvas {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 0;
	}

	#text-container {
		/* 画面全体を覆う  100vw, 100vh はスクロールバーを含めた大きさであるため、意図しない大きさになってしまう */
		position: absolute;
		width: 100%;
		height: 100%;

		z-index: 1;

		display: flex;
		flex-direction: column;

		writing-mode: vertical-rl;
	}

	.page {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}

	.title {
		display: flex;
		gap: 60px;
		color: white;
		font-weight: 800;
	}

	.auther {
		writing-mode: initial;
		font-weight: 400;
	}
	.auther.dummy {
		visibility: hidden;
	}

	.page-content {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 200px;
		height: calc(200px * sqrt(3));

		font-weight: 500;
		line-height: 1.6;
		color: white;

		background-color: rgba(0, 0, 0, 0);
		border: 1px white solid;
	}
</style>
