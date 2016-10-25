/**
 *
 * @param {string} [nameBd] - Имя БД
 * @param {string} [nameSessionTable = session] - Имя таблицы для сохранения данных
 * @returns {*}
 */
module.exports = function(nameBd, nameSessionTable = 'session') {
    
    /*var
        session = require('express-session'),
        pg = require('pg'),
        pgPromiseSession = require('connect-pg-simple')(session),
        yaml = require('js-yaml'),
        fs = require('fs'),
        service = require(global.serviceContainer),
        secretCookiePassword = require(`${global.siteRootConfigsBack}secretCookiePassword.js`),
        configBd = yaml.safeLoad(fs.readFileSync(global.siteRootConfigsBack + 'config_bd.yml', 'utf8')),
        exception = service.get('global.customException');
    
    exception(!configBd, `Ошибка чтения данных из ${global.siteRootConfigsBack}config_bd.yml`);
    
    
    if (!nameBd) {

        nameBd = configBd['list_bd'][configBd['default_bd_name']];
        exception(!nameBd, `Не правильно сконфигурирован файд ${global.siteRootConfigsBack}config_bd.yml, отстутствуе default_bd_name`);
        
    } else {

        nameBd = (configBd['list_bd'][nameBd] ? configBd['list_bd'][nameBd] : nameBd);
        
    }

    exception(
        [
            Object.prototype.toString.call(nameBd) !== '[object Object]',
            ( // Проверка, что все имена в конфиге есть и корректны
                !nameBd['host']
                || !nameBd['port']
                || !nameBd['user']
                || !nameBd['pass']
                || !nameBd['database']
            )
        ],
        [
            `Нет указанной БД ${nameBd}`,
            'Нет или не верные имена в конфиге: host, port, user, pass, database'
        ]
    );

    var config = {
        user: nameBd['user'],
        database: nameBd['database'], 
        password: nameBd['pass'],
        port: nameBd['port'],
        max: 10000,
        idleTimeoutMillis: 30000
    };
    
    return session({
        resave: false,
        store: new pgPromiseSession({
            pg : pg,
            conString : config,
            tableName : nameSessionTable
        }),
        saveUninitialized: false,
        key: 'session',
        secret: secretCookiePassword.secretCookiePassword,
        cookie: { maxAge: ((((60 * 1000) * 60) * 24) * 30)  }
    });*/

};