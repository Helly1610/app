var mongoose = require("mongoose");
var schema = mongoose.Schema;

var UserSchema = new schema({
    name: String,
    enrolment: String,
    email: String,
    phone_number: Number,
    password: String
});

var user = mongoose.model("user", UserSchema);
module.exports = user;
