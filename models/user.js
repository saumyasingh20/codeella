const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    posts:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }
}, {
    timestamps: true
});

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    limits:{
        files:1,
        fileSize: 1024 *1024
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    },
    onFileUploadStart: function(file) {
      console.log("Inside uploads");
      if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
          return true;
      }
      else
      {
          return false;
      }
  }
  });


// static
userSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;



const User = mongoose.model('User', userSchema);

module.exports = User;