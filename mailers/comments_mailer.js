const nodeMailer = require('../config/nodemailer');

//exporting a method
exports.newComment = (comment,post) => {

    let htmlString = nodeMailer.renderTemplate({comment:comment,post:post},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'saumyalearnsdevelopment@gmail.com',
        to: comment.user.email,
        subject:`New comment on ${post.user.name}'s Post Published !`,
        html: htmlString

    }, (err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Mail delivered',info);
        return;


    });
}
exports.recievedNewComment = (comment,post) => {
    
    let htmlString = nodeMailer.renderTemplate({comment:comment,post:post},'/comments/recieved_new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'saumyalearnsdevelopment@gmail.com',
        to: post.user.email,
        subject:`New comment from ${comment.user.name} on your post`,
        html: htmlString
    }, (err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Mail delivered',info);
        return;


    });
}