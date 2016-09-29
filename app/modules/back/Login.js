var
    express = require('express'),
    app = express(),
    htmlencode = require('htmlencode'),
    secretCookiePassword = require(`${global.siteRootConfigsBack}secretCookiePassword.js`);// Секретный ключ

app.use(require('cookie-parser')(secretCookiePassword.secretCookiePassword));

module.exports = {
    checkValidCookieAndSession:
        (request, response, next) => {
            console.log(`Preform ${request.url} ...`);

            var name_login = '/login';

            if (request.url !== name_login) { //Если не на login

                app.locals.referrerLogin = request.url; //Пишим текущий url
                global.referrer = app.locals.referrerLogin; //TODO подумать, как лучше

                if (!request.signedCookies.login) { //Нет куки

                    response.redirect(303, name_login);

                } else {

                    next();

                }

            }  else if (request.url === name_login) { //Если мы на аутx

                var redirectReferrer = ((app.locals.referrerLogin && app.locals.referrerLogin !== name_login) ? app.locals.referrerLogin : '/');

                if (!request.signedCookies.login) { //Нет куки

                    response
                        .cookie(
                            'login',
                            123,
                            {
                                signed: true, //Если перезаписалась, то вернется к первоначальному виду
                                httpOnly: true, //Меняется тока серваком
                                maxAge: ((((60*1000)*60)*24)*7), //Expirece 7 day
                                //secure: true, //https only
                            }
                        )
                        .redirect(303, redirectReferrer);

                } else { //Есть кука

                    response
                        .redirect(303, redirectReferrer);
                }

            } else {

                next();

            }
        }
}