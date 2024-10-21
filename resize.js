// запускается командой node resize.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Папка с изображениями
const inputDir = 'app/images/src/mini/';
const outputDir = 'app/images/thumbs/';

// Создание папки для выходных изображений, если она не существует
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Чтение файлов из входной директории
fs.readdir(inputDir, (err, files) => {
    if (err) throw err;
    
    files.forEach(file => {
        // Путь к входному файлу
        const inputPath = path.join(inputDir, file);
        // Путь к выходному файлу
        const outputPath = path.join(outputDir, file);
        
        // Обработка изображения
        sharp(inputPath)
            .resize(170, 300, { fit: 'cover' })  // Обрезка
            .toFile(outputPath, (err, info) => {
                if (err) console.error(`Ошибка обработки ${file}:`, err);
                else console.log(`Обработано ${file}:`, info);
            });
    });
});