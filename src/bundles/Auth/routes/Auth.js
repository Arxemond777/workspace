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

    var
        customException = require(global.siteRootApp + 'services/customExceptionService.js'),
        formidable = require('formidable');;

    customException(!applicationInit.api, 'Пробросьте поддомен api');

    api = applicationInit.api;
    app = applicationInit.app;

//TODO убрать
//     api.use(require('body-parser').urlencoded({ extended: true }));
//     app.use(require('body-parser').urlencoded({ extended: true }));

    api.route(`/${routeBundle}/addUser`)
        .get((request, response) => {
            response.json({1: 'get data auth'});
        })
        .post((request, response) => {

            console.log(request.body);

            response.json(request.body);

            //response.send(request.body)
        });
    // api.route(`/${routeBundle}/addUser`)
    //     .get((request, response) => {
    //         response.json({1: 'get data auth'});
    //     })
    //     .post((request, response) => {
    //
    //         if(request.xhr || request.accepts('json,html')==='json'){
    //             // if there were an error, we would send { error: 'error description' }
    //             response.send({ success: true });
    //         } else {
    //             // if there were an error, we would redirect to an error page
    //             response.send({ success: false});
    //         }
    //     })
    //     /*.put((request, response) => {
    //         response.json({1: 'update data auth'});
    //     })
    //     .delete((request, response) => {
    //         response.json({1: 'delete data auth'});
    //     })*/;

};