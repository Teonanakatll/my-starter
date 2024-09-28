const box = document.querySelector('.box2');
const btn = document.querySelector('.button');

import Swiper from "swiper"

import {animate} from "./gsap-test"

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

	animate();

})

// скрипт автоматически находит элементы начинающиеся с bg- и подставляет нужный формат изображения
// устанввливать фон нужно через id="bg_имяфото"
// Проверка поддержки AVIF
function supportsAvif() {
	return new Promise(resolve => {
		const avif = new Image();
		avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
		avif.onload = () => resolve(true);
		avif.onerror = () => resolve(false);
	});
}

// Проверка поддержки WebP
function supportsWebp() {
	return new Promise(resolve => {
		const webp = new Image();
		webp.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4ICIAAABQAQCdASoDAAIAAgA2JQBOgC6gAP73M8eLuxHGTv3eIAAA';
		webp.onload = () => resolve(true);
		webp.onerror = () => resolve(false);
	});
}

// Функция для динамической установки background-image
async function setBackgrounds() {
	// Получаем все элементы с id, начинающимся на 'bg-'
	const bgElements = document.querySelectorAll('[id^="bg_"]');

	let format = 'jpg'; // По умолчанию формат JPEG

	if (await supportsAvif()) {
		format = 'avif'; // Если поддерживается AVIF
	} else if (await supportsWebp()) {
		format = 'webp'; // Если поддерживается WebP
	}

	// Для каждого элемента установить background
	bgElements.forEach(element => {
		const id = element.id;
		const imageName = id.replace('bg_', ''); // Убираем 'bg-' из id для получения имени изображения
		element.style.backgroundImage = `url('images/${imageName}.${format}')`;
	});
}

window.onload = setBackgrounds;
