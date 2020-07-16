const Post = require('../models/post')

module.exports.home = function(req,res){
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
  Post.find({}).populate('user').exec((err, allPosts)=>{
      if(err){
        console.log('error in displaying post')
        return
      }
      return res.render("home", {
        title:'Home',
        posts: allPosts
      })
    })

}