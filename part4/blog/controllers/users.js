const bcrypt = require('bcrypt');
const userRouter = require("express").Router();
const User = require("../models/User");

userRouter.get("/", async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

userRouter.post("/", async (req, res) => {
  const userDetails = req.body

  const user = new User({
    username: userDetails.username,
    name: userDetails.name,
    passwordHash: await bcrypt.hash(userDetails.password, 10)
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)

})

module.exports = userRouter