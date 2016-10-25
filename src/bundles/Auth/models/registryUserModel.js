var
    mainModel = require(global.siteRootMainModel)(),
    service = mainModel.variable.service,//require(global.serviceContainer),
    db = mainModel.variable.db;

module.exports = function(id, options) {

  var registryUserModel =
      {

      add: function(data) {

          var
              hash = require('password-hash'),
              data = JSON.parse(global._.keys(data)),
              generatePassword = require('password-generator'),
              templateEmailSubject = templateEmailBody = '<div>Вы зарегистрированы на <a herf="workspace.rg.ru">workspace.rg.ru</a><div>',
              name = data.name,
              secondName = data.secondName,
              email = data.email,
              role = data.roleId,
              password = data.password;

          try {

              /*
              *  Сделать все foreign key - unique index и мб NULL разрешить, добавить коскад для update
              *  Подумать о внедрение общего шаблона (getAll, getByConditions, deleteByConditions, editByConditions, add)
              *  По поводу таблицы регионов. Смотри: 19 глава "внешние ключи которые ссылаются%" и WITH RECURSIVE q
              *  Разобраться с timestamp now() в auth_users.datetime_create
              * */


              if (!global.VALID_EMAIL.test(email)) return (service.get('global.jsonResponseMessageBDService')('Incorrect Email', 1));

              if (!password) {

                  password = generatePassword((Math.floor(Math.random() * (15 - 10 + 1)) + 10));
                  templateEmailBody += `<br><div>Ваш пароль: ${password}`;

              }

              var
                  hashPassword = hash.generate(password, {algorithm: 'md5', saltLength: 10, iterations: 2}),
                  hashSession = hash.generate(password, {algorithm: 'sha1', saltLength: 10, iterations: 3}),
                  objForQuery = {
                      name: name,
                      secondName: secondName,
                      email: email,
                      password: password,
                      hashPassword: hashPassword,
                      hashSession: hashSession,
                      role: [2, 1]
                  };

              function empty( mixed_var ) {

                  return ( mixed_var === "" || mixed_var === 0   || mixed_var === "0" || mixed_var === null  || mixed_var === false  ||  ( Object.prototype.toString.call(mixed_var) === '[object Array]' && mixed_var.length === 0 ) );

              }

              for (let val in objForQuery) {

                  service.get('global.customException')(empty(objForQuery[val]), `Пустое значени ${val}`);

              }

              return db.query(`
          
                INSERT INTO Auth_Users (first_name, second_name, email)
                VALUES ('${name}', '${secondName}', '${email}');
                
                SELECT CURRVAL(pg_get_serial_sequence('Auth_Users', 'id')) AS last_insert_id;
              `, objForQuery)
              .then(

                  resolve => {

                      return resolve;

                  }

              )
              .then(

                  resolve => {

                      objForQuery.authUserId = resolve[0]['last_insert_id'];

                      let query =
                        "INSERT INTO Auth_Users_Pass (user_id, pass, hash_pass) VALUES (${authUserId}, ${password}, ${hashPassword});"
                        + "INSERT INTO Auth_Users_Session (user_id, session_hash) VALUES (${authUserId}, ${hashSession});";

                      for (let val in objForQuery.role) {

                          query += `INSERT INTO Auth_Users_Roles (user_id, role_id) VALUES (${objForQuery.authUserId}, ${global._.escape(objForQuery.role[val])});`;

                      }

                      db.query(query, objForQuery)
                      .then(

                          resolve => {

                              console.log(123);
                              service.get('global.jsonResponseMessageBDService')('success', 200);

                          },

                          error => {

                              service.get('global.jsonResponseMessageBDService')('success', ((error.status) ? error.status : 500));
                              console.log(11, error);

                          }

                      );

                  }

              )
              .catch(

                  reject => {

                      if (reject.code === '23505') {

                          console.log(reject.code);
                          service.get('global.jsonResponseMessageBDService')('error: email already exist', reject.code);


                      } else {

                          console.log(reject);
                          service.get('global.jsonResponseMessageBDService')(reject.error, reject.code);

                      }

                  }

              );

              //console.log(service.get('global.mail')(email, templateEmailSubject, templateEmailBody));
              
          } catch (error) {

              /*
              Сделать ответ и отправку email, о не удаче
               */

              return service.get('global.jsonResponseMessageBDService')(error, ((error.status) ? error.status : 500));
              
          }
          
      }
      
  };

  registryUserModel.__proto__ = mainModel.mainModel;

  return registryUserModel;

}();