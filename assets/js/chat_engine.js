class ChatEngine {
    constructor(chatBoxId, userEmail, userName) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName
        this.socket = io.connect('http://52.91.148.249:5000')

        // this.socket = io.connect('http://localhost:5000');

        if (this.userEmail) {
            this.connectionHandler();
        }

    }


    connectionHandler() {
        let self = this;

        this.socket.on('connect', function () {
            console.log('connection established using sockets...!');
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                user_name: self.userName,
                chatroom: 'social'
            });

            self.socket.on('user_joined', function (data) {
                console.log('new user joined!', data);
            })

        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function () {
            let msg = $('#chat-message-input').val();

            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    user_name: self.userName,
                    chatroom: 'social'
                });
            }
        });

        self.socket.on('receive_message', function (data) {
            console.log('message received', data);


            let newMessage = $('<li>');

            let messageType = 'friend';

            if (data.user_email == self.userEmail) {
                messageType = 'user';
            }

            newMessage.append($('<p>', {
                'html': data.chat.message
            }));

            newMessage.append($('<p class="name">', {
                'html': data.chat.user_name
            }));

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);
        })
    }
}