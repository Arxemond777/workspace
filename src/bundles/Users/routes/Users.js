module.exports = function(applicationInit, routeBundle) {
    
    var service = require(global.serviceContainer);

    service.get('global.customException')(!applicationInit.api, 'Пробросьте поддомен api');

    api = applicationInit.api;

    api.get(`/${routeBundle}/`, (request, response) => {
        response.json({1: 123});
    });
    
};