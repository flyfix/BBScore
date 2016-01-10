(function (usersController) {
    
    var data = require("../data");
    
    usersController.init = function (app) {
        
        app.get("/users/:username",
        function (req, res) {
            var username = req.params.username;
            data.getUser(username, function (err, user) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(user);
                }
            });
        });
    }
})(module.exports);