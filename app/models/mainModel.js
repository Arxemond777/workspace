var
    service = require(global.serviceContainer),
    db = service.get('global.connectBD')(),
    fs = require('fs'),
    yaml = require('js-yaml');

module.exports = () => {
    
     function mainModel() {
         var
             that = this,
             nameClass = that.constructor.name;

         function throwNewExceptionAbstractModel() {

             return service.get('global.customException')(
                 true,
                 `Метод ${arguments.callee.caller.caller.name} вызывает ${nameClass}::${arguments.callee.caller.name}, что не допустимо,
                 так как данный метод является лишь абстрактным описанием того, какие методы должен содержать класс модели.`
             );

         }

         return {

             add: function (options) {

                 return throwNewExceptionAbstractModel();

             },
             edit: function (options) {

                 return throwNewExceptionAbstractModel();

             },
             getAll: function () {

                 return throwNewExceptionAbstractModel();
             },
             getBy: function (options) {

                 return throwNewExceptionAbstractModel();
             },
             delete: function (options) {

                 return throwNewExceptionAbstractModel();
             }
             
         }
    };

    return {
        'mainModel': new mainModel(),
        'variable': {
            service: service,
            db: db.get(),
            fs: fs,
            yaml: yaml
        }
    };
};