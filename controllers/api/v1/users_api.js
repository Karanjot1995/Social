const User = require('../../../models/user')
const jwt = require('jsonwebtoken')


// module.exports.index = async (req,res)=>{
//   let users = await User.find({}).select("-password")
      
//   return  res.json(200, {
//     message: "list of posts",
//     users: users
//   })
// }


module.exports.createSession = async function(req,res){
  try {
    let user = await User.findOne({email:req.body.email})

    if(!user || user.password != req.body.password){
      res.json(422, {
        message: "Invalid username/password"
      })
    }

    return res.json(200, {
      message: "Sign in successful, here is your token please keep it safe",
      data: {
        token : jwt.sign(user.toJSON(), 'social', {expiresIn: '100000'})
      }

    })

  } catch (error) {
    console.log('********',err)
    return res.json(500, {
      message: "Internal Server Error"
    })
  }

}