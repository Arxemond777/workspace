/*
 * Команды в консоли:
 *	--display-modules - показывает, какие файлы пошли в какую сборку
 *	--display-modules -v - показывает, почему файлы так собрались
 *	--json - выведет статистику о сборке + --profile выведет временную информацию + > ИМЯ_ФАЙЛА.json
 *		получается так --json --profile > log.json
 *		открываем файл на сайте webpack.github.io/analyse/
 */

// ОБъявляем webpack для плагина
var webpack = require('webpack');

// Модуль работы с дирректориями
var fs = require('fs');

// Автосборка объекта конфигов
// Принимает корневой путь
// На выходе получаем объект с подключенными конфигами
var getConfig = function(_rootPath) {

	var

		// Массив конфигов
		configList = [],

		// Путь до бандлов
		bundlePath = `${_rootPath}/src/bundles/`,

		// Переменная окружения
		ENV = process.env.NODE_ENV || 'dev';

	// Помещаем глобальный конфиг
	configList.push(require(`${_rootPath}/app/configs/webpack/index.js`)({
			_path: _rootPath,
			ENV: ENV
		}));

	// Считываем папку с бандлами
	fs.readdirSync(bundlePath).forEach(function(item) {

		var configPath = `${bundlePath}${item}/configs/webpack/index.js`;

		// Если это папка, то ищем конфиг
		if (fs.lstatSync(`${bundlePath}${item}`).isDirectory()) {

			// Если существует конфиг
			try {

				fs.lstatSync(configPath);

				configList.push(require(configPath)({
					_path: _rootPath,
					ENV: ENV
				}));

			} catch (err) {}

		}

	});

	// Для проверки конфига, пишем в файл
	//fs.writeFileSync(__dirname + '/config.js', JSON.stringify(configList, null, '\t'));

	return configList;

};

// Экспортируем Конфиг в webpack
module.exports = getConfig(__dirname);