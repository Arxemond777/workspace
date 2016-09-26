module.exports = function(applicationInit) {
    var customException = require(global.siteRootApp + 'services/customExceptionService.js');

    customException(!applicationInit.api, 'Пробросьте поддомен api');

    api = applicationInit.api;

    api.get('/a', (request, response) => {
        response.json({1: 123});
    });
    
};