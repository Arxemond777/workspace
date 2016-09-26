//TODO вынести в глобальный конфиг
global.siteRoot = '/var/www/html/workspace/';
global.siteRootApp = global.siteRoot + 'app/';
global.siteRootServices = global.siteRootApp + 'services/';
global.siteRootConfigsBack = global.siteRootApp + 'configs/configBack/';
global.siteRootBundles = global.siteRoot + 'src/bundles/%1\$s';
global.siteRootBundlesRoutes = global.siteRoot + 'src/bundles/%1\$s/routes/%1\$s.js';
global._ = require('underscore');


var pathToGlobalFileRoutes = global.siteRootApp + '/routes/routes.js';//путь до глобальных файлов

/**
 * Node компоненты
 */
var
    express = require('express')
    ,customException = require(global.siteRootApp + 'services/customExceptionService.js')
    ,fs = require('fs')
    ,vhost = require('vhost')
    ,secretCookiePassword = require(global.siteRootConfigsBack + 'secretCookiePassword.js')
;

customException(!fs.existsSync(pathToGlobalFileRoutes), 'Файл для глобальных роутов не найден');

/**
 * Домены и поддомены
 */
var
    app = express(),
    api = express.Router();

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log(`Server runing in port ${app.get('port')}`));

// Прокидываем static
app.use(express.static(__dirname + '/web'));

//подписанная кука
app.use(require('cookie-parser')(secretCookiePassword.secretCookiePassword));

//парсер Post
app.use(require('body-parser').urlencoded({ extended: true }));

/**
 * Промежуточное ПО для проверки аунтетификации и ролей для поддомена api
 */

//поддомен api
app.use(vhost('api.*', api));

api.get('/', function (request, response) {
    response.json({1: global.siteRoot});
    //response.send(321);
});

// Routing
app.get('/*', (request, response) => {
    response.sendFile(global.siteRoot + '/web/public/html/index.html');
});


var
    routes = require(pathToGlobalFileRoutes)({app: app, api: api})
    ,serviceContainer = require(global.siteRootServices + 'serviceContainerService.js')
;
//console.log(routes([app, api]));
console.log(serviceContainer());

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