import io from 'socket.io-client';

//let socket;
const User = {
  connection: null,
  room: null,
  nickname: null
};

// listen to messages from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  User.connection = io('http://localhost:3000/');
  const { type, payload } = request;

  const connection = User.connection;

  if (payload.room) {
    User.room = payload.room;
  }
  connection.emit(type, payload);

  connection.on('created', message => {
    sendResponse(message);
    User.room = message.room;
    startListening();
  });

  connection.on('joined', message => {
    sendResponse(message);
    startListening();
  });

  return true;
});

function startListening() {
  const video = document.querySelector('video');

  console.log(video.currentTime);

  const progressBar = document.querySelector(
    '#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container'
  );

  User.connection.on('time', message => {
    console.log(message);
    video.currentTime = message.time;
  });

  video.onpause = () => {
    User.connection.emit('pause', { room: User.room });
  };

  User.connection.on('pause', () => {
    video.pause();
  });

  video.onplay = () => {
    User.connection.emit('play', { room: User.room });
  };

  User.connection.on('play', () => {
    video.play();
  });

  progressBar.addEventListener('click', e => {
    const time = video.currentTime;
    User.connection.emit('progress', { time, room: User.room });
  });
}
