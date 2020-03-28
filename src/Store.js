class Store {
  constructor() {
    this.Users = new Map();
  }

  filterUsersByRoom(room) {
    const collection = [];
    //console.log(this.Users);
    for (const [userID, { nickname, roomID }] of this.Users) {
      if (roomID === room) {
        collection.push({ nickname });
      }
    }
    return collection;
  }

  getUsers() {
    const users = {};
    this.Users.forEach((value, key) => {
      users[key] = { nickname: value.nickname, id: value.id, room: value.room };
    });

    return users;
  }

  addUser(user) {
    this.Users.set(user.id, user);
  }

  removeUser(userID) {
    this.Users.delete(userID);
  }
}

module.exports = Store;
