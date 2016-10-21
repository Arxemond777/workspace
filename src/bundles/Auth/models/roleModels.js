var
    mainModel = require(global.siteRootMainModel)(),
    service = mainModel.variable.service,//require(global.serviceContainer),
    db = mainModel.variable.db;//service.get('global.connectBD')(),

module.exports = function(id, options) {

   var roleModel =
       {
           getAll: function() {

               function fetchAllRoles() {

                   return db
                       .query('SELECT id AS id_role, name_role AS name FROM auth_roles')
                       .then(
                           result => {

                               return result;

                           },
                           error => {

                               return service.get('global.jsonResponseMessageBDService')(`${error}`);

                           }
                       );
                   
               }

               return fetchAllRoles();

           }

       };

    roleModel.__proto__ = mainModel.mainModel;

    return roleModel;
    
}();