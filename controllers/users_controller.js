module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:"User Profile"
    });
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
    //to do later
}