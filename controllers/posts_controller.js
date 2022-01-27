//importing post schema
const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req,res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','Post Published !');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
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
            req.flash('success','Post Deleted !');
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