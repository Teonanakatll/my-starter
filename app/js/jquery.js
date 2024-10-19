export function jqueryTest() {
	$('button.sam').on('click', function() {
		// console.log($(this))
		$('.samuray').css({
			'border': '5px #ff0099 solid',
			'box-shadow': '0 0 35px #ff0099'
			});
	})

	$('.wrapp').css({
		'border': '5px #ff0099 solid',
		'box-shadow': '0 0 35px #ff0099'
		});
	$('.menu li').css('border', '5px #ff0099 solid')
	$('.menu > li').css('border', '5px #ff0099 solid') // только дочерние
	$('h1 + p').css('border', '5px #ff0099 solid') // следующий соседний элемент
	$('h1 ~ p').css('font-size', '25px') // выбор всех следующих соседних элементов

	// <a href="https://ya.ru" hreflang="de-AT" target="_blank" title="Переход на Яндекс">Yandex</a>

	$('a[target]') // выбирает элементы по имени атрибута
	$('a[target="_blank"]') // выбирает элементы по значению атрибута
	// ^ - циркумфлекс, выбирает элементы если значение атрибута начинается с указанной подстроки
	$('a[href^="https"]')
	// $ - выбирает элементы если значение атрибута  заканчивается указанной подстрокой
	$('a[href$=".ru"]')
	// ~ - выбирает элементы если значение атрибута содержит указанное слово, а само значение состоит из нескольких слов
	$('a[title~="Яндекс"]')
	// * - выбирает элементы если значение атрибута содержит указанную подстроку
	$('a[title*="ере"]')
	// ! - выбирает элементы если у них нет указанного атрибута или значение атрибута не совпадает
	$('a[href!="https://google.com"]')
	// | - выбирает элементы если значение атрибута содержит указанное слово или после этого слова идёт символ дефиса
	$('a[hreflang|="de"]')

	//                                   фильтры

	// выбираем первый и последний элемент списка, отсчёт начинается с нуля
	$('li:first, li:last').css('color', 'green')
	// выбираем чётные и нечётные элементы, отсчёт начинается с нуля поэтому визуально будет наоборот
	$('li:even').css('color', '#ff0099')
	$('li:odd').css('color', '#88FF00FF')
	// все кроме li с классом .dot
	$('li:not(.dot)').css('color', '#BEFD01FF')
	// все теги ли содержащие span
	$('li:has(span)').css('color', '#ff0088')
	// проверка есть ли текст внутри обьекта селектора
	$('p:contains(страны)').css('color', '#00CEFCFF')
	// выбрать скрытые\видимые элементы
	$('div:hidden');
	$('div:visible')

	// $(function() {
	// })

	// 																				функции text() hide() show() - вторым аргументом можно передать функцию

	// let tagP = $('h1 + p').text('Акуна Матата батата!!!').css('color', '#00AAFFFF').hide(5000);
	// $('h1 + p').show(5000)
	// alert(tagP);

	//                                        цепные функции

	// $('h1 + p').hide(5000).show(5000)
	let tagP = $('h1 + p');
	// tagP.hide(3000).show(3000).text('Акуна Матата!!!').hide(3000)

	$('p').hide(2000).show(1000);

	//                                        функции width() height()

	// let w = $('.coral img').width('300px');
	// alert(`width ${w}px`)
	// let h = $('.coral img').height('600px');
	// alert(`height ${h}px`)

	function widthAndHeight(element) {
		let className = '.' + element;
		let w = $(className).width();
		let h = $(className).height();
		$('.article > h1').text(`width ${w}px, height ${h}px`);
		// console.log(`width ${w}px, height ${h}px`);
	}
	widthAndHeight('samuray')

	//																							 функция html()

	// alert($('.article-2').html('<h1>Fuuuckkkkk!!!!</h1>'));
	$('.article-2').html('<h1>Fuuuckkkkk!!!!</h1>');

	//                                               функции fadeIn() fadeOut() - вторым аргументом можно передать функцию

	// $('.coral img').fadeOut(2000).fadeIn(3000);

	function elementOut(element, time) {
		if (time>5000||time<1000||isNaN(time)) {
			// console.log('false')
			return false;
		} else {
			let className = `.${element}`;
			$(className).fadeOut(time).fadeIn(time);
		}
	}
	// elementOut('samuray img', 4000)

	//                                                  функция fadeTo(3000, .1) - сожет принимать функцию
	$('.samuray img').fadeTo(2000, .01).fadeTo(1000, 1)

	//                                                         slideUp() slideDown()

	$('.coral').slideUp(1000).slideDown(1000)

	//                                                         attr() removeAttr()

	let src = $('.coral').attr('hren', 'aga')
	// console.log(src)
	function changeAttr(element, newAttr, newValue) {
		let className = $(`.${element}`);
		className.attr(newAttr, newValue);
	}
	changeAttr('samuray', 'title', 'Hatiko')

	//                                                         addClass() removeClass() toggleClass()

	$('.cor').on('click', function() {
		$('.coral').toggleClass('border')
	})

	//                                                         animate() - третьим аргументом можно передать функцию

	$('.sam').animate({    // анимирует только числовые значения
		'height': '50px',
		'font-weight': '800'
		}, 3000, function() {
			// alert('Усё ок!')
		});

	//                                                          before() after() append() prepend()

	$('.wrapp').before(`<span>Neon Samuray</span>
		<p>Aga</p>`)
	$('.wrapp').after('<span>Neon Samuray</span>')
	$('.wrapp').append('<span>Neon Samuray</span>')
	$('.wrapp').prepend('<span>Neon Samuray</span>')
	$('span').css({
		'font-weight': '800',
		'font-size': '30px',
		'color': '#ff0099'
	})

	//                                                 each() $(this)

	$('.img').each(function() {
		if ($(this).attr('title')=='Hatiko') {
			$(this).css('box-shadow', '0 0 50px #ff0099')
		} else {
			$(this).css('box-shadow', '0 0 50px #FF0000FF')
		}
	})

	//                                                 length

	$('.article p').length

	//                                                 clone() remove()

	let coral = $('.coral').clone();
	// let coral = $('.coral').remove();  // после удаления обьект останется в переменной
	$('.wrapp').after(coral)
	$('body').append(coral)

	//                                                  события браузера
	// mousemove mouseup

	$('.img').on('mouseover', function() {
		// console.log('ok')
		$(this).css('box-shadow', '0 0 35px #2FFF00FF')
	}).on('mouseleave', function() {
		$(this).css('box-shadow', '0 0 35px #AAFF00FF')
	}).on('click', function() {
		$(this).css('box-shadow', '0 0 35px #00EEFFFF')
	})

	$('li').hover(function() {  // старый вариант
		// console.log('of')
		$(this).css('box-shadow', '0 0 35px #2FFF00FF')
	}, function() {
		$(this).css('box-shadow', '0 0 35px #AAFF00FF')
	})

	//                                       события eventObject

	$('body').on('click', function(e) {
		// console.log(`x: ${e.screenX}, y: ${e.screenY}, ${e}`)  // screen от края монитора
		// console.log(`x: ${e.pageX}, y: ${e.pageY}, ${e.target}`)  // page от края браузера
	})

	$('.okt').on('click', function(e) {
		let answer = confirm('Oктану нужна крассная тень?')
		if (!answer) {
			e.preventDefault();
		} else {
			$('.oktan.img').css({
				'border': '5px #ff0099 solid',
				'box-shadow': '0 0 35px #ff0099'
			})
		}
	})

	//                                            галерея

	let gallery = $('.gallery').hide();
	let btn = $('.button');
	let btnValue = btn.html();
	let small = $('.small a').css('opacity', .3);
	$('.small a:first').addClass('active');

	btn.on('click', function() {
		if (btnValue == '-') {
			btnValue = '+';
		} else {
			btnValue = '-';
		}
		gallery.slideToggle(1000);
		btn.html(btnValue);
	})

	$('.small a').on('mouseover', function() {
		$(this).css({
			'box-shadow': '0 0 25px #40FF00FF',
			'opacity': .7
		})
	}).on('mouseleave', function() {
		$(this).css({
			'box-shadow': '0 0 15px #ffffff',
			'opacity': .3
		})
	}).on('click', function(e) {
		e.preventDefault();
		small.removeClass('active');
		let ths = $(this);
		ths.toggleClass('active');
		let newImg = ths.attr('href');
		let bigImg = $('.big > img');

		if (bigImg.attr('src') !== newImg) {
			// console.log(newImg, bigImg.attr('src'))
			bigImg.animate({'opacity': 0}, 500, function() {
				bigImg.attr('src', newImg).animate({'opacity': 1}, 1000)
			});
		}
	})
}