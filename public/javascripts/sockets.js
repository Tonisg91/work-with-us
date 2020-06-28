const socket = io.connect('http://localhost:3000', { 'forceNew': true });
const chatId = document.getElementById('chatId').value;
const chat = document.getElementById('messages')
let scrolled = false;

window.onload = updateScroll(chat);

function updateScroll(chat) {
  if (!scrolled) {
    chat.scrollTop = chat.scrollHeight;
  }
}

chat.addEventListener('scroll', () => {
  scrolled = true;
});

socket.emit('join', { chatId });
socket.on('joinedChat', (msg) => console.log(msg));
socket.on('newMessage', ({ msg }) => {
  addNewMessage(msg)
  updateScroll(chat)
});

const sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', createNewMessage);
window.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    createNewMessage();
  }
})

function addNewMessage(msg) {
  const msgTag = document.createElement('p');
  msgTag.textContent = msg;
  chat.appendChild(msgTag);
  scrolled = false;
}

function createNewMessage() {
  const newMsgInput = document.getElementById('newMessage');
  const username = document.getElementById('username');
  const newMsg = `${username.value}: ${newMsgInput.value}`;
  socket.emit('newMessage', { msg: newMsg, chatId });
  newMsgInput.value = '';
}
