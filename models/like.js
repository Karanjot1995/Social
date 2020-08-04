const mongoose = require('mongoose')


const likeSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  //this defined the objectId of the liked object
  likeable : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel' 
  },
  //this field is used to define the type of the object (post/comment/..) on which the like is placed
  onModel: {
    type: String,
    required: true,
    enum:['Post', 'Comment']
  }
}, {
  timestamps: true
})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like