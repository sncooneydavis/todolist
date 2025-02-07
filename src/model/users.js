export default class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  #userListData = {};

  get userListData() {
    return this.#userListData;
  }

  set userListData(value) {
    this.#userListData = value;
    localStorage.setItem(this.email, JSON.stringify(this.#userListData));
  }
}
