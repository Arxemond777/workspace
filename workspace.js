// TODO вынести в глобальный конфиг
global.siteRoot = '/var/www/html/workspace/';
global.siteRootApp = global.siteRoot + 'app/';
global.siteRootServices = global.siteRootApp + 'services/';
global.siteRootConfigsBack = global.siteRootApp + 'configs/configBack/';
global.siteRootBundles = global.siteRoot + 'src/bundles/%1\$s';
global.siteRootBundlesRoutes = global.siteRoot + 'src/bundles/%1\$s/routes/%1\$s.js';
global._ = require('underscore');
global.serviceContainer = global.siteRootServices + 'serviceContainerService.js',
global.VALID_EMAIL = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$');


global.siteRootModulesBack = global.siteRootApp + 'modules/back/';
global.siteRootModulesFront = global.siteRootApp + 'modules/front/';

global.referrer = null;

var
    pathToGlobalFileRoutes = global.siteRootApp + '/routes/routes.js',
    service = require(global.serviceContainer); // Путь до глобальных файлов

//console.log(service.get('global.connectBD')(/*'test'*/));
//console.log(service.get('global.mail')('1arxemond1@gmail.com', 'subject lalalala', '<div>123</div>'));
/**
 * Node компоненты
 */
var
    express = require('express'),
    customException = require(global.siteRootApp + 'services/customExceptionService.js'),
    fs = require('fs'),
    vhost = require('vhost'),
    secretCookiePassword = require(`${global.siteRootConfigsBack}secretCookiePassword.js`),
    htmlencode = require('htmlencode');

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

/** Авторизация */
var login = require(`${global.siteRootModulesBack}Login.js`);
//app.use(login.checkValidCookieAndSession);
//app.set('view', `${global.siteRoot}public/html/index.handlebars`);

/** Хенделбарс */
var handlebars = require('express-handlebars')
    .create(/*{ defaultLayout: 'main' }*/);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', `${global.siteRoot}web/public/html/`);

/** Парсер Post */
app.use(require('body-parser').urlencoded({ extended: true }));

/**  Промежуточное ПО для проверки аунтетификации и ролей для поддомена api */

/** Поддомен api */
app.use(vhost('api.*', api));

/** Routing */
app.get('/*', (request, response) => {

    //response.sendFile(global.siteRoot + '/web/public/html/index.html');
    var data = {};

    data.data = JSON.stringify({data: {2: {3: 5, 4: htmlencode.htmlEncode(global.referrer)}}});

    console.log(data);
    response.render('index', data);

});


api.get('/', (request, response) => {

    response.json({1: global.siteRoot});

});

var
    routes = require(pathToGlobalFileRoutes)({app: app, api: api});

api.use((request, response) => {

    response
        .status(404)
        .json({'status': 404});

});

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