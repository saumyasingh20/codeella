const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID:"881902868905-jnu8cro6fplrrmgkh0s2i6hcm0ugagba.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8002/users/auth/google/callback"

    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err);return;}
            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                    // avatar: profile.photos[0].value

                },function(err,user){
                    if(err){console.log('error in google strategy-passport',err);return;}

                    return done(null,user);
                });
            }

        });

    }




));
module.exports = passport;