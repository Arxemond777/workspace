/**
 * Логика писалась, что есть только psql, если изменится, то заложен для этой цели тип (type),
 * в configs->configBack->config_bd.yml
 *
 * @params bd - указать имя БД, из config_bd, если хочешь, чтоб использовалось не дефолтное
 * @params options - смотри http://expressjs.com/ru/guide/database-integration.html#postgres
 * */
module.exports = (bd, options) => {

    var
        pgp = require('pg-promise')(options),
        yaml = require('js-yaml'),
        fs = require('fs'),
        configBd = yaml.safeLoad(fs.readFileSync(global.siteRootConfigsBack + 'config_bd.yml', 'utf8')),
        service = require(global.serviceContainer);

    service.get('global.customException')(
        {
            'Ошибка чтения данных' : !configBd,
            'Ошибка config_bd.yml. Нет default_bd_name' : !(configBd['default_bd_name'])
        }
    );
    
    if (!bd) { // Если не указана явна БД, то дефолтный

        bd = configBd['list_bd'][configBd['default_bd_name']];
        //console.log(configBd['list_bd'][configBd['default_bd_name']]);
        
        //var db = pgp("postgres://username:password@host:port/database");
    } else {
        bd = (configBd['list_bd'][bd] ? configBd['list_bd'][bd] : bd);
    }

    //console.log(Object.prototype.toString.call(bd) !== '[object Object]');
    //console.log(typeof bd);
    //service.get('global.customException')(, `Нет указанной БД ${bd}`); // Проверка, что есть БД с таким именим в кофигах

    service.get('global.customException')(
        [
            Object.prototype.toString.call(bd) !== '[object Object]',
            (// Проверка, что все имена в конфиге есть и корректны
                !bd['host']
                || !bd['port']
                || !bd['user']
                || !bd['pass']
                || !bd['database']
                || !bd['type']
            ),
            bd['type'] !== 'postgres', // Заглушка, ибо пока тока мона Postgres
        ],
        [
            `Нет указанной БД ${bd}`,
            'Нет или не верные имена в конфиге: host, port, user, pass, database, type',
            'Дружище, тут пока мона тока Postgres юзать, если нужна другая БД, то те допиливать'
        ]
    );

    switch (bd['type']) {
        case 'mysql':
            return false;// Если будет, то дописать
        break;
        case 'postgres':
            return pgp(`${bd['type']}://${bd['user']}:${bd['pass']}@${bd['host']}:${bd['port']}/${bd['database']}`);
        break;
        default:
            return console.error(`Не известный тип ${bd['type']}`);
    }

};