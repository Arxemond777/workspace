var
    service = require(global.serviceContainer),
    db = service.get('global.connectBD')();

module.exports = function(id, options) {

  return {
      
      getAll: function() {
          
          function fetchAllRoles() {
              
              return db
                  .query('SELECT id AS id_role, name_role AS name FROM auth_roles')
                  .then(
                      result => {
                          
                          return result;
                          
                      },
                      error => {
                          
                          return service.get('global.jsonErrorBD')(`${error}`);
                          
                      }
                  );
              
          }
          
          return fetchAllRoles();
          
      }()
      
  }

}();