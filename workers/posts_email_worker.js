const queue = require('../config/kue');
const postsMailer = require('../mailers/posts_mailer');
queue.process('post_emails',function(job, done){
    console.log('post emails worker is processing a job',job.data);

    postsMailer.newPost(job.data.post);
    
    done();

})