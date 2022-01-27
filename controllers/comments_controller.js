const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post :req.body.post,
                user:req.user._id
            });
            post.comments.push(comment);
            //use save after every update to store it into the db
            post.save();
            req.flash('success','Comment Added !');

            res.redirect('/');
        }

    } catch(err){
        req.flash('error',err);
    }
          
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        // if ((comment.user == req.user.id) || (comment.post == req.user.id)){
        if (comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

        let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
        req.flash('success','Comment Deleted !');
        return res.redirect('back');
           
        }else{
            req.flash('error','User is not authorized to delete comment');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
    }
}