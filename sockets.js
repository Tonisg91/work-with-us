const Chat = require("./models/Chat.model");

exports.handleSockets = (io) => {
  io.on('connection', (socket) => {
    console.log('Aquiiiiiiiiiiiiiiiiiiiiiii')
    socket.on('join', ({msg}) => {
      console.log(msg);
    })
  });
};
