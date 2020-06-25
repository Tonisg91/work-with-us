const socket = io.connect('https://workwithus.herokuapp.com/', { 'forceNew': true });

const chatId = document.getElementById('chatId').value;

socket.emit('join', { chatId });
socket.on('joinedChat', (msg) => console.log(msg));
socket.on('newMessage', ({ msg }) => addNewMessage(msg));

const sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', createNewMessage);

function addNewMessage(msg) {
  const msgContainer = document.getElementById('messages');
  const msgTag = document.createElement('p');
  msgTag.textContent = msg;
  msgContainer.appendChild(msgTag);
}

function createNewMessage() {
  const newMsgInput = document.getElementById('newMessage');
  const username = document.getElementById('username');
  const newMsg = `${username.value}: ${newMsgInput.value}`;
  socket.emit('newMessage', { msg: newMsg, chatId });
  newMsgInput.value = '';
}