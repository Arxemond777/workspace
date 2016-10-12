var
    service = require(global.serviceContainer),
    db = service.get('global.connectBD')();

module.exports = function(id, options) {

  return {
      
      newUser: function(data) {

          var
              hash = require('password-hash'),
              data = JSON.parse(global._.keys(data)),
              generatePassword = require('password-generator');

          var
              templateEmailSubject = templateEmailBody = '<div>Вы зарегистрированы на <a herf="workspace.rg.ru">workspace.rg.ru</a><div>',
              name = data.name,
              secondName = data.secondName,
              email = data.email,
              role = data.roleId,
              password = data.password;

          try {

              /*
              *  Сделать предподготовленные запросы не забыть про то, где много role
              *  Сделать проверку всех необходимых параметров
              *  Сделать все foreign key - unique index и мб NULL разрешить, добавить коскад для update
              *  Подумать о внедрение общего шаблона (getAll, getByConditions, deleteByConditions, editByConditions, add)
              *  По поводу таблицы регионов 19 глава "внешние ключи которые ссылаются%" и WITH RECURSIVE q
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
                      role: role//А тут их может быть много!!TODO
                  };

              /*db.query(`
              
                INSERT INTO Auth_Users (first_name, second_name, email)
                VALUES ('${name}', '${secondName}', '${email}');
                
                INSERT INTO Auth_Users_Pass (user_id, pass, hash_pass)
                VALUES ((SELECT CURRVAL(pg_get_serial_sequence('Auth_Users', 'id')) AS last_insert_id), '${password}', '${hashPassword}');
                
                INSERT INTO Auth_Users_Session (user_id, session_hash)
                VALUES ((SELECT CURRVAL(pg_get_serial_sequence('Auth_Users', 'id')) AS last_insert_id), '${hashSession}');
                
                INSERT INTO Auth_Users_Roles (user_id, role_id)
                VALUES ((SELECT CURRVAL(pg_get_serial_sequence('Auth_Users', 'id')) AS last_insert_id), '${role}');
                    
              `)
                  .then(
                      resolve => {

                          service.get('global.jsonResponseMessageBDService')('success', 200);

                      },
                      reject => {
                          
                          if (reject.code === '23505') {

                              console.log(reject.code);
                              service.get('global.jsonResponseMessageBDService')('error: email already exist', reject.code);

                              
                          } else {

                              console.log(reject);
                              service.get('global.jsonResponseMessageBDService')(reject.error, reject.code);
                              
                          }
                          
                      }
                  );*/

              //console.log(service.get('global.mail')(email, templateEmailSubject, templateEmailBody));
              
          } catch (error) {

              /*
              Сделать ответ и отправку email
               */
              console.error(error);
              
          }
          
      }
      
  }

}();