//importing post schema

const Post = require('../models/post');
const Comment = require('../models/comment');
const postsMailer = require('../mailers/posts_mailer');
const postsEmailWorker = require('../workers/posts_email_worker');
const queue = require('../config/kue');
module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        post = await post.populate('user','name email');
        let job = queue.create('post_emails',{
            title:'posts email queue',
            post:post
        }).save(function(err){
            if(err){
                console.log('error in sending to the queue');
                return;
            }
            console.log('job enqueued',job.id);
        });
      
        if (req.xhr){
           
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        //make a check if the person is authorized to delete the post
        //.id means converting the object id into string
        if(post.user==req.user.id){
            post.remove();  
                
            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted"
                });
            }



            req.flash('success','Post and associated comments Deleted !');
            return res.redirect('back');
        }
        else {
            req.flash('error','User is not authorized to delete post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return;
    }
    
}