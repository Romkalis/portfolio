const BADGES = [
	{ label: "CB", bg: "#0052ff", size: 52 },
	{ label: "BN", bg: "#f3ba2f", color: "#111", size: 44 },
	{ label: "KR", bg: "#5741d9", size: 40 },
	{ label: "GM", bg: "#00dcfa", color: "#111", size: 46 },
	{ label: "LG", bg: "#fff", color: "#111", size: 38 },
	{ label: "SF", bg: "#12ff80", color: "#111", size: 36 },
	{ label: "ET", bg: "#1a1a2e", size: 42 },
	{ label: "SK", bg: "#ff6b35", size: 40 },
	{ label: "LD", bg: "#00a3ff", size: 44 },
	{ label: "YR", bg: "#0657f9", size: 38 },
	{ label: "MP", bg: "#6b4ce6", size: 48 },
	{ label: "GT", bg: "#2d3748", size: 36 },
	{ label: "ON", bg: "#1c1c1c", size: 42 },
	{ label: "OK", bg: "#000", size: 40 },
	{ label: "TW", bg: "#48d1cc", color: "#111", size: 34 },
	{ label: "BP", bg: "#ff5c00", size: 38 },
	{ label: "LM", bg: "#ffe600", color: "#111", size: 36 },
	{ label: "DB", bg: "#7c3aed", size: 40 },
	{ label: "CF", bg: "#0ea5e9", size: 42 },
	{ label: "PD", bg: "#a855f7", size: 38 },
	{ label: "KL", bg: "#22c55e", color: "#111", size: 36 },
	{ label: "FC", bg: "#8b5cf6", size: 34 },
	{ label: "AN", bg: "#64748b", size: 32 },
	{ label: "SH", bg: "#ec4899", size: 40 },
	{ label: "WG", bg: "#14b8a6", size: 36 },
	{ label: "BT", bg: "#f97316", size: 44 },
	{ label: "HV", bg: "#6366f1", size: 38 },
	{ label: "SP", bg: "#fb923c", size: 42 },
];

function fibonacciOrbit(index, total, radiusX, radiusY) {
	const phi = Math.PI * (3 - Math.sqrt(5));
	const y = 1 - (index / (total - 1)) * 2;
	const r = Math.sqrt(1 - y * y);
	const theta = phi * index;
	return {
		x: Math.cos(theta) * r * radiusX,
		y: y * radiusY,
		depth: r,
	};
}

export function initOrbitSection(section) {
	const canvas = section.querySelector("#orbit-stars");
	const container = section.querySelector("#orbit-badges");
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const ctx = canvas.getContext("2d");
	let stars = [];
	let w = 0;
	let h = 0;
	const pointer = { x: 0, y: 0 };
	const smooth = { x: 0, y: 0 };

	function initStars() {
		stars = Array.from({ length: 380 }, () => ({
			x: Math.random(),
			y: Math.random(),
			z: Math.random(),
			r: Math.random() * 1.2 + 0.3,
			a: Math.random() * 0.5 + 0.2,
		}));
	}

	function resize() {
		w = section.clientWidth;
		h = section.clientHeight;
		canvas.width = w * devicePixelRatio;
		canvas.height = h * devicePixelRatio;
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;
		ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
	}

	const items = BADGES.map((badge, i) => {
		const el = document.createElement("div");
		el.className = "orbit-badge";
		el.textContent = badge.label;
		el.style.setProperty("--size", `${badge.size}px`);
		el.style.setProperty("--badge-bg", badge.bg);
		if (badge.color) el.style.color = badge.color;

		const orbit = fibonacciOrbit(i, BADGES.length, 0.42, 0.38);
		container.appendChild(el);

		return {
			el,
			baseX: orbit.x,
			baseY: orbit.y,
			depth: orbit.depth,
			phase: Math.random() * Math.PI * 2,
			drift: 0.003 + Math.random() * 0.004,
		};
	});

	resize();
	initStars();
	window.addEventListener("resize", resize);

	if (!reducedMotion) {
		section.addEventListener(
			"pointermove",
			(e) => {
				const rect = section.getBoundingClientRect();
				pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
				pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
			},
			{ passive: true }
		);
	}

	let raf = 0;
	const start = performance.now();

	function drawStars(t) {
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, w, h);

		for (const s of stars) {
			const px = (s.x + smooth.x * 0.02 * (1 - s.z)) * w;
			const py = (s.y + smooth.y * 0.02 * (1 - s.z)) * h;
			const twinkle = 0.5 + 0.5 * Math.sin(t * 0.002 + s.z * 10);
			ctx.beginPath();
			ctx.arc(px, py, s.r * (0.6 + s.z * 0.8), 0, Math.PI * 2);
			ctx.fillStyle = `rgba(255,255,255,${s.a * twinkle})`;
			ctx.fill();
		}
	}

	function animate(now) {
		raf = requestAnimationFrame(animate);
		const t = now - start;

		smooth.x += (pointer.x - smooth.x) * 0.06;
		smooth.y += (pointer.y - smooth.y) * 0.06;

		drawStars(t);

		const cx = w / 2;
		const cy = h / 2;
		const parallax = reducedMotion ? 0 : 1;

		for (const item of items) {
			const driftX = reducedMotion ? 0 : Math.sin(t * item.drift + item.phase) * 12;
			const driftY = reducedMotion ? 0 : Math.cos(t * item.drift * 0.9 + item.phase) * 10;
			const px = item.baseX * w * 0.9 + smooth.x * 28 * item.depth * parallax + driftX;
			const py = item.baseY * h * 0.85 + smooth.y * 22 * item.depth * parallax + driftY;
			const scale = 0.55 + item.depth * 0.55;
			const opacity = 0.35 + item.depth * 0.65;

			item.el.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${scale})`;
			item.el.style.opacity = String(opacity);
			item.el.style.zIndex = String(Math.round(item.depth * 100));
		}
	}

	animate(start);

	return {
		destroy() {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			items.forEach((i) => i.el.remove());
		},
	};
}
