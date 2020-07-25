const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'karan.nanda97',
    pass: 'karannanda95'
  }
})

let renderTemplate = (data, relativePath) =>{
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, '../views/mailers' ,relativePath),
    data,
    function(err,template){
      if(err){
        console.log('error in rendering template')
        return
      }
      mailHTML = template
    }
  )

}