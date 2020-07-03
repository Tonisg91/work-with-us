const Chat = require("./models/Chat.model");

exports.handleSockets = (io) => {
  io.on('connection', (socket) => {
    //Consexión de entrada en la sala por parte de un usuario
    socket.on('join', ({chatId}) => {
      socket.join(chatId).emit('joinedChat', {msg: `You joined the chat ${chatId}`})
    });
    //Recibe un mensaje desde el cliente junto con un ID
    socket.on('newMessage', async ({msg, chatId}) => {
      try {
        //Guarda el mensaje en la BBDD y lo devuelve a todos los usuarios
        await Chat.findByIdAndUpdate(chatId, {$push: {messages: msg}});
        io.to(chatId).emit('newMessage', {msg});
      } catch (error) {
        console.log(error);
      }
    });
  });
};
