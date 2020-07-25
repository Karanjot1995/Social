const User = require('../models/user')
const fs = require('fs')
const path = require('path')



module.exports.profile = function(req,res){
  User.findById(req.params.id, (err,user)=>{
    return res.render('user_profile', {title:'User Profile', profile_user:user})
  })
}

module.exports.update = async function(req,res){
  if(req.user.id == req.params.id){
    //update the user fetched by req.params.id and update the body or name and email of it
    try {
      let user = await User.findById(req.params.id)

      // since it is a multipart form data it wont take req so multer (.uploadedAvatar) method is used
      User.uploadedAvatar(req,res,function(err){
         if(err){
           console.log('***** Multer Error : ', err)
         }
         user.name = req.body.name;
         user.email = req.body.email;

         if(req.file){

           if(user.avatar && fs.existsSync(path.join(__dirname, '..' , user.avatar))){
             //user.avatar is like /uploads/users/avatars/avatar-1595259199683
             fs.unlinkSync(path.join(__dirname, '..' , user.avatar))
           }
           //this is saving the path of the uploaded file in the avatar field in the user
           user.avatar = User.avatarPath + '/' + req.file.filename
         }
         user.save();
         return res.redirect('back');
      })
    } catch (error) {
      req.flash('error', error)
    return res.redirect('back')
    }
   
  }else{
    req.flash('error', 'Unauthorised')
    return res.status(401).send('Unauthorised')
  }
}

//render the sign up page
module.exports.signUp = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect(`/users/profile/${req.user.id}`)
  }
  return res.render('user_sign_up',{
    title: 'Social | Sign Up'
  })

}

//render the sign in page
module.exports.signIn = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect(`/users/profile/${req.user.id}`)
  }
  return res.render('user_sign_in', {
    title: 'Social | Sign In'
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
  req.flash('success', 'Logged in successfully')
  return res.redirect('/')
}

module.exports.signOut = function(req,res){
  req.flash('success', 'You have logged out')

  req.logout()
  return res.redirect('/')
}
