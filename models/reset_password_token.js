const mongoose = require('mongoose');
//creating a new schema
const resetPasswordTokenSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    accessToken:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
});
//creating reset password token model
const ResetPasswordToken = mongoose.model('ResetPasswordToken',resetPasswordTokenSchema);

module.exports = ResetPasswordToken;
