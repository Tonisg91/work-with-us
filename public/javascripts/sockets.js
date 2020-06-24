const socket = io.connect('http://localhost:3000', { 'forceNew': true });

socket.emit('join', {msg: 'Un usuario se ha unido a la sala'});
