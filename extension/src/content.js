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

  User.connection.on('seeked', message => {
    video.onseeked = PreventNextSeeked(User, video);
    console.log(message);
    video.currentTime = message.time;
  });

  video.onseeked = EmitSeeked(User, video);

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
}

// the following functions will alternate as listeners from the seeked event
function EmitSeeked(User, video) {
  return function() {
    // video.onseeked = PreventNextSeeked(User, video);
    User.connection.emit('seeked', {
      time: video.currentTime,
      room: User.room
    });
  };
}

function PreventNextSeeked(User, video) {
  return function(e) {
    console.log(e);
    //e.preventDefault();
    video.onseeked = EmitSeeked(User, video);
  };
}
