var roleModel = require('../models/roleModels.js');

/**
 * 
 * @param options - какие-то опцие для закрытых методов 
 * @returns {{getAll: getAll}}
 */

module.exports = function(options) {
    
    return {
        
        getAll: function () {

                return roleModel.getAll;
            
        },
        
        getById: function (id) {
            
            //roleController(/*option*/).getAll(/*id*/) из роута
            
        }
            
    }
    
};