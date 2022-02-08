const nodeMailer = require('../config/nodemailer');

//exporting a method
exports.newPost = (post) => {
    console.log('inside new post mailer');

    nodeMailer.transporter.sendMail({
        from: 'saumyalearnsdevelopment@gmail.com',
        to: post.user.email,
        subject:`New Post on Codeella Published !`,
        html: `<big> Yay ! Your new post  <i> <b>${post.content} </b> </i> on Codeella is now published ! </big>`

    }, (err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Mail delivered',info);
        return;


    });
}