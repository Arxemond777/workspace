var
    express = require('express'),
    app = express(),
    htmlencode = require('htmlencode'),
    secretCookiePassword = require(`${global.siteRootConfigsBack}secretCookiePassword.js`);// Секретный ключ

app.use(require('cookie-parser')(secretCookiePassword.secretCookiePassword));

module.exports = {
    
    checkValidCookieAndSession: (request, response, next) => {

            var nameLogin = `${global.urlBack.fullAddress()}login`;

            /**
             * Должна быть проверка с протоколом "//someURL:3000/login"
             * Так как без указания протокола можно пробиться на api
             */

        /**
         * Мы должны каждый раз проверять, что у пользователя кука == сессии, если пользователя отключили то удаляем сессию из редиса
         */
        if (`//${request.headers.host}${request.originalUrl}` !== nameLogin) { // Если не на login

                //app.locals.referrerLogin = request.url; // Пишим текущий url
                //global.referrer = app.locals.referrerLogin; //TODO подумать, как лучше
                if (request.originalUrl !== '/favicon.ico' && request.originalUrl !== '/login') {

                    global.referrer = request.url;

                }

                if (!request.signedCookies.login) { // Нет куки

                    // Если запрос идет на авторизацию /login/ то пропускаем его дальше
                    if (`//${request.headers.host}${request.originalUrl}` === global.urlBack.fullAddressApi() && request.method === 'POST') {

                        //console.log(123, request.session);
                        next();

                    } else {

                        response.redirect(303, nameLogin);

                    }

                } else {

                    console.log('Не на логин. Есть кука');
                    next();

                }

            }  else if (request.url === nameLogin) { // Если мы на login

                var redirectReferrer = ((global.referrer && global.referrer !== nameLogin) ? global.referrer : '/');

            console.log(1);
                if (!request.signedCookies.login) { // Нет куки

                    console.log('На логин. Нет куки');
                    next();
                    //response.json({1: 2});
                        /*.cookie(
                            'login',
                            123,
                            {
                                signed: true, //Если перезаписалась, то вернется к первоначальному виду
                                httpOnly: true, //Меняется тока серваком
                                maxAge: ((((60*1000)*60)*24)*7), //Expirece 7 day
                                //secure: true, //https only
                            }
                        ).redirect(303, redirectReferrer);*/

                } else { // Есть кука

                    console.log('На логин. Есть кука');
                    response.redirect(303, redirectReferrer);
                }

            } else {

                next();

            }
        
        }
    
};