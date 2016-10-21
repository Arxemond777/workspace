module.exports = function(applicationInit, routeBundle) {

    var
        service = require(global.serviceContainer),
        parentRoute = require(`${global.siteRootRoute}/parentRoute.js`),
        roleController = require('../controllers/roleController.js'),
        registryUserController = require('../controllers/registryUserController.js');

    service.get('global.customException')(!applicationInit.api, 'Пробросьте поддомен api');

    api = applicationInit.api;

    api.route(`/${routeBundle}/addUser`)
        .get((request, response) => {

            response.json({1: 'get data auth'});

        })
        .post((request, response) => {

            console.log(registryUserController().add(request.body));
            response.json(request.body);

        });

    api.route(`/${routeBundle}/roles`)
        .get((request, response) => {

            parentRoute().returnPromise(response, roleController().getAll());

        });

};