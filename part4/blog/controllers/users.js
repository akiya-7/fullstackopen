const bcrypt = require('bcrypt');
const userRouter = require("express").Router();
const User = require("../models/User");
const validate = require("../utils/validate");

userRouter.get("/", async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

userRouter.post("/", async (req, res) => {
  const {username, name, password} = req.body

  if(!validate.username(username)) {
    return res.status(400).json(
        {error: "Username must contain at least 3 characters"}).end()
  }
  if(!validate.password(password)) {
    return res.status(400).json(
        {error: "Password must contain at least 3 characters"}).end()
  }

  if (!password) {
    return res.status(400).json({
      error: "Password is required",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)

})

module.exports = userRouter