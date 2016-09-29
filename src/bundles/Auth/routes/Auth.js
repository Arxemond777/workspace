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
}