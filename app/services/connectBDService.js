/**
 * Логика писалась, что есть только psql, если изменится, то заложен для этой цели тип (type),
 * в configs->configBack->config_bd.yml
 *
 * @params bd - указать имя БД, из config_bd, если хочешь, чтоб использовалось не дефолтное
 * @params options - смотри http://expressjs.com/ru/guide/database-integration.html#postgres
 * */
module.exports = function(bd, options) {
    
    var
        pgp = require('pg-promise')(options),
        yaml = require('js-yaml'),
        fs = require('fs'),
        configBd = yaml.safeLoad(fs.readFileSync(global.siteRootConfigsBack + 'config_bd.yml', 'utf8')),
        service = require(global.serviceContainer),
        instance = null,
        objectBd = null;
    
    this.set = function () {
        service.get('global.customException')(
            {
                'Ошибка чтения данных' : !configBd,
                'Ошибка config_bd.yml. Нет default_bd_name' : !(configBd['default_bd_name'])
            }
        );

        if (!bd) { // Если не указана явна БД, то дефолтный

            bd = configBd['list_bd'][configBd['default_bd_name']];

        } else {

            /*
             Смотрим, есть ли такая БД, в списке то оставляем название не существующий,
             чтоб вернуть ее в Exception-e
             */
            bd = (configBd['list_bd'][bd] ? configBd['list_bd'][bd] : bd);

        }

        service.get('global.customException')(
            [
                Object.prototype.toString.call(bd) !== '[object Object]',
                ( // Проверка, что все имена в конфиге есть и корректны
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

                objectBd = false;// Если будет, то дописать

                break;

            case 'postgres':

                objectBd = pgp(`${bd['type']}://${bd['user']}:${bd['pass']}@${bd['host']}:${bd['port']}/${bd['database']}`);

                break;

            default:
                objectBd = `Не известный тип ${bd['type']}`;

        }
    }();
    
    if (!instance) {
        
        instance = {
            
            get: function () {

                return objectBd;
                
            }
            
        }
        
    }
    
    return instance;

};