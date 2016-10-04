module.exports = (userEmailSender, password, host, port) => {

    //console.log(userEmailSender, password, host, port);

    if (!userEmailSender || !password || !host || !port) {

        throw new Error('Не указаны обязательные параметры');

    } else {

        var
            nodemailer = require('nodemailer'),
            smtpTransport = require('nodemailer-smtp-transport'),
            xoauth2 = require('xoauth2');

        //var transporter = nodemailer.createTransport(smtpTransport(options));
        /*return nodemailer.createTransport(
            smtpTransport('smtps://1arxemond1@gmail.com:8Q@aspmx.l.google.com')
        );*/

        /*return nodemailer.createTransport('SMTP',{
            service: 'Gmail',
            debug: true,
            //secure: false,
            //requireTLS: true,
            port: 25,//587
            auth: {
                user: userEmailSender,
                pass: password
            }
        });*/

        /*generator.on('token', function(token){
            console.log('New token for %s: %s', token.user, token.accessToken);
        });*/

        return nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            //port: port,
            auth: {
                user: userEmailSender,
                pass: password
            }
            /*auth: {
                xoauth2: xoauth2.createXOAuth2Generator({
                    user: '1arxemond1@gmail.com',
                    clientId: '407408718192',
                    clientSecret: '{Client Secret}',
                    refreshToken: '1/85fTc3ou5PxOkobmEbvRx6wtCXyDKbLNOMoU77r8OpI',
                    accessToken: 'ya29.Ci9rA9a69uV5s3pHY1LYtO3JB9OAvGW86NR1tjvLUdoT5_wAK2dakq1y9DDHVblYDw'
                })
            }*/
        });

    }
};
