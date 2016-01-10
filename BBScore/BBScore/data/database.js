(function (database) {
    
    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/bbscore";
    var theDb = null;
    
    database.getDb = function (next) {
        if (!theDb) {
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db : db,
                        games : db.collection("games"),
                        users : db.collection("users"),
                        counters: db.collection("counters"),
                    };
                    next(null, theDb);
                }
            });
        } else {
            next(null, theDb);
        }
    }

})(module.exports);