import io from 'socket.io-client';

let socket;

// listen to messages from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('????', request);
  socket = io('http://localhost:3000/');
  const { type, payload } = request;

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
