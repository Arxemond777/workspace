module.exports = function (to, subject, html, from) {

    var
        service = require(global.serviceContainer),
        yaml = require('js-yaml'),
        fs = require('fs'),
        mailTransport = service.get('global.smtpConnect'),
        config_mail = yaml.safeLoad(fs.readFileSync(global.siteRootConfigsBack + 'config_mail.yml', 'utf8'));


    if (!config_mail) {

        throw new Error('Ошибка чтения данных');

    }

    var
        userAccount = config_mail['user.account'],
        userInfo = config_mail['user.info'],
        mailTransport = mailTransport(userAccount['name'], userAccount['password'], userAccount['host'], userAccount['port']);

    if (!from) from = userInfo['from'];

    if (!to, !subject, !html) {
        
        throw new Error('Не корректные данные для to или subject или html');
        
    } else if (Object.prototype.toString.call(to) !== '[object Array]'  && typeof to !== 'string') {

        throw new Error('Не корректный тип для переменной to');

    } else {

        if (Object.prototype.toString.call(to) === '[object Array]') {

            to = to
                .filter(function (email) {
                    return global.VALID_EMAIL.test(email)
                })
                .join(', ');

        } else {
            
            if (!global.VALID_EMAIL.test(to)) to = null;

        }

        if (!!to) {

            mailTransport.sendMail({
                from: from,
                to: to,
                subject: subject,
                html: html,
                generateTextFromHtml: true
                
            }, function(error) {
                
                if (error) console.error(`Невозможно отправить письмо: ${error}`);
                
            });

        } else {

            throw new Error('Не передано ни одного корректного email-адреса');

        }
        
    }
};