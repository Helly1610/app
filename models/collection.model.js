var mongoose = require("mongoose");
var schema = mongoose.Schema;

var CollectionSchema = new schema({
    amount : Number,
});

var collection = mongoose.model("collection", CollectionSchema);
module.exports = collection;
