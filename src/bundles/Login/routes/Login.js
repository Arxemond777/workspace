module.exports = function(applicationInit, routeBundle) {
    
    var customException = require(global.siteRootApp + 'services/customExceptionService.js');

    customException(!applicationInit.api, 'Пробросьте поддомен api');

    api = applicationInit.api;

    /*api.get(`/${routeBundle}/`, (request, response) => {
        response.json({1: 123});
    });*/

    api.route(`/${routeBundle}`)
        .get((request, response) => {
            response.json({1: 'get data login'});
        })
        .post((request, response) => {
            response.json({1: 'insert data login'});
        });
};