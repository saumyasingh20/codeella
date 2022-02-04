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
            if (req.xhr){
                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'name');
                
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Added !"
                });
            }


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
        // send the comment id which was deleted back to the views
        if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Comment deleted"
            });
        }
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