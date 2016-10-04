module.exports = function(applicationInit, routeBundle) {
    
    var customException = require(global.siteRootApp + 'services/customExceptionService.js');

    customException(!applicationInit.api, 'Пробросьте поддомен api');

    api = applicationInit.api;

    api.get(`/${routeBundle}/`, (request, response) => {
        response.json({1: 123});
    });
    
};