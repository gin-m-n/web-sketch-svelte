import * as THREE from 'three';

export class Stage {
	// scene renderer camera
	private renderProcessList: (() => void)[] = [];
	private scene: THREE.Scene;
	private renderer: THREE.WebGLRenderer;
	private camera: THREE.OrthographicCamera;

	constructor() {
		// scene
		this.scene = new THREE.Scene();
		//renderer
		const webglCanvas = document.getElementById('webgl-canvas');
		if (!webglCanvas) {
			throw new Error('not found #webgl-canvas');
		}
		this.renderer = new THREE.WebGLRenderer({
			canvas: webglCanvas
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		// camera
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	addRenderProcess(fn: () => void) {
		this.renderProcessList.push(fn);
	}

	startRenderLoop() {
		this.renderer.setAnimationLoop(() => {
			this.renderProcessList.forEach((fn) => fn());
			this.render();
		});
	}

	add(mesh: THREE.Mesh) {
		this.scene.add(mesh);
	}
}

export class MeshManager {
	uniforms = {
		time: { type: 'f', value: 1.0 },
		mouse: { value: new THREE.Vector2(1, 0) }
	};

	private getShaderById(id: string): string {
		const shaderDom = document.getElementById(id);
		if (!shaderDom) throw new Error(`${id} is not found`);
		if (!shaderDom.textContent) throw new Error('shader is empty');

		return shaderDom.textContent;
	}

	gen() {
		const vertShader = this.getShaderById('js-vertex-shader');
		const fragShader = this.getShaderById('js-fragment-shader');

		const geo = new THREE.PlaneGeometry(1, 1);
		const mat = new THREE.ShaderMaterial({
			vertexShader: vertShader,
			fragmentShader: fragShader,
			uniforms: this.uniforms
		});
		const mesh = new THREE.Mesh(geo, mat);
		return mesh;
	}

	incrementTime() {
		this.uniforms.time.value += 0.01;
	}

	updateMouse(x: number, y: number) {
		const normalizedX = (x / window.innerWidth) * 2 - 1; // -1 to 1
		const normalizedY = (y / window.innerHeight) * 2 - 1; // -1 to 1
		this.uniforms.mouse.value.x = normalizedX
		this.uniforms.mouse.value.y = normalizedY
	}
}
