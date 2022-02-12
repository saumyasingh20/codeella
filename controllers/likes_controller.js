const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req,res){
    try{
        //url - likes/toggle/?id=bVHDD&type=Post
        let likeable;
        let deleted = false;
        //1. finding the likeable object and its id
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');

        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        //2. check if a like already exists
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        //if a like already exists then delete it
        if(existingLike){
            //removing out aray from the likes array of the likeable object
            likeable.likes.pull(existingLike._id);
            likeable.save();
            deleted = true;
            existingLike.remove();
        }else{
            //create a new like
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();

        }
        return res.status(200).json({
            message:"Request successful !",
            data:{
                deleted:deleted
            }
        })


    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
}