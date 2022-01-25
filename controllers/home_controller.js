const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req,res){

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user',
        }
    })
    .exec(function(err,posts){
        //to find all the users
        User.find({},function(err,users){
            return res.render('home',{
                title: "Codeella | Home",
                posts:posts,
                all_users:users
            });
        });
        
    })
}


