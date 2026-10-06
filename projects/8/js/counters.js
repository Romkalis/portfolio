function easeOutExpo(t) {
	return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatUsd(value) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);
}

export function initCounters(root = document) {
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const elements = root.querySelectorAll("[data-counter]");

	const run = (el) => {
		const target = Number(el.dataset.target) || 0;
		const prefix = el.dataset.prefix || "";
		const duration = reducedMotion ? 0 : 2200;
		const start = performance.now();

		if (duration === 0) {
			el.textContent = formatUsd(target);
			return;
		}

		function tick(now) {
			const p = Math.min(1, (now - start) / duration);
			const value = Math.round(target * easeOutExpo(p));
			el.textContent = formatUsd(value);
			if (p < 1) requestAnimationFrame(tick);
		}

		requestAnimationFrame(tick);
	};

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				run(entry.target);
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.3 }
	);

	elements.forEach((el) => observer.observe(el));

	return () => observer.disconnect();
}
