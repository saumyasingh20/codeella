module.exports.profile = function(req,res){
    return res.end('<h1> User profile </h1>');
};

module.exports.posts = function(req,res){
    return res.end('<h1> User Posts </h1>');
};