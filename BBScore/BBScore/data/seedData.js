(function (seedData) {
    seedData.initialUsers = [
        {
            id : 1,
            username: "klaudiusz",
            password: "BBScore2016!",
            isAdmin: "true"
        },
        {
            id : 2,
            username: "mateusz",
            password: "BBScore2016!",
            isAdmin: "true"
        }];

    seedData.initialCounters = [
        {
            _id : "userId",
            seq : 2
        },
        {
            _id : "gameId",
            seq : 0
        }];


})(module.exports);