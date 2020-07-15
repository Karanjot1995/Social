const User = require('../models/user')


module.exports.profile = function(req,res){
  return res.render('user_profile', {title:'User Profile'})

  
}

//render the sign up page
module.exports.signUp = function(req,res){
  return res.render('user_sign_up',{
    title: 'Codeial | Sign Up'
  })
}

//render the sign in page
module.exports.signIn = function(req,res){
  return res.render('user_sign_in', {
    title: 'Codeial | Sign In'
  })
}

//get the sign up data
module.exports.create = function(req,res){


}


//sign in and create session for the user
module.exports.createSession = function(req,res){

}

// module.exports.signOut = function(req,res){
//   res.cookie('user_id',"")

//   return res.redirect('/users/sign-in')
// }