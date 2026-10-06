import * as THREE from "three";

const SPHERE_RADIUS = 1.4;

const vertexShader = /* glsl */ `
attribute vec3 color;
attribute float aSize;
attribute float aPole;
attribute float aSpark;

varying vec3 vColor;
varying float vPole;
varying float vSpark;
varying float vDepth;

uniform float uPixelRatio;
uniform float uBaseSize;
uniform float uScroll;
uniform float uTime;

void main() {
  vColor = color;
  vPole = aPole;
  vSpark = aSpark;

  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vDepth = -mv.z;

  float depthFactor = 220.0 / max(vDepth, 0.6);
  float poleSize = 0.55 + vPole * 0.9;
  float spark = 0.92 + 0.08 * sin(uTime * 2.2 + vSpark * 40.0);

  gl_PointSize = uBaseSize * uPixelRatio * depthFactor * aSize * poleSize * spark * (0.9 + uScroll * 0.15);
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
varying vec3 vColor;
varying float vPole;
varying float vSpark;
varying float vDepth;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);

  // Жёсткое ядро точки + узкое свечение (не размытый шар)
  float core = 1.0 - smoothstep(0.0, 0.14, dist);
  float glow = exp(-dist * 14.0) * 0.35;
  float shape = core + glow;
  if (shape < 0.02) discard;

  vec3 col = vColor;
  float poleBoost = 0.35 + vPole * 1.35;
  col *= poleBoost;
  col += vec3(0.5, 0.75, 1.0) * vPole * 0.55;

  float alpha = shape * (0.12 + vPole * 0.38);
  alpha *= 0.7 + 0.3 * vSpark;

  gl_FragColor = vec4(col, alpha);
}
`;

/**
 * Fibonacci-сфера + полярные «кольца» (как на morpho: яркие полюса, тёмный пояс)
 */
function createSphereAttributes(targetCount, radius) {
	const positions = [];
	const colors = [];
	const sizes = [];
	const poles = [];
	const sparks = [];

	const golden = (1 + Math.sqrt(5)) / 2;
	const cyan = new THREE.Color(0x3eb8ff);
	const cyanBright = new THREE.Color(0xb8ecff);
	const cyanDim = new THREE.Color(0x1a4a8a);

	function pushPoint(x, y, z, opts = {}) {
		const {
			poleWeight = Math.pow(Math.abs(y), 0.5),
			sizeMul = 1,
			brightMul = 1,
		} = opts;

		const len = Math.sqrt(x * x + y * y + z * z) || 1;
		const nx = x / len;
		const ny = y / len;
		const nz = z / len;

		positions.push(nx * radius, ny * radius, nz * radius);

		const c = new THREE.Color();
		const pole = Math.pow(Math.abs(ny), 0.55);
		if (pole > 0.72) c.lerpColors(cyan, cyanBright, (pole - 0.72) / 0.28);
		else if (pole > 0.35) c.lerpColors(cyanDim, cyan, (pole - 0.35) / 0.37);
		else c.copy(cyanDim).multiplyScalar(0.35 + pole);

		const jitter = 0.65 + Math.random() * 0.7;
		c.multiplyScalar(brightMul * jitter);

		colors.push(c.r, c.g, c.b);
		sizes.push((0.1 + Math.random() * 0.1) * sizeMul);
		poles.push(poleWeight);
		sparks.push(Math.random());
	}

	// Основная оболочка — реже у экватора (тёмный пояс)
	let i = 0;
	while (positions.length / 3 < targetCount * 0.72) {
		const t = (i % targetCount) / targetCount;
		const y = 1 - t * 2;
		const absY = Math.abs(y);

		if (absY < 0.18 && Math.random() > 0.12) {
			i++;
			continue;
		}

		const ringR = Math.sqrt(Math.max(0, 1 - y * y));
		const theta = (2 * Math.PI * i) / golden;
		pushPoint(Math.cos(theta) * ringR, y, Math.sin(theta) * ringR, {
			poleWeight: Math.pow(absY, 0.48),
			brightMul: absY < 0.25 ? 0.4 : 1,
		});
		i++;
	}

	// Полярные кольца плотности (яркие «шапки»)
	const ringLatitudes = [0.82, 0.68, 0.52, -0.52, -0.68, -0.82];
	const perRing = Math.floor((targetCount * 0.28) / ringLatitudes.length);

	for (const lat of ringLatitudes) {
		const ringR = Math.sqrt(1 - lat * lat);
		for (let j = 0; j < perRing; j++) {
			const theta = (j / perRing) * Math.PI * 2 + Math.random() * 0.4;
			const wobble = (Math.random() - 0.5) * 0.04;
			pushPoint(
				Math.cos(theta) * ringR * (1 + wobble),
				lat + (Math.random() - 0.5) * 0.03,
				Math.sin(theta) * ringR * (1 + wobble),
				{
					poleWeight: 0.75 + Math.random() * 0.25,
					sizeMul: 0.9 + Math.random() * 0.35,
					brightMul: 1.1 + Math.random() * 0.4,
				}
			);
		}
	}

	const count = positions.length / 3;
	return {
		positions: new Float32Array(positions),
		colors: new Float32Array(colors),
		sizes: new Float32Array(sizes),
		poles: new Float32Array(poles),
		sparks: new Float32Array(sparks),
		count,
	};
}

