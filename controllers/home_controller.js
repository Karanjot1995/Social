const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')



module.exports.home = async function(req,res){
  try{

    let allPosts = await Post.find({}).sort('-createdAt').populate('user', {password: 0}).populate({path: 'comments', populate: 'user', options: {sort: { createdAt: -1 }}})  ;
    let users = await User.find({})
    
    return res.render("home", {
      title:'Home',
      posts: allPosts,
      all_users: users
    })
  }catch(err){
    console.log('error',err)
    return
  }

  // Post.find({}, (err, allPosts)=>{
  //   if(err){
  //     console.log('error in displaying post')
  //     return
  //   }
  //   return res.render("home", {
  //     title:'Home',
  //     posts: allPosts
  //   })
  // })

  //populate the user of each post shift the (err,allPosts) callback function into exec
  // Post.find({}).populate('user').populate({path: 'comments', populate: 'user'}).exec((err, allPosts)=>{
    
  //   if(err){
  //     console.log('error in displaying post')
  //     return
  //   }
  //   User.find({}, (err,users)=>{
  //     if(err){
  //       console.log('error in displaying user')
  //       return
  //     }
  //     return res.render("home", {
  //       title:'Home',
  //       posts: allPosts,
  //       all_users: users
  //     })
  //   })    
  // })
}