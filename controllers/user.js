var User = require('../models/user.model');
var Token = require('../middleware/token');
var msg = require('../middleware/response');
var bcrypt = require("bcrypt");



//for user reistration 
exports.user_registration = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, data) {
        if (err) {
            console.log("error with the query");
        }
        if (data) {
            res.send("user already exists");
        } else {
            addUser();
        }
    });

    //adding that user to the database
    function addUser() {
        var saltRounds = 10;
        var encrypted_password = bcrypt.hashSync(req.body.password, saltRounds);

        const user_obj = new User({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: encrypted_password
        });

        //after creating user object just save it to the database
        user_obj.save(function(err) {
            res.send(req.body.name + " has been added to the database");
        });
    }
};

//user login 
exports.user_login =  function(req, res) {
    if(!req.body.email && !req.body.password ) {
        return res.send(msg( null , true, "please enter credentials"));
    }
  
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email}).then(async function(data,err){
        if(data){
            var tokendata = await Token.token(email);
            const match = await bcrypt.compare(password, data.password);
            if(match){
                return res.send(msg(tokendata , false , "logged in"));
            }
               else {
                 return res.send(msg(err, true, "somethig went wrong" ));
               }
            }
        
        else {
            return res.send(msg(err , true , "data not found"))
        }
     })
};
