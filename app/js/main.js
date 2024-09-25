const box = document.querySelector('.box2');
const btn = document.querySelector('.button');

import Swiper from "swiper"

import { Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation, Thumbs, Autoplay } from 'swiper/modules'

document.addEventListener('DOMContentLoaded', () => {

	const swiperTop = new Swiper('.surf', {
		modules: [Mousewheel, Autoplay],
		// autoplay: {
		// 	delay: 1000,
		// },
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		mousewheel: true,
		// direction: 'vertical',
		centeredSlides: true,
		loop: true,
		speed: 2000,
	})

})
