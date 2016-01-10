(function (controllers) {
    
    var homeController = require("./homeController.js");
    var gamesController = require("./gamesController.js");
    var usersController = require("./usersController.js");
    
    controllers.init = function (app) {
        homeController.init(app);
        usersController.init(app);
        gamesController.init(app);
    };

})(module.exports);