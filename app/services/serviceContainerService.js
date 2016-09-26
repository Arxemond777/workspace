var fs = require('fs');

module.exports = function () {
    var allGlobalService = fs.readdirSync(global.siteRootServices);

    serviceContainer = {};

    allGlobalService.forEach(function(val){
        //glob
        //смотрим, что строка и соответствует someNameService.js и не текущий файл (serviceContainerService.js)
        if (typeof val == 'string' && val.match(/[a-zA-z0-9]Service\.js/) && (/serviceContainerService\.js/).exec(__filename)[0] != val) {
            //if (__filename == global.siteRootServices + val) continue;
            serviceContainer['global.' + ((/^.*(?=Service)/).exec(val))[0]] = require(global.siteRootServices + val);
            //console.log(serviceContainer);
        }
        console.log(serviceContainer);
    });
};