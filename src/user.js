const users = new Map();

function filterUsersByRoom(room) {
  const collection = [];
  console.log(users);
  for (const [userID, { name, roomID }] of users) {
    if (roomID === room) {
      collection.push({ name });
    }
  }
  return collection;
}

class User {
  constructor(socket, name, roomID) {
    this._name = name;
    this._id = socket.id;
    this._roomID = roomID;
    this._socket = socket;
    socket.join(roomID);
    users.set(this._id, { name, roomID: this._roomID });
    // users.push({ id:  roomID: this._roomID });
  }

  // get name() {
  //   return this._name;
  // }

  // get socket() {
  //   return this._socket;
  // }
  // get roomID() {
  //   return this._roomID;
  // }

  // set roomID(roomID) {
  //   this._roomID = roomID;
  // }

  // get id() {
  //   return this._id;
  // }
}

module.exports = { users, User, filterUsersByRoom };
