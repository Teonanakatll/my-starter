import gsap from "gsap"

export function animate() {
	gsap.from('.test-img', {opacity: 0, x: -50, duration: .5, delay: 1})
	// gsap.from('.test-bg', {opacity: 0, scale: 3, duration: .5, delay: 2.5})

	const tl = gsap.timeline({defaults: { duration: .5}})
}