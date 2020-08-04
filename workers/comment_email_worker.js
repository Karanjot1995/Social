const queue = require('../config/kue')

const commentaMailer = require('../mailers/comments_mailer')

queue.process('emails', function(job, done){
  console.log('Emails worker processing a job', job.data)
  commentaMailer.newComment(job.data);
  done()
})