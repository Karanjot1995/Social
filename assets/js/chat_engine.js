class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.socket = io.connect('http://100.25.4.46:5050')

    if (this.userEmail) {
      this.connectionHandler()
    }
  }

  connectionHandler() {
    let self = this
    this.socket.on('connect', function () {
      console.log('connection established using sockets!')

      self.socket.emit('join_room', {
        user_email: self.userEmail,
        chatroom: 'social'
      })
      self.socket.on('user_joined', function (data) {
        console.log('user joined', data)
      })
    })

    $('#send-message').click(function () {
      let msg = $('#chat-message-input').val();

      if (msg != '') {
        self.socket.emit('send_message', {
          message: msg,
          user_email: self.userEmail,
          chatroom: 'social'
        })
      }
    })

    self.socket.on('receive_message', function (data) {
      console.log('message received', data.message);

      let newMessage = $('<li>')
      let messageType = 'friend'

      if (data.user_email == self.userEmail) {
        messageType = 'user'
      }

      newMessage.append($('<p>', {
        'html': data.message
      }));

      // newMessage.append($('<sub>', {
      //   'html': data.user_email
      // }));

      newMessage.addClass(messageType);

      $('#chat-message-list').append(newMessage)

    })

  }
}