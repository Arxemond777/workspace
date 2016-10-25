module.exports = function(applicationInit, routeBundle) {
    
    var 
        service = require(global.serviceContainer),
        loginController = require('../controllers/loginController.js');

    service.get('global.customException')(!applicationInit.api, 'Пробросьте поддомен api');

    api = applicationInit.api;
    
    api.route(`/${routeBundle}`)// /login/
        .get((request, response) => {

            console.log(1);
            response.json({1: 'get data login'});

        })
        .post((request, response) => {

            loginController().getBy(request.body, request, response);
            response.json({1: 'insert data login'});
            
        });
};