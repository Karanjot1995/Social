const mongoose = require('mongoose')
const ttl = require('mongoose-ttl')

const resetPasswordSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  // sessionActivity: { type: Date, index: {expires: 60*2} , default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  expireToken: { type: Date, expires: 600 ,default: Date.now() }
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  //   index: { expireAfterSeconds : 180}
  // }

})

// resetPasswordSchema.plugin(ttl, { ttl: 5000 })

const ResetPasswordToken = mongoose.model('ResetPasswordToken', resetPasswordSchema)

module.exports = ResetPasswordToken
