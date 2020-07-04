const socket = io.connect('https://workwithus.herokuapp.com/', { 'forceNew': true });
const chatId = document.getElementById('chatId').value;
const chat = document.getElementById('messages')
let scrolled = false;

window.onload = updateScroll(chat);

//Función que realiza un auto-scroll al final del chat en la vista del announce-accepted
function updateScroll(chat) {
  if (!scrolled) {
    chat.scrollTop = chat.scrollHeight;
  }
}

chat.addEventListener('scroll', () => {
  scrolled = true;
});

//Sockets: emit join y on joinedChat mandan id al servidor y retorna un mensaje de bienvenida al chat respectivamente
socket.emit('join', { chatId });
socket.on('joinedChat', (msg) => console.log(msg));
//Recibe nuevo mensaje del servidor y actualiza el scroll
socket.on('newMessage', ({ msg }) => {
  addNewMessage(msg)
  updateScroll(chat)
});

//Opciones de envío del mensaje en el chat: enter y click
const sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', createNewMessage);
window.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    createNewMessage();
  }
})

//Añade menaje a la ventana del chat
function addNewMessage(msg) {
  const msgTag = document.createElement('p');
  msgTag.textContent = msg;
  chat.appendChild(msgTag);
  scrolled = false;
}

//Envía el mensaje que escribes en el input al servidor
function createNewMessage() {
  const newMsgInput = document.getElementById('newMessage');
  const username = document.getElementById('username');
  const newMsg = `${username.value}: ${newMsgInput.value}`;
  //Solo envía mensaje en el caso que haya algo escrito
  if (newMsgInput.value) {
    socket.emit('newMessage', { msg: newMsg, chatId });
    newMsgInput.value = '';
  }
}