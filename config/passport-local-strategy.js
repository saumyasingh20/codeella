const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new localStrategy({
    //field to be kept unique
    usernameField:'email'
},
function(email,password,done){

    User.findOne({email:email},function(err,user){
        if(err){
            console.log('error in finding user --> passport');
            return(done(err));
        }
        //user not found or incorrect password
        if(!user || user.password != password){
            console.log('invalid username/password');
            return done(null,false);
        }
        //user found and password matched
        return done(null,user);




    })
}
));
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    //set encrypted user id in the cookie
    done(null,user.id);
});

//deserializing the user from the encrypted key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user --> passport');
            return(done(err));
        }
        return done(null,user);
    });
});

module.exports = passport;