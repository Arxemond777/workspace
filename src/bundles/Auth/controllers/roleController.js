var
    roleModel = require('../models/roleModels.js'),
    mainController = require(global.siteRootMainController)();

/**
 * 
 * @param options - какие-то опцие для закрытых методов 
 * @returns {{getAll: getAll}}
 */

module.exports = function(options) {
    
    var roleController =
        {

            getAll: function () {

                    return roleModel.getAll();

            },

            // getById: function (id) {
            //
            //     //roleController(/*option*/).getAll(/*id*/) из роута
            //
            // }

        };

    roleController.__proto__ = mainController.mainController;

    return roleController;
    
};