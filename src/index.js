const app = require('express')();
const http = require('http').createServer(app);
const { v4: uuid } = require('uuid');

const { users, User, filterUsersByRoom } = require('./user');
const io = require('socket.io')(http);

app.get('/', function(req, res) {
  console.log(users);
  return res.json({ users: Array.from(users) });
});

io.on('connection', function(socket) {
  console.log('a user connected', socket.id);

  socket.on('create-room', ({ username }) => {
    const user = new User(socket, username, uuid());
    socket.emit('created', { room: user._roomID });
  });

  socket.on('join-room', ({ username, room }) => {
    const user = new User(socket, username, room);

    socket.emit('joined', { users: filterUsersByRoom(room) });
  });
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
