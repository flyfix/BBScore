//requires
var http = require('http');
var express = require('express');
var bodyParser = require("body-parser");
var controllers = require("./controllers");

//initialization
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var port = process.env.port || 1337;
controllers.init(app);



app.get("/api/users", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send({ name: "Klaudiusz" });
})
var server = http.createServer(app);
server.listen(port);
