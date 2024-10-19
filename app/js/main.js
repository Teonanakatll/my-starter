const box = document.querySelector('.box2');
const btn = document.querySelector('.button');

import Swiper from "swiper"

import {animate} from "./gsap-test"
import { setBackgrounds } from "./set-background"

import { Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation, Thumbs, Autoplay } from 'swiper/modules'
import { jqueryTest } from "./jquery";

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
		mousewheel: {
			inverse: true,
		},
		// direction: 'vertical',
		centeredSlides: true,
		loop: true,
		speed: 2000,
	})

	animate();

	jqueryTest();

	// скрипт автоматически находит классы элементов начинающихся с  bg-- и подставляет нужный формат изображения
	// также необходимо прописать фоллбак на случай если у пользователя отключен js: style="background-image: url('images/header-bg.jpg');"
	setBackgrounds();

})

