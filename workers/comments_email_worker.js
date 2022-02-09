const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('comment_emails',function(job, done){
    console.log('comment emails worker is processing a job',job.data);

    commentsMailer.newComment(job.data.comment,job.data.post);
    commentsMailer.recievedNewComment(job.data.comment,job.data.post);
    
    
    done();

})