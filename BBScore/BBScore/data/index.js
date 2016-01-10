(function (data) {
    
    //requires
    var seedData = require("./seedData.js");
    var database = require("./database.js");
    
    //executions
    seedDatabase();
    
    //defintions
    
    
    //getGame
    data.getGame = function (gameId, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.games.findOne({ id: gameId }, next)
            }
        })
    }
    
    //updateGame
    data.updateGame = function (gameId, teamHPoints,teamVPoints, isHTeamBall, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to update game: " + gameId);
                next(err);
            } else {
                db.games.update(
                    { id: gameId },
                    {
                        $set: {
                            teamHPoints : game.teamHPoints,
                            teamVPoints : game.teamVPoints,
                            isHTeamBall : game.isHTeamBall,
                        }
                    }
                )
            }
        })
    }
    
    data.finishGame = function (gameId, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to finish game: " + gameId);
                next(err);
            } else {
                db.games.update(
                    { id: gameId },
                    {
                        $set: {
                            endDate : new Date()
                        }
                    }
                )
            }
        })
    }

    //addGame
    data.addGame = function (teamHName, teamVName, timeNum, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to add usegamer: " + err);
                next(err);
            } else {
                var game = {
                    id : getNextSequence("gameId"),
                    time : 0,
                    timeNum : timeNum,
                    teamHName : teamHName,
                    teamHPoints : 0,
                    teamVName : teamBName,
                    teamVPoints : 0,
                    isHTeamBall: Math.random() < .5,
                    startDate : new Date(),
                    endDate : null,
                }
                db.games.insert(game, function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
                console.log("Game " + game.teamHName + "-" + game.teamVName + " has been added");

            }
        })
    }
    
    //addUser
    data.addUser = function (username, password, isAdmin, next) {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to add user: " + err);
                next(err);
            } else {
                db.users.find({ username: username }).count(function (err, count) {
                    if (err) {
                        next(err);
                    } else {
                        if (count != 0) {
                            next("User " + username + " already exists");
                        } else {
                            var user = {
                                id : getNextSequence("userId"),
                                username : username,
                                password : password,
                                isAdmin : isAdmin
                            }
                            db.users.insert(user, next);
                            console.log("User " + user.username + " has been added");
                        }
                    }
                })
            }
        });
    };
    
    //getUser
    data.getUser = function (username, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.users.findOne({ username: username }, next);
            }
        });
    };
    
    //getNextSequence
    function getNextSequence(name) {
        var ret = db.counters.findAndModify(
            {
                query: { _id: name },
                update: { $inc: { seq: 1 } },
                new: true
            }
        );
        
        return ret.seq;
    }
    //seedDatabase
    function seedDatabase() {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to seed database: " + err);
            } else {
                db.users.count(function (err, count) {
                    if (err) {
                        console.log("Failed to retrieve database count");
                    } else {
                        if (count == 0) {
                            console.log("Seeding the database");
                            seedData.initialUsers.forEach(function (item) {
                                db.users.insert(item, function (err) {
                                    if (err) {
                                        console.log("Failed to insert user into database");
                                    }
                                });
                            });
                        } else {
                            console.log("Database already seeded");
                        }
                    }
                });
            }
        });
    }
})(module.exports);