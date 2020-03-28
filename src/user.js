class User {
  constructor(socket, name, roomID) {
    this.name = name;
    this.id = socket.id;
    this.roomID = roomID;
    this.socket = socket;
    socket.join(roomID);
  }
}

module.exports = User;
