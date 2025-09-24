function isAuthenticated() {
  return !!localStorage.getItem("user");
}

function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("user");
}

module.exports = { isAuthenticated, setUser, logout };
