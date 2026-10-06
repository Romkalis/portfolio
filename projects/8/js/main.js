import { initParticleSphere } from "./particle-sphere.js";
import { initOrbitSection } from "./orbit-sphere.js";
import { initCounters } from "./counters.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hero = document.getElementById("hero");
const heroCanvas = document.getElementById("hero-canvas");
const heroContent = hero.querySelector(".hero__content");
const heroLogo = hero.querySelector(".hero__logo");
const orbitSection = document.getElementById("orbit");

function getHeroScrollProgress() {
	const rect = hero.getBoundingClientRect();
	const scrollRange = hero.offsetHeight - window.innerHeight;
	if (scrollRange <= 0) return 0;
	const scrolled = -rect.top;
	return Math.min(1, Math.max(0, scrolled / scrollRange));
}

const particleSphere = initParticleSphere(heroCanvas, {
	reducedMotion,
	onScrollProgress(progress) {
		if (heroLogo) {
			const s = 0.85 + progress * 0.55;
			heroLogo.style.transform = `translate(-50%, -50%) scale(${s})`;
		}
		if (heroContent) {
			const fade = 1 - progress * 0.55;
			heroContent.style.opacity = String(fade);
			heroContent.classList.toggle("is-scrolling", progress > 0.05);
		}
	},
});

function onScroll() {
	particleSphere.setScrollProgress(getHeroScrollProgress());
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll, { passive: true });

const orbit = initOrbitSection(orbitSection);
const stopCounters = initCounters();

if (!reducedMotion && "IntersectionObserver" in window) {
	orbitSection.style.opacity = "0";
	orbitSection.style.transition = "opacity 1.2s ease";

	const io = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				orbitSection.style.opacity = "1";
				io.disconnect();
			}
		},
		{ threshold: 0.12 }
	);
	io.observe(orbitSection);
}

window.addEventListener("beforeunload", () => {
	particleSphere.destroy();
	orbit.destroy();
	stopCounters();
});
