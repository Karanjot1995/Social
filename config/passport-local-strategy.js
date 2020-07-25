const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')


//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
  function(req,email,password,done){
    //find a user and establish identity
    User.findOne({email: email}, function(err,user){
      if(err){
        req.flash('error', err)
        return done(err)
      }
      if(!user || user.password!= password){
        req.flash('error', 'Invalid Username/Password')
        return done(null, false)
      }
      return done(null,user)
    })
  }
))

//serialize the used to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
  done(null, user.id)
})

//deserializing the user from the key in the cookies
passport.deserializeUser((id,done)=>{
  User.findById(id, function(err,user){
    if(err){
      console.log('error in finding user --> Passport')
    }
    return done(null,user)
  })
})

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
  //if the user is  signed in then pass on the request to the next function(the controller's action)
  if(req.isAuthenticated()){
    return next();
  }

  //if the user is not signed in
  return  res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
    //req.user contains the current signed in user in the session cookie and we are sending it to the locals for the views
    res.locals.user = req.user
  }
  next()
}

module.exports = passport