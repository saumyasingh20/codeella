const Post = require('../models/post');
module.exports.home = function(req,res){

    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: "Codeella | Home",
            posts:posts
        });
    })
}


