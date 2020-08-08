const User = require("../models/user");
const Friendship = require("../models/friendships");

const fs = require("fs");
const path = require("path");
const commentsMailer = require("../mailers/comments_mailer");
const resetPasswordMailer = require("../mailers/reset_password_mailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const ResetPasswordToken = require("../models/reset_password");

module.exports.profile = async function (req, res) {
  // let friends = await Friendship.findOne({ from_user: req.user._id }).populate({
  //   path: "friendship",
  // });
  // console.log(friends);

  let user = await User.findById(req.params.id);
  return res.render("user_profile", {
    title: "User Profile",
    profile_user: user,
  });
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    //update the user fetched by req.params.id and update the body or name and email of it
    try {
      let user = await User.findById(req.params.id);

      // since it is a multipart form data it wont take req so multer (.uploadedAvatar) method is used
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("***** Multer Error : ", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (
            user.avatar &&
            fs.existsSync(path.join(__dirname, "..", user.avatar))
          ) {
            //user.avatar is like /uploads/users/avatars/avatar-1595259199683
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          //this is saving the path of the uploaded file in the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (error) {
      req.flash("error", error);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorised");
    return res.status(401).send("Unauthorised");
  }
};

//render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect(`/users/profile/${req.user.id}`);
  }
  return res.render("user_sign_up", {
    title: "Social | Sign Up",
  });
};

//render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect(`/users/profile/${req.user.id}`);
  }
  return res.render("user_sign_in", {
    title: "Social | Sign In",
  });
};

//get the sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }

    let user = await User.findOne({ email: req.body.email });
    //if user does not already exist then signup(create new user)
    if (!user) {
      let hash = await bcrypt.hash(req.body.password, 10);

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      return res.redirect("/users/sign-in");
    } else {
      req.flash("error", "User already exists");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("error in finding user and signing up", error);
  }
};

//sign in and create session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in successfully");
  return res.redirect("/");
};

module.exports.signOut = function (req, res) {
  req.flash("success", "You have logged out");

  req.logout();
  return res.redirect("/");
};

module.exports.forgotPassword = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect(`/users/profile/${req.user.id}`);
  }
  return res.render("forgot_password", { title: "Reset Password" });
};

module.exports.resetPassword = function (req, res) {
  // console.log(req.bo)
  if (req.isAuthenticated()) {
    return res.redirect(`/users/profile/${req.user.id}`);
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("user not found");
      req.flash("error", "User does not exist!");
      return res.redirect("back");
    }
    if (!user) {
      console.log("user not found");
      req.flash("error", "User does not exist!");
      return res.redirect("back");
    } else {
      ResetPasswordToken.findOne({
        user: user.id,
      }).then(function (resetPassword) {
        if (resetPassword) {
          resetPassword.remove();
        }
        ResetPasswordToken.create(
          {
            token: crypto.randomBytes(20).toString("hex"),
            // isValid:true,
            user: user._id,
          },
          (err, token) => {
            if (err) {
              console.log("error in creating token", err);
              return res.redirect("back");
            }
            console.log(token);
            let forgotuser = { user: user, token: token.token };
            resetPasswordMailer.newPassword(forgotuser);
          }
        );
      });
      req.flash("success", "Password reset mail sent!");
      return res.redirect("back");
    }
  });
};

module.exports.setNewPassword = function (req, res) {
  ResetPasswordToken.findOne(
    {
      token: req.params.accesstoken,
    },
    (err, token) => {
      if (err) {
        console.log("error in setting password", err);
        return res.redirect("/users/sign-in");
      }
      if (token) {
        return res.render("reset_password", {
          title: "Reset Password",
          token: req.params.accesstoken,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    }
  );
};

module.exports.newPasswordSuccess = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      req.flash("error", "Password and confirm password did not match!");
      return res.redirect("back");
    }
    let token = await ResetPasswordToken.findOne({
      token: req.params.accesstoken,
    });
    if (token) {
      console.log("my token is", token);
      let hash = await bcrypt.hash(req.body.password, 10);
      await User.findByIdAndUpdate(token.user, { password: hash });
      req.flash("success", "Password reset successfully!");
      token.remove();
      return res.redirect("/users/sign-in");
    } else {
      req.flash("error", "Reset password link expired!");
      return res.redirect("/users/forgot-password");
    }
  } catch (error) {
    console.log("error in setting password", error);
    return res.redirect("/users/sign-in");
  }
};

module.exports.addFriend = async function (req, res) {
  let friends = await Friendship.findOne({ from_user: req.user, to_user: req.query.id });
  let friends2 = await Friendship.findOne({ from_user: req.query.id, to_user: req.user })
  if (friends || friends2) {
    req.flash("error", "Already a friend!");
    return res.redirect("back");
  }
  let friend = await Friendship.create({
    from_user: req.user,
    to_user: req.query.id,
  });

  let user = await User.findById(req.user.id);
  let user2 = await User.findById(req.query.id);

  user.friendships.push(friend);
  user2.friendships.push(friend);

  user.save();
  user2.save();

  // console.log(req.user, friends, friend);
  // console.log(req.query);
  return res.redirect("back");
};

module.exports.chatFriend = async function(req,res){
  let friend = await User.findById(req.query.id)
  res.json({friend:friend})
}
