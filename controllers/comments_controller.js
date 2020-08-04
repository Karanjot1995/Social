const Comment = require('../models/comment')
const Post = require('../models/post')
// const commentsMailer = require('../mailers/comments_mailer')
const queue = require('../config/kue')
const commentEmailWorker = require('../workers/comment_email_worker')


module.exports.create = async function (req, res) {

  try {
    let post = await Post.findById(req.body.post)
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post
      })

      //add that comment to the comments array of the post foundbyid above
      post.comments.push(comment)
      post.save()

      comment = await comment.populate('user', 'name email avatar').execPopulate();
      // commentsMailer.newComment(comment)
      let job = queue.create('emails', comment).save(function (err) {
        if (err) {
          console.log('error in creating queue', err)
          return
        }
        console.log(job.id)
      })

      // if (req.xhr){
      //   // Similar for comments to fetch the user's id!
      //   comment = await comment.populate('user', 'name').execPopulate();

      //   return res.status(200).json({
      //       data: {
      //           comment: comment
      //       },
      //       message: "Post created!"
      //   });
      // }

      req.flash('success', 'Comment published!');

      return res.redirect('back')
    }
  } catch (err) {
    console.log('Error: ', err)
    return
  }
}

module.exports.delete = async (req, res) => {

  try {
    let comment = await Comment.findById(req.params.id)
    if (comment.user == req.user.id) {
      let postId = comment.post
      comment.remove();
      await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
      return res.redirect('back');
    } else {
      let post = await Post.findById(comment.post)
      if (req.user.id == post.user) {
        post.comments = post.comments.filter(postcomment => postcomment != comment.id)
        post.save()
        comment.remove()
        return res.redirect('back')
      }
      return res.redirect('back')
    }
  } catch (err) {
    console.log('error in')
  }

}


