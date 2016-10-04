var
    fs = require('fs'),
    yaml = require('js-yaml');

module.exports = function () {

    var serviceContainer = function() {

        var
            instance = null,
            registryService = {};


        this.set = function () {

            /**
             * читаем yml конфиг сервиса
             */
            var
                doc = yaml.safeLoad(fs.readFileSync(global.siteRootConfigsBack + 'services.yml', 'utf8')),
                services = doc.services;

            if (!doc) {

                throw new Error('Ошибка чтения данных');

            } else {

                for (let serviceName in services) {

                    if (typeof(serviceName) !== 'string') {

                        throw new Error('Имя сервиса должно быть строкой');

                    } else if (registryService.hasOwnProperty(serviceName)) {

                        throw new Error('Сервис с заданным именим уже зарезирвирован');

                    } else if (Object.prototype.toString.call(services[serviceName]) !== '[object Object]') {

                        throw new Error('Значение сервиса должно быть объектом');

                    } else {//если прошли все проверки то регистрируем наш сервис

                        if (!services[serviceName]['location']) {

                            throw new Error('Не верно сконфигурирован файл. Отстутствует обязательный параметр location');

                        } else if (!(services[serviceName]['location']).match(/.Service\.js$/)) {

                            console.log(services[serviceName]['location']);
                            throw new Error('Не верное имя файла сервиса. Должно быть так "/exampleService.js"');

                        } else if (!fs.existsSync(global.siteRoot + services[serviceName]['location'])) {

                            throw new Error('Не найден путь для сервиса ' + global.siteRoot + services[serviceName]['location']);

                        } else {

                            if (services[serviceName]['parametrs']) { //Если есть параметры
                                //console.log(`Для сервиса ${serviceName} необходимы следующие параметры (${services[serviceName]['parametrs']})`);
                                //registryService[serviceName] = require(global.siteRoot + services[serviceName]['location'])/*(services[serviceName]['parametrs'])*/;

                            }
                            
                            registryService[serviceName] = require(global.siteRoot + services[serviceName]['location']);
                        }
                    }
                }
            }

        }();

        if (!instance) {

            instance = {
                get: function (serviceName) {

                    if (!serviceName) {

                        throw new Error('Не корректное имя');

                    } else if (!registryService.hasOwnProperty(serviceName)) {

                        throw new Error('Запрошенный сервис не найден');

                    } else {

                        return registryService[serviceName];

                    }
                },
                list: function () {

                    return global._.keys(registryService);

                }
            };

        }

        return instance;


    };

    return new serviceContainer();

        //serviceContainer.get('global.customException')(1, 'a');
}();