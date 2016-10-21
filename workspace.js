// TODO вынести в глобальный конфиг
global.siteRoot = '/var/www/html/workspace/';
global.siteRootApp = global.siteRoot + 'app/';
global.siteRootMainController = global.siteRootApp + 'controllers/mainController.js';
global.siteRootMainModel = global.siteRootApp + 'models/mainModel.js';
global.siteRootRoute = global.siteRootApp + 'routes/';
global.siteRootServices = global.siteRootApp + 'services/';
global.siteRootConfigsBack = global.siteRootApp + 'configs/configBack/';
global.siteRootBundles = global.siteRoot + 'src/bundles/%1\$s';
global.siteRootBundlesRoutes = global.siteRoot + 'src/bundles/%1\$s/routes/%1\$s.js';
global._ = require('underscore');
global.serviceContainer = global.siteRootServices + 'serviceContainerService.js',
global.VALID_EMAIL = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$');


global.siteRootModulesBack = global.siteRootApp + 'modules/back/';
global.siteRootModulesFront = global.siteRootApp + 'modules/front/';

//global.referrer = [];//TODO

global.urlBack = {
    protocol: '//',
    host: 'localhost',
    pathAuth: 'login',
    apiHost: function () {return `api.${this.host}`},
    portNumber: 3000,
    port: function() {return `:${this.portNumber}`},
    slash: `/`,
    fullAddress: function() {return `${this.protocol}${this.host}${this.port()}${this.slash}`},
    fullAddressApi: function() {return `${this.protocol}${this.apiHost()}${this.port()}${this.slash}${this.pathAuth}`}
};

var //https = require('https'),//249 страница
    pathToGlobalFileRoutes = global.siteRootApp + '/routes/routes.js',
    service = require(global.serviceContainer),
    secretCookiePassword = require(`${global.siteRootConfigsBack}secretCookiePassword.js`),
    /** Node компоненты */
    express = require('express'),
    fs = require('fs'),
    vhost = require('vhost'),
    htmlencode = require('htmlencode'),
    /** Домены и поддомены */
    app = express(),
    api = express.Router(),
    session = service.get('global.sessionService');
    /*session = require('express-session'),
    pg = require('pg'),
    pgPromiseSession = require('connect-pg-simple')(session)*/

//console.log(session());
//console.log(service.get('global.connectBD')(/*'test'*/));
//console.log(service.get('global.mail')('1arxemond1@gmail.com', 'subject lalalala', '<div>123</div>'));

service.get('global.customException')(!fs.existsSync(pathToGlobalFileRoutes), 'Файл для глобальных роутов не найден');

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log(`Server runing in port ${app.get('port')}`));

api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/** Подписанная кука */
app.use(require('cookie-parser')(secretCookiePassword.secretCookiePassword));

//app.use(session());
var
    session = require('express-session'),
    redisStore = require('connect-redis')(session);

app.use(session({
    store: new redisStore(),
    secret: secretCookiePassword.secretCookiePassword,
    resave: false,
    saveUninitialized: false,
    //key: 'session',
    cookie: { maxAge: ((((60 * 1000) * 60) * 24) * 30)  }
}));

/** Парсер Post */
app.use(require('body-parser').urlencoded({ extended: true }));

/** csurf */
/*app.use(require('csurf')());//TODO 252 страница
app.use((request, response, next) => {
    response.locals._csrfToken = request.csrfToken();
    next();
});*/

app.use(express.static(__dirname + '/web')); // Прокидываем static

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

/**  Промежуточное ПО для проверки аунтетификации и ролей для поддомена api */

/** Поддомен api */
app.use(vhost('api.*', api));

var redis = require("redis"),
    client = redis.createClient();
/** Routing */
app.route(`/*`)
    .get((request, response) => {
        var data = {};

        //request.session.message1 = 'User hash1';

        console.log(`Request.id ${request.session.id}`,
            client.get(`sess:${request.session.id}`, function(err, reply){
                //console.log(`Reply ${reply}`);
            })
        );


        data.data = JSON.stringify({data: {2: {3: 5/*, 4: htmlencode.htmlEncode(global.referrer)*/}}});

        response.render('index', data);
    });


api.get('/', (request, response) => {

    response.json({1: global.siteRoot});

});

var routes = require(pathToGlobalFileRoutes)({app: app, api: api}); // Важно место

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