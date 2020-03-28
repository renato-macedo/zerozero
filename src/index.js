const app = require('express')();
const http = require('http').createServer(app);
const { v4: uuid } = require('uuid');

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
    const user = new User(socket, nickname, uuid());
    store.addUser(user);
    socket.emit('created', { room: user.roomID });
  });

  socket.on('join-room', ({ nickname, room }) => {
    console.log(nickname, room);
    const user = new User(socket, nickname, room);
    store.addUser(user);
    socket.emit('joined', { users: store.filterUsersByRoom(room) });
  });

  socket.on('timeout', () => {
    console.log('timeout', socket.id);
  });
  socket.on('disconnect', () => {
    store.removeUser(socket.id);
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
