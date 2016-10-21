var
    mainModel = require(global.siteRootMainModel)(),
    service = mainModel.variable.service,
    db = mainModel.variable.db,
    passwordHash = require('password-hash');

module.exports = function(id, options) {

   var loginModel =
       {
           getBy: function(data) {

               var data = JSON.parse(global._.keys(data));

               if (!data.login) return (service.get('global.jsonResponseMessageBDService')('Поле email не может быть пустым', 1));

               if (!data.password) return (service.get('global.jsonResponseMessageBDService')('Поле пароля не может быть пустым', 1));

               var query =
                       'SELECT ' +
                            'au.id AS au_id, au.email AS email, au.enabled AS enabled, aup.pass AS password, hash_pass AS hash_pass ' +
                       'FROM auth_users AS au ' +
                       'JOIN auth_users_pass AS aup ' +
                            'ON aup.user_id = au.id ' +
                       'WHERE au.email = ${email} ' +
                       'LIMIT 1;';

               try {

                   function result() {

                       return db
                           .oneOrNone(
                               query,
                               {email: data.login}
                           )
                           .then(

                               result => {
    
                                   if (
                                       !result.length
                                       && result.email === data.login
                                       && passwordHash.verify(data.password, result.hash_pass)
                                   ) {
    
                                       if (!result.enabled) {
    
                                           return (service.get('global.jsonResponseMessageBDService')('Пользователь выключен', 1))
    
                                       } else {
    
                                           function formedAnswer() {
    
                                               return db
                                                   .oneOrNone(
                                                       'SELECT user_id AS user_id, session_hash AS session_hash FROM auth_users_session WHERE user_id = ${userId}',
                                                       {userId: result.au_id}
                                                   )
                                                   .then(
                                                       result => {
    
                                                           return service.get('global.jsonResponseMessageBDService')({
                                                               'user_id': result.user_id,
                                                               'session_hash': result.session_hash
                                                       }, 200);
    
                                                       },
                                                       error => {
    
                                                           return service.get('global.jsonResponseMessageBDService')(error);
    
                                                       }
                                                   );
    
                                           }
    
                                           return formedAnswer();
                                       }
    
                                   } else {
    
                                       return (service.get('global.jsonResponseMessageBDService')('Не верный логин или пароль', 1))
    
                                   }

                               },
                               error => {
    
                                   console.error(error);
                                   return service.get('global.jsonResponseMessageBDService')(`${error}`);
    
                               }

                           );

                    }

                   return result();
                   
               } catch (e) {

                   return service.get('global.jsonResponseMessageBDService')(e);

               }

           }

       };

    loginModel.__proto__ = mainModel.mainModel;

    return loginModel;
    
}();