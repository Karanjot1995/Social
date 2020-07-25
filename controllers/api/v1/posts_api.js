const Post = require('../../../models/post')
const Comment = require('../../../models/comment')


module.exports.index = async (req,res)=>{
  let posts = await Post.find({})
      .sort('-createdAt')
      .populate('user' , {password: 0})
      .populate({
        path: 'comments', 
        populate: {path: 'user', select:{password:0}},
        options: {sort: { createdAt: -1 }}
      });
  return  res.json(200, {
    message: "list of posts",
    posts: posts
  })
}


module.exports.delete = async function(req,res){
  try{
    let post = await Post.findById(req.params.id)
    
    if(post.user == req.user.id ){
      post.remove()
      await Comment.deleteMany({post:req.params.id})

      return res.json(200, {
        message: 'Post and associated comments deleted successfully',

      })
    } else{
      return res.json(401, {
        message: "You cannot delete this post"
      })
    }
  }catch(err){
    console.log('********',err)
    return res.json(500, {
      message: "Internal Server Error"
    })
  }
}