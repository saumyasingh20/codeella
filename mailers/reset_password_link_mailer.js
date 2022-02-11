const nodeMailer = require('../config/nodemailer');
exports.sendResetPasswordLink =(ResetPasswordToken,user) =>{
    let htmlString = nodeMailer.renderTemplate({ResetPasswordToken:ResetPasswordToken,user:user},'/reset_password_link.ejs');
    nodeMailer.transporter.sendMail({
        from: 'saumyalearnsdevelopment@gmail.com',
        to: user.email,
        subject:`Reset Password for Codeella`,
        html: htmlString

    }, (err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Access Token', htmlString);
        console.log('Mail delivered',info);
        return;


    });
}