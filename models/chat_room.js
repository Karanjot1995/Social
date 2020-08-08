const mongoose = require('mongoose')

const chatRoomSchema = new mongoose.Schema({
  //comment belongs to a  user
  user_email : {
    type : String,
    ref: 'User'
  },
  to : {
    type : String,
    ref: 'Post'
  },
  messages:[{
    type:String,
    // required:true
  }]
  
},{
  timestamps:true
})

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema)

module.exports = ChatRoom