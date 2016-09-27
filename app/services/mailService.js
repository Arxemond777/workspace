module.exports = function () {
    var nodemailer = require('nodemailer');
    var mailTransport = nodemailer.createTransport('SMTP',{
        service: 'aspmx.l.google.com',
        port: 25,
        auth: {
            user: '1arxemond1@gmail.com',
            pass: '',
        }
    });

    mailTransport.sendMail({
        from: '"workspace.rg.ru" <no-reply@rg.ru>',
        to: '1arxemond1@gmail.com',
        subject: 'Ваш тур Meadowlark Travel',
        text: 'Спасибо за заказ поездки в Meadowlark Travel. ' +
        'Мы ждем Вас с нетерпением!',
    }, function(err){
        if(err) console.error( 'Невозможно отправить письмо: ' + error );
    });
};