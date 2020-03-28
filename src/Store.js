class Store {
  constructor() {
    this.Users = new Map();
  }

  filterUsersByRoom(room) {
    const collection = [];
    //console.log(this.Users);
    for (const [userID, { name, roomID }] of this.Users) {
      //console.log(name, roomID);
      if (roomID === room) {
        collection.push({ name });
      }
    }
    return collection;
  }

  getUsers() {
    const users = {};
    this.Users.forEach((value, key) => {
      users[key] = { name: value.name, id: value.id, room: value.room };
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
