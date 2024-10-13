const username = (username) => {
  return /(.{3,})/.test(username)
}

const password = (password) => {
  return /(.{3,})/.test(password)
}

module.exports = {username, password}