const nodeMailer = require('../config/nodemailer');

//exporting a method
exports.newPost = (post) => {
    
    let htmlString = nodeMailer.renderTemplate({post:post},'/posts/new_post.ejs');
    nodeMailer.transporter.sendMail({
        from: 'saumyalearnsdevelopment@gmail.com',
        to: post.user.email,
        subject:`New Post on Codeella Published !`,
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