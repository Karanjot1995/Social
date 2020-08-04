const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //find a user and establish identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }

        if (!user || bcrypt.compareSync(password, user.password) == false) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        } else if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        }
        // return done(null, false)
      });
    }
  )
);

//serialize the used to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id).populate({
      path: "friendships",
      populate: [
        { path: "from_user" },
        { path: "to_user" }
      ]
    })
    return done(null, user);
  } catch (error) {
    console.log('error in finding user ---> Passport', error)
  }

});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is  signed in then pass on the request to the next function(the controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user in the session cookie and we are sending it to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
