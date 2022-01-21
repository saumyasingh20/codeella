//importing the user schema from models/user
const User = require('../models/user');
module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){
                console.log('invalid user id');
            }
            if(user){
                return res.render('user_profile',{
                    title:`${user.first_name}'s Profile`,
                    user: user
                })
            }
        })
    }else{
        return res.redirect('/users/sign-in');
    }
};

module.exports.posts = function(req,res){
    return res.render('user_posts',{
        title:"User Posts"
    });
};
//reender the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Codeella | Sign Up"
    });
};
//reender the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"Codeella | Sign In"
    });
};

//get the sign up data

module.exports.create =function(req,res){
   //step 1 check whether password and confirm password have same value, if yes then create that user in the db(if it doesnt exist already in the db) 
   if(req.body.password != req.body.confirm_password){
       console.log('password not confirmed');
       return res.redirect('back');
   }
   User.findOne({email:req.body.email},function(err,user){
       if(err){
           console.log('error in finding user in sign up process');
           return;
       }

       if(!user){
        console.log("user doesn't exist so create user in db");
           User.create(req.body,function(err,user){
            if(err){
                console.log('error in creating user in sign up process');
                return;
            }
            console.log("user created in db");
            return res.redirect('/users/sign-in');
           });
       }else{
        console.log("user already exists so sign in");
        return res.redirect('/users/sign-in');
       }
   })



}
//sign in and create a ssession for the user
module.exports.createSession = function(req,res){
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in sign in process');
            return;
        }

   
    //handle user found
        if(user){
             //handle password which don't match
            if(user.password != req.body.password){
                console.log('incorrect password');
                return res.redirect('back');
            }
             //handle session creation
             res.cookie('user_id',user.id);
             
             return res.redirect('/users/profile');

        }else{
            //handle user not found
            return res.redirect('back');
        }
    });

}