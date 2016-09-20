/*
 * Детали сборки для Development версии
 *
 */

// Экспортируем настройки
module.exports = function(param) {

	return {

		// Объявляем свойство контекста,
		// чтобы сократить длину пути для модуля в entry
		// ВЫКЛЮЧИЛ ПОКА НЕ ЗНАЮ ЧТО ДЕЛАТЬ context: `${param._path}/${param.ENV}`,

		output: {
			path: `${param._path}/web/public/scripts`,
		},

		// Включаем режим отладки у лоадеров (loaders)
		debug: true,

		// Включаю вотчер файлов watch: true
		watch: true,

		// Настройки вотчера файлов
		watchOptions: {

			// Задержка перед тем, как пересобрать файлы
			// По-умолчанию 300ms
			aggregateTimeout: 100
		},

		// Инструменты разработчика
		// source-maps типа eval, это самые быстрые
		devtool: 'eval',

		// Добавляем плагин линтера
		module:  {
			preLoaders: [

				// es-lint конфигурация в файле .eslintrc
				{
					test: /\.js$/,
			        exclude: /node_modules/,
			        loader: 'eslint-loader'
			    }
			]
		}

	};

};