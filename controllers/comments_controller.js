const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = async function(req,res){

  try{
    let post = await Post.findById(req.body.post)
    if(post){
      let newComment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post
      })
        
      //add that comment to the comments array of the post foundbyid above
      post.comments.push(newComment)
      post.save()
      return res.redirect('back')
    }
  }catch(err){
    console.log('Error: ', err)
    return
  }
}

module.exports.delete = async (req,res)=>{

  try{
    let comment = await Comment.findById(req.query.id)
    if(comment.user == req.user.id){
      let postId = comment.post
      comment.remove();
      await Post.findByIdAndUpdate(postId,{$pull: {comments: req.query.id }})
      return res.redirect('back');
    }else{
      let post = await Post.findById(comment.post)
        if(req.user.id == post.user){
          post.comments = post.comments.filter(postcomment=> postcomment != comment.id)
          post.save()
          comment.remove()
          return res.redirect('back')
        }
        return res.redirect('back')
    }
  }catch(err){
    console.log('error in')
  }
  
}

    // Post.findById(comment.post, (err, post)=>{
    //   if(err){
    //     console.log('error in deleting comment')
    //     return
    //   }
    //   if(req.user.id == post.user){
    //     post.comments = post.comments.filter(postcomment=> postcomment != comment.id)
    //     post.save()
    //     comment.remove()
    //     return res.redirect('back')
    //   }else if(req.user.id != post.user && comment.user == req.user.id){
    //     post.comments = post.comments.filter(postcomment=> postcomment != comment.id)
    //     post.save()
    //     comment.remove()
    //     return res.redirect('back')

    //   }else{
    //     return res.redirect('back')

    //   }


    // })
 

