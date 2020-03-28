import io from 'socket.io-client';

const el = document.querySelector('#primary');
if (el) {
  el.style.backgroundColor = 'rebeccapurple';
}

// chrome.runtime.sendMessage({ message: 'create' }, response => {
//   console.log(response);
// });

const socket = io('http://localhost:3000/');

// listen to messages from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  const { type, payload } = request;

  const username = 'renato';

  socket.emit(type, payload);

  socket.on('created', message => {
    sendResponse(message);
  });

  socket.on('joined', message => {
    sendResponse(message);
  });

  // sendResponse(promise);
  return true;
});
