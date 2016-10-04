/*
var
    express = require('express'),
    app = express(),
    secretCookiePassword = require(`${global.siteRootConfigsBack}secretCookiePassword.js`);

app.use(require('cookie-parser')(secretCookiePassword.secretCookiePassword));

module.exports = {
    checkValidCookieAndSession:
        (request, responce, next) => {
            console.log(`Выолнем ${request.url} ...`);
            responce.cookie('auth', secretCookiePassword.secretCookiePassword, { signed: true });
            next();
        }
}*/
module.exports = function(applicationInit, routeBundle) {

    var customException = require(global.siteRootApp + 'services/customExceptionService.js');

    customException(!applicationInit.api, 'Пробросьте поддомен api');

    api = applicationInit.api;

    api.route(`/${routeBundle}/addUsers`)
        .get((request, response) => {
            response.json({1: 'get data auth'});
        })
        .post((request, response) => {
            response.json({1: 'insert data auth'});
        })
        /*.put((request, response) => {
            response.json({1: 'update data auth'});
        })
        .delete((request, response) => {
            response.json({1: 'delete data auth'});
        })*/;

};