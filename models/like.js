const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    //likeable is the object on which like has been placed like or comment
    //it defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        refPath:'onModel',
        required:true
    },
    //used for defining the type of the liked object since this is a dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
}
);

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;