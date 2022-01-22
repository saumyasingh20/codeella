const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){

        if(post){
            Comment.create({
                content:req.body.content,
                post :req.body.post,
                user:req.user._id
            },function(err,comment){
                //handle error
                post.comments.push(comment);
                //use save after every update to store it into the db
                post.save();

                res.redirect('/');
            })
        }






    })
}