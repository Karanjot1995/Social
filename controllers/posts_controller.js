const Post = require('../models/post')
const User = require('../models/user')


module.exports.create = function(req,res){
  Post.create({
    content: req.body.content,
    user: req.user._id
  }, (err, newPost)=>{
    if(err){
      console.log('error in creating post')
      return
    }
    console.log(newPost)
     return res.redirect('back')

  })
}