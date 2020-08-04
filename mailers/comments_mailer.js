const nodeMailer = require('../config/nodemailer')


//module.exports or exports
exports.newComment  = (comment) =>{
  let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')
  nodeMailer.transporter.sendMail({
    from: "karan.nanda97@gmail.com",
    to: comment.user.email,
    subject: 'new comment published',
    html: htmlString
  }, (err,info)=>{
    if(err){
      console.log('Error in sending mail', err)
      return
    }
    // console.log('Mail delivered', info)
    return
  })

}