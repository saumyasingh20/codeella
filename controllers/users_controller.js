module.exports.profile = function(req,res){
    return res.render('users_profile',{
        title:"User Profile"
    });
};

module.exports.posts = function(req,res){
    return res.render('users_posts',{
        title:"User Posts"
    });
};