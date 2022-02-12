const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const emailWorker = require('../workers/comments_email_worker');
const Like = require('../models/like');
module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post).populate('user','name email');
        
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post :req.body.post,
                user:req.user._id
            });
            post.comments.push(comment);
            //use save after every update to store it into the db
            post.save();
            comment = await comment.populate('user', 'name email');
           
            let job = queue.create('comment_emails',{
                title:'comments email queue',
                comment:comment,
                post:post
            }).save(function(err){
                if(err){
                    console.log('error in sending to the queue');
                    return;
                }
                console.log('job enqueued',job.id);
            });

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                
                
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
        // if ((comment.user == req.user.id) || (comment.post.user == req.user.id)){
        if (comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

        let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});


        await Like.deleteMany({likeable:comment._id,onModel:'Comment'});
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