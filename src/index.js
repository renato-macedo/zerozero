const app = require('express')();
const http = require('http').createServer(app);
const shortid = require('shortid');

const User = require('./user');
const Store = require('./Store');
const io = require('socket.io')(http);

const store = new Store();

app.get('/', (req, res) => {
  // console.log(users);
  return res.json(store.getUsers());
});

io.on('connection', socket => {
  console.log('a user connected', socket.id);

  socket.on('create-room', ({ nickname }) => {
    const roomID = shortid.generate();
    const user = new User(socket, nickname, roomID);
    store.addUser(user);
    socket.emit('created', { room: user.roomID });
  });

  socket.on('join-room', ({ nickname, room }) => {
    console.log(nickname, room);
    const user = new User(socket, nickname, room);
    store.addUser(user);
    socket.emit('joined', { users: store.filterUsersByRoom(room) });
  });

  socket.on('seeked', ({ time, room }) => {
    socket.to(room).emit('seeked', { time });
  });

  socket.on('play', ({ room }) => {
    socket.to(room).emit('play');
  });

  socket.on('pause', ({ room }) => {
    socket.to(room).emit('pause');
  });

  socket.on('disconnect', () => {
    store.removeUser(socket.id);
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
