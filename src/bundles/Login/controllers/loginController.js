var
    roleModel = require('../models/loginModels.js'),
    mainController = require(global.siteRootMainController)(),
    session = require('express-session'),
    redisStore = require('connect-redis')(session),
    redis = require("redis"),
    client = redis.createClient();

module.exports = function(options) {
    
    var loginController =
        {

            getBy: function (data, request, response) {

                //console.log(1, global.referrer);
                    roleModel.getBy(data)
                        .then(
                            result => {
                                if (result.status !== 200) {
                                    return result;
                                }

                                //TODO запись куки, сессии, проверки, что все есть (id, hash), перезаписывать ее (сессию) каждый раз
                                if (result.message.user_id && result.message.session_hash) {

                                    request.session.user_info = {
                                        user_id: result.message.user_id,
                                        session_hash: result.message.session_hash
                                    };
                                    //Почему-то не пишется кука еще и id разные

                                    console.log(
                                        `controller id ${request.session.id}`/*,
                                        client.get(`sess:${request.session.id}`, function(err, reply){
                                        console.log(`Reply controller ${reply}`);
                                        })*/
                                    );
                                    //TODO
                                    
                                    /*return response
                                        .cookie(
                                            'login',
                                            {
                                                session_id: `sess:${request.session.id}`,
                                                hash: result.message.session_hash
                                            },
                                            {
                                                signed: true, //Если перезаписалась, то вернется к первоначальному виду
                                                httpOnly: true, //Меняется тока серваком
                                                maxAge: ((((60*1000)*60)*24)*7), //Expirece 7 day
                                                //secure: true, //https only
                                            }
                                        );
                                        .redirect(303, ((global.referrer) ? global.referrer : '/'));*/
                                    //console.log(3);
                                    //console.log('referrer', global.referrer, `session_id: ${request.session.id}`);
                                    
                                } else {

                                    //return Exception

                                }
                            },
                            error => {
                                
                                return (service.get('global.jsonResponseMessageBDService')(error, 1));
                                
                            }
                        );

            }

        };

    loginController.__proto__ = mainController.mainController;

    return loginController;
    
};