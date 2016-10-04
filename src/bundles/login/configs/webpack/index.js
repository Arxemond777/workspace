// ОБъявляем webpack для плагина
var webpack = require('webpack');

// Экспортируем настройки
module.exports = function(param) {

	return {

		entry: {
			auth: ['babel-polyfill', `${param._path}/src/bundles/login/resource/scripts/index`],
		},

		output: {
			path: `${param._path}/src/bundles/login/public/scripts`,
			filename: '[name].js'
		},

		plugins: [

			new webpack.NoErrorsPlugin(),

			new webpack.DefinePlugin({
				ENV: JSON.stringify(param.ENV)
			})
		],

		module: {

			loaders: [

				{
					test: [/\.js$/, /\.es6$/],
					exclude: /node_modules/,
			        loader: 'babel-loader',
				}

			]

		}
	};

};