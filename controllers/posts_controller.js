const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')



module.exports.create = async function(req,res){
  try{
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id
    })

    if(req.xhr){
      return res.status(200).json({
        data:{
          post:post,
          
        },
        flash:{
          success: 'Post published!'
        },
        message:'Post created'
      })
    }

    req.flash('success', 'Post published!')
    return res.redirect('back')
  }catch(err){
    req.flash('error', err)
    return res.redirect('back')
  }
}

module.exports.delete = async function(req,res){
  try{
    let post = await Post.findById(req.params.id)
    //since post user is not populated it is equal to the user id itself as given in schema and to convery req.user._id to string use req.user.id
    //.id means converting the object id into string
    if(post.user == req.user.id ){
      post.remove()
      await Comment.deleteMany({post:req.params.id})

      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id: req.params.id
          },
          flash:{
            success: 'Post deleted!'
          },
          message:'Post deleted'
        })
      }


      req.flash('success', 'Post deleted')

      return res.redirect('back')
    } else{
      req.flash('error', 'You cannot delete this post!')
      return res.redirect('back')
    }
  }catch(err){
    req.flash('error', err)
    return res.redirect('back')
  }
}