function createStarfield(count, spread) {
	const positions = new Float32Array(count * 3);
	for (let i = 0; i < count; i++) {
		positions[i * 3] = (Math.random() - 0.5) * spread;
		positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
		positions[i * 3 + 2] = (Math.random() - 0.5) * spread - 6;
	}
	return positions;
}

function easeOutCubic(t) {
	return 1 - Math.pow(1 - t, 3);
}

export function initParticleSphere(canvas, { reducedMotion = false, onScrollProgress } = {}) {
	const renderer = new THREE.WebGLRenderer({
		canvas,
		alpha: true,
		antialias: true,
		powerPreference: "high-performance",
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setClearColor(0x000000, 0);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
	camera.position.set(0, 0.12, 4.8);

	const sphereGroup = new THREE.Group();
	sphereGroup.rotation.x = 0.32;
	scene.add(sphereGroup);

	const attrs = createSphereAttributes(6400, SPHERE_RADIUS);
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute("position", new THREE.BufferAttribute(attrs.positions, 3));
	geometry.setAttribute("color", new THREE.BufferAttribute(attrs.colors, 3));
	geometry.setAttribute("aSize", new THREE.BufferAttribute(attrs.sizes, 1));
	geometry.setAttribute("aPole", new THREE.BufferAttribute(attrs.poles, 1));
	geometry.setAttribute("aSpark", new THREE.BufferAttribute(attrs.sparks, 1));

	const uniforms = {
		uPixelRatio: { value: renderer.getPixelRatio() },
		uBaseSize: { value: 1.8 },
		uScroll: { value: 0 },
		uTime: { value: 0 },
	};

	const material = new THREE.ShaderMaterial({
		vertexShader,
		fragmentShader,
		uniforms,
		transparent: true,
		depthWrite: false,
		blending: THREE.AdditiveBlending,
	});

	const sphere = new THREE.Points(geometry, material);
	sphereGroup.add(sphere);

	const starGeo = new THREE.BufferGeometry();
	starGeo.setAttribute(
		"position",
		new THREE.BufferAttribute(createStarfield(600, 14), 3)
	);
	const stars = new THREE.Points(
		starGeo,
		new THREE.PointsMaterial({
			size: 0.008,
			color: 0xffffff,
			transparent: true,
			opacity: 0.2,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
		})
	);
	scene.add(stars);

	const pointer = { x: 0, y: 0 };
	const targetRot = { x: 0, y: 0 };
	let scrollTarget = 0;
	let scrollCurrent = 0;
	let width = 0;
	let height = 0;

	const scaleMin = 1;
	const scaleMax = 2.5;
	const cameraZMin = 4.8;
	const cameraZMax = 2.15;

	function resize() {
		const parent = canvas.parentElement;
		width = parent.clientWidth;
		height = parent.clientHeight;
		renderer.setSize(width, height, false);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		uniforms.uPixelRatio.value = renderer.getPixelRatio();
		uniforms.uBaseSize.value = width < 768 ? 2.1 : 1.75;
	}

	resize();
	window.addEventListener("resize", resize);

	if (!reducedMotion) {
		window.addEventListener(
			"pointermove",
			(e) => {
				const rect = canvas.getBoundingClientRect();
				pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
				pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
			},
			{ passive: true }
		);
	}

	let raf = 0;
	const clock = new THREE.Clock();

	function applyScroll(p) {
		const eased = easeOutCubic(p);
		const scale = scaleMin + (scaleMax - scaleMin) * eased;
		sphereGroup.scale.setScalar(scale);
		camera.position.z = cameraZMin + (cameraZMax - cameraZMin) * eased;
		camera.position.y = 0.12 + eased * 0.08;
		uniforms.uScroll.value = eased;
		onScrollProgress?.(eased);
	}

	function animate() {
		raf = requestAnimationFrame(animate);
		const t = clock.getElapsedTime();
		uniforms.uTime.value = t;

		scrollCurrent += (scrollTarget - scrollCurrent) * 0.08;
		applyScroll(scrollCurrent);

		if (!reducedMotion) {
			targetRot.y += (pointer.x * 0.28 - targetRot.y) * 0.04;
			targetRot.x += (-pointer.y * 0.15 - targetRot.x) * 0.04;
			sphereGroup.rotation.y = t * 0.1 + targetRot.y;
			sphereGroup.rotation.x = 0.32 + targetRot.x * 0.35;
			stars.rotation.y = t * 0.015;
		}

		renderer.render(scene, camera);
	}

	animate();

	return {
		setScrollProgress(p) {
			scrollTarget = Math.min(1, Math.max(0, p));
		},
		destroy() {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			geometry.dispose();
			material.dispose();
			starGeo.dispose();
			renderer.dispose();
		},
	};
}
