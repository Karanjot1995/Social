const mongoose = require('mongoose')

const chatRoomSchema = new mongoose.Schema({
  //comment belongs to a  user
  user_email : {
    type : String,
    required:true
  },
  user_name : {
    type : String,
    required:true
  },
  message:{
    type:String,
    required:true
  }
  
},{
  timestamps:true
})

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema)

module.exports = ChatRoom