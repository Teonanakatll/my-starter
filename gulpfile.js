const browserSync = require('browser-sync').create();
const {src, dest, watch, parallel, series} = require('gulp');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const clean = require('gulp-clean');

const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const svgSprite = require('gulp-svg-sprite');

// вместо gulp-autoprefixer
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const include = require('gulp-include');

function pages() {
	return src('app/pages/*.html')
		.pipe(include({
			includePaths: 'app/parts'
		}))
		.pipe(dest('app'))
		.pipe(browserSync.stream())
}

// вызывается отдельной командой
function fonts() {
	return src('app/fonts/src/*.*')
		.pipe(fonter({
			formats: ['woff', 'ttf']
		}))
		.pipe(src('app/fonts/*.ttf'))
		.pipe(ttf2woff2())
		.pipe(dest('app/fonts'))
}

function images() {
	return src(['app/images/src/*.*', '!app/images/src/*.svg'])
		.pipe(newer('app/images'))  // проверяет есть ли данные картинки в dist
		.pipe(avif({ quality : 70 }))

		.pipe(src('app/images/src/*.*'))
		.pipe(newer('app/images'))  // проверяет есть ли данные картинки в dist
		.pipe(webp())

		.pipe(src('app/images/src/*.*'))
		.pipe(newer('app/images'))  // проверяет есть ли данные картинки в dist
		.pipe(imagemin())

		.pipe(dest('app/images'))
}

// вызывается отдельной командой
function sprite() {
	return src('app/images/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg',
					example: true
				}
			}
		}))
		.pipe(dest('app/images'))
}

function scripts() {
	return src([
		// 'node_modules/swiper/swiper-bundle.js',
		'app/js/main.js',

		// 'app/js/*.js',  // все файлы js в папке js
		// 'app/libs/**/*.js',  // все js во всех папках в папке libs
		'!app/js/main.min.js'  // исключая файл
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

// файлы стилей дополнительных библиотек подключаем через @import в файле style.scss
function styles() {
	return src('app/sass/main.sass')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(postcss([
      autoprefixer({
        overrideBrowserslist: ['last 10 versions'] // Настраиваем поддержку последних 10 версий браузеров
      })
    ]))
		.pipe(concat('style.min.css'))
		
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

// наблюдение за изменением файлов
function watching() {
	// итициализируем browsersync
	browserSync.init({
		server: {
			baseDir: "app/"
		}
	});
	watch(['app/sass/**/*.sass'], styles)
	watch(['app/images/src'], images)
	watch(['app/js/main.js'], scripts)
	watch(['app/parts/*', 'app/pages/*'], pages)
	watch(['app/*.html']).on('change', browserSync.reload)
}

// function browsersync() {
// 	browserSync.init({
// 		server: {
// 			baseDir: "app/"
// 		}
// 	});
// }

// очищает папку dist, вызывается автоматически перед building
function cleanDist() {
	return src('dist')
		.pipe(clean())
}

// вызывается отдельной командой
function building() {
	return src([
		'app/css/style.min.css',
		'app/images/*.*',
		'!app/images/*.svg',
		'!app/images/stack/sprite.stack.html',
		'app/images/sprite.svg',
		'app/fonts/*.*',
		'app/js/main.min.js',
		'app/*.html'
	], {base : 'app'})       //  сохраняет структуру папок
		.pipe(dest('dist'))    //  копирует всё в папку dist
}


exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.pages = pages;
exports.building = building;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;

// последовательная серия, сначало удаление потом очистка
exports.build = series(cleanDist, building);
// СНАЧАЛО STYLES !!!  данные таски включаются автоматически при запуске галпа
exports.default = series(styles, parallel(images, scripts, pages, watching))  // паралельное выполнение тасков