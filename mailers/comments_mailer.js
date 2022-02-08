const nodeMailer = require('../config/nodemailer');

//exporting a method
exports.newComment = (comment,post) => {
    console.log('inside new comment mailer');

    nodeMailer.transporter.sendMail({
        from: 'saumyalearnsdevelopment@gmail.com',
        to: comment.user.email,
        subject:`New comment on ${post.user.name}'s Post Published !`,
        html: `<big> Yay ! Your comment <i> <b>${comment.content} </b> </i> on ${post.user.name}'s post is now published ! </big>`

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
    

    nodeMailer.transporter.sendMail({
        from: 'saumyalearnsdevelopment@gmail.com',
        to: post.user.email,
        subject:`New comment from ${comment.user.name} on your post`,
        html: `<big> Hi ${post.user.name}, ${comment.user.name} has commented <b> <i> ${comment.content} <i/></b> on your post on Codeella! </big>`

    }, (err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Mail delivered',info);
        return;


    });
}