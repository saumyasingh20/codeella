//creating a schema for the user using mongoose odm
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String
    }
},{
    //to store the created at and updated fields of user
    timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;