export function setBackgrounds() {
	// скрипт автоматически находит классы элементов начинающихся с  bg-- и подставляет нужный формат изображения
	// также необходимо прописать фоллбак на случай если у пользователя отключен js: style="background-image: url('images/header-bg.jpg');"
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

	// Функция проверки доступности изображения
	function checkImage(url) {
		return new Promise(resolve => {
			const img = new Image();
			img.src = url;
			img.onload = () => resolve(true);
			img.onerror = () => resolve(false);
		});
	}

	// Функция для ленивой загрузки картинок
	function lazyLoadImages() {
	const lazyImages = document.querySelectorAll("img[loading='lazy']");

	if ("IntersectionObserver" in window) {
			let observer = new IntersectionObserver((entries, observer) => {
					entries.forEach(entry => {
							if (entry.isIntersecting) {
									let img = entry.target;
									img.src = img.dataset.src || img.src; // Загрузка ленивого изображения
									img.removeAttribute("loading");
									observer.unobserve(img);
							}
					});
			});

			lazyImages.forEach(image => {
					observer.observe(image);
			});
		}
	}

	// Функция для динамической установки background-image
	async function setBackgrounds() {
		const bgElements = document.querySelectorAll('[class^="bg--"]');

		// Проверяем поддержку форматов
		const supportsAvifFormat = await supportsAvif();
		const supportsWebpFormat = await supportsWebp();
		
		// // Симулируем отсутствие поддержки AVIF и WebP для теста
		// const supportsAvifFormat = false;
		// const supportsWebpFormat = false;

		const imageObserver = new IntersectionObserver((entries, observer) => {
			// Для каждого элемента проверяем и устанавливаем нужный формат
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					const element = entry.target;
					const classList = Array.from(element.classList);
					const bgClass = classList.find(cls => cls.startsWith('bg--'));

					if (bgClass) {
						const imageName = bgClass.replace('bg--', ''); // Убираем 'bg--'

						let format;
						if (supportsAvifFormat) {
							format = 'avif';
						} else if (supportsWebpFormat) {
							format = 'webp';
						} else {
							const jpgExists = await checkImage(`images/${imageName}.jpg`);
							const jpegExists = await checkImage(`images/${imageName}.jpeg`);
							const pngExists = await checkImage(`images/${imageName}.png`);
							format = jpgExists ? 'jpg' : jpegExists ? 'jpeg' : pngExists ? 'png' : null;
						}

						// Если формат определен, установить новый background-image
						if (format) {
							element.style.backgroundImage = `url('images/${imageName}.${format}')`;
							// console.log(element.style.backgroundImage)
						} else {
							console.error(`Нет доступного изображения для ${imageName}`);
						}
					}
					observer.unobserve(element);
				}
			});
		});
		bgElements.forEach(element => {
			imageObserver.observe(element);
		});
	}

	setBackgrounds();
}