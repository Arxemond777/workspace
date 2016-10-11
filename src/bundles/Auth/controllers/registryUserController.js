var registryUserModel = require('../models/registryUserModel.js');

/**
 * 
 * @param options - какие-то опцие для закрытых методов 
 * @returns {{getAll: getAll}}
 */

module.exports = function(options) {
    
    return {

        newUser: function (data) {

                return registryUserModel.newUser(data);
            
        }
            
    }
    
};