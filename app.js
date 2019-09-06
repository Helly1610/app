const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routers/route");
var mongoose = require("mongoose");
require("dotenv").config();


const app = express();
mongoose.connect("mongodb://localhost:27017/App", {
    useNewUrlParser: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection time error"));

let port = 5000;
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept"
    );
    next();
});
app.use("/", router);

app.listen(port, () => {
    console.log("server is running at ", port);
});
