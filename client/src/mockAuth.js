// src/mockAuth.js
const mockAuth = {
  user: { name: "Guest" },

  login(name) {
    this.user = { name };
  },

  logout() {
    this.user = { name: "Guest" };
  },

  getUser() {
    return this.user;
  }
};

export default mockAuth;
