const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')



module.exports.create = async function(req,res){
  try{
    await Post.create({
      content: req.body.content,
      user: req.user._id
    })
    return res.redirect('back')
  }catch(err){
    console.log('error', err)
    return
  }
}

module.exports.delete = async function(req,res){
  try{
    let post = await Post.findById(req.query.id)
    //since post user is not populated it is equal to the user id itself as given in schema and to convery req.user._id to string use req.user.id
    //.id means converting the object id into string
    if(post.user == req.user.id ){
      post.remove()
      await Comment.deleteMany({post:req.query.id})
      return res.redirect('back')
    } else{
      return res.redirect('back')
    }
  }catch(err){
    console.log('error', err)
    return
  }
}