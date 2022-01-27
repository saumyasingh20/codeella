const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
function(req, email, password, done){
    // find a user and establish the identity
    User.findOne({email: email}, function(err, user)  {
        if (err){
            req.flash('error', err);
            return done(err);
        }

        if (!user || user.password != password){
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
    });
}


));
// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//sending the current signed user's data to the views
//1 check if the user is authenticated
passport.checkAuthentication = function(req,res,next){

    if(req.isAuthenticated()){
        //user is signed in, then pass on the request to the next function (controller's action)
        return next();
    }
    //if the user is not signed in

    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req,res,next){

    if(req.isAuthenticated()){
        //transfer the requests's user data to the response's users locals
        res.locals.user = req.user;
        //req.user contains the current signed in user from the session cookie
    }
   
    next();

}

module.exports = passport;