// TODO вынести в глобальный конфиг
global.siteRoot = '/var/www/html/workspace/';
global.siteRootApp = global.siteRoot + 'app/';
global.siteRootServices = global.siteRootApp + 'services/';
global.siteRootConfigsBack = global.siteRootApp + 'configs/configBack/';
global.siteRootBundles = global.siteRoot + 'src/bundles/%1\$s';
global.siteRootBundlesRoutes = global.siteRoot + 'src/bundles/%1\$s/routes/%1\$s.js';
global._ = require('underscore');
global.serviceContainer = global.siteRootServices + 'serviceContainerService.js';

var
    pathToGlobalFileRoutes = global.siteRootApp + '/routes/routes.js',
    service = require(global.serviceContainer); // Путь до глобальных файлов

console.log(service.get('global.mail')());
/**
 * Node компоненты
 */
var
    express = require('express'),
    customException = require(global.siteRootApp + 'services/customExceptionService.js'),
    fs = require('fs'),
    vhost = require('vhost'),
    secretCookiePassword = require(global.siteRootConfigsBack + 'secretCookiePassword.js');

customException(!fs.existsSync(pathToGlobalFileRoutes), 'Файл для глобальных роутов не найден');

/**
 * Домены и поддомены
 */
var
    app = express(),
    api = express.Router();

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log(`Server runing in port ${app.get('port')}`));


app.use(express.static(__dirname + '/web')); // Прокидываем static

/** Подписанная кука */
app.use(require('cookie-parser')(secretCookiePassword.secretCookiePassword));

/** Парсер Post */
app.use(require('body-parser').urlencoded({ extended: true }));

/**  Промежуточное ПО для проверки аунтетификации и ролей для поддомена api */

/** Поддомен api */
app.use(vhost('api.*', api));

api.get('/', (request, response) => {

    response.json({1: global.siteRoot});

});

/** Routing */
app.get('/*', (request, response) => {

    response.sendFile(global.siteRoot + '/web/public/html/index.html');

});

var
    routes = require(pathToGlobalFileRoutes)({app: app, api: api});

app.use((request, response) => {

    response
        .status(404)
        .send('404');

});

app.use((error, req, response, next) => {

    console.error(error.stack);
    response
        .status(500)
        .send('500');

});