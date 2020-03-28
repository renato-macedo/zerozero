class User {
  constructor(socket, nickname, roomID) {
    this.nickname = nickname;
    this.id = socket.id;
    this.roomID = roomID;
    this.socket = socket;
    socket.join(roomID);
  }
}

module.exports = User;
