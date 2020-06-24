const Chat = require("./models/Chat.model");

exports.handleSockets = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', ({chatId}) => {
      socket./*join(chatId).*/emit('joinedChat', {msg: `You joined the chat`})
    });
    socket.on('newMessage', async ({msg, chatId}) => {
      try {
        await Chat.findByIdAndUpdate(chatId, {$push: {messages: msg}});
        //socket.to(chatId).emit('newMessage', {msg});
        io.emit('newMessage', {msg});
      } catch (error) {
        console.log(error);
      }
    });
  });
};
