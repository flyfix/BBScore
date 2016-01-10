(function (gamesController) {
    
    var data = require("../data");
    
    gamesController.init = function (app) {
        
        app.get("/games/:gameId",
        function (req, res) {
            var gameId = req.params.gameId;
            data.getGame(gameId, function (err, game) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(game);
                }
            });
        });
    }
})(module.exports);