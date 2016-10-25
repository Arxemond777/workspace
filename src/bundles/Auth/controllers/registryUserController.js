var
    registryUserModel = require('../models/registryUserModel.js'),
    mainController = require(global.siteRootMainController)();

/**
 * 
 * @param options - какие-то опцие для закрытых методов 
 * @returns {{getAll: getAll}}
 */

module.exports = function(options) {
    
    var registryUserController =
        {

            add: function (data) {

                    return registryUserModel.add(data);

            }

        };

    registryUserController.__proto__ = mainController.mainController;

    return registryUserController;
    
};