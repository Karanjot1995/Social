const User = require('../models/user')


module.exports.profile = function(req,res){
  // console.log(req.user)
  return res.render('user_profile', {title:'User Profile',user:req.user})

  
}

//render the sign up page
module.exports.signUp = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile')
  }
  return res.render('user_sign_up',{
    title: 'Codeial | Sign Up'
  })

}

//render the sign in page
module.exports.signIn = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile')
  }
  return res.render('user_sign_in', {
    title: 'Codeial | Sign In'
  })

}

//get the sign up data
module.exports.create = function(req,res){
  if(req.body.password != req.body.confirm_password){
    return res.redirect('back')
  }
  User.findOne({email:req.body.email}, (err,user)=>{
    if(err){
      console.log('error in finding user and signing up')
      return
    }

    //if user does not already exist then signup(create new user)
    if(!user){
       User.create(req.body, (err,user)=>{
        if(err){
          console.log('error in creating user while signing up')
          return
        }
        return res.redirect('/users/sign-in')
    
       })
    }else{
      return res.redirect('back')
    }
  })

}


//sign in and create session for the user
module.exports.createSession = function(req,res){
  // console.log(req.user)
  return res.redirect('/')
}

module.exports.signOut = function(req,res){
  req.logout()
  return res.redirect('/')
}