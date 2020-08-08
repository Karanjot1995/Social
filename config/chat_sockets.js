const ChatRoom = require('../models/chat_room')

module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        
        socket.on('join_room', function(data){
            console.log('joining request rec.', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', async function(data){
            let chat = await ChatRoom.create({
                user_email:data.user_email,
                user_name:data.user_name,
                message: data.message
            })
            data.chat = chat
            io.in(data.chatroom).emit('receive_message', data);
        });

    });

}