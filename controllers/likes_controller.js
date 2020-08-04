const Post = require("../models/post");
// const User = require('../models/user')
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;
    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    //check if a like akready exists
    let existingLike = await Like.findOne({
      user: req.user._id,
      likeable: req.query.id,
      onModel: req.query.type,
    });

    //if like already exists then delete it
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.remove();
      deleted = true;
    } else {
      //create new like
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(newLike);
      likeable.save();
    }
    // let like = await Like.create({
    //   user: req.user.id,
    //   // likeable :

    // })
    if (req.xhr) {
      return res.json({
        message: "Request Successful",
        data: {
          deleted: deleted,
        },
      });
    }
    // console.log(req.query);

    return res.redirect("back");
  } catch (err) {
    console.log(err);
    req.flash("error", err);
    return res.json(500, "internal server eror");
  }
};
