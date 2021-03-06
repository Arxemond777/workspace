module.exports = function(applicationInit) {
    
    var pathBundle = [ //Название бандла должно совпадать с названием роута в нем. Example /workspace/src/someBundle/routes/someBundle.js
            'Users',
            'Auth',
            'Login'
        ],
        configData = configData || {},
        fs = require('fs'),
        customException = require(global.siteRootApp + 'services/customExceptionService.js'),
        sprintf = require("sprintf-js").sprintf,
        service = require(global.serviceContainer);

    pathBundle.forEach(function (val) {
        var
            pathForRequireBundle = sprintf(global.siteRootBundles, val),//путь до бандла
            pathForRequireBundleRoutes = sprintf(global.siteRootBundlesRoutes, val);//путь до роута

        service.get('global.customException')(
            [
                !fs.lstatSync(pathForRequireBundle).isDirectory(),//проверка наличия бандла. Проерка на то, что это директория
                !fs.existsSync(pathForRequireBundleRoutes)//проверка наличия роута
            ],
            [
                'Не найден бандл по следующему пути ' + pathForRequireBundle,
                'Не найден файл для роута ' + pathForRequireBundleRoutes + ' в бандле ' + val
            ]
        );

        /**
         * проверку, что нет такого свойства уже
         */

        service.get('global.customException')(configData.hasOwnProperty(val), 'Роут уже присутствует');
        configData[val] = require(pathForRequireBundleRoutes)(applicationInit, val);
    });
    
};
