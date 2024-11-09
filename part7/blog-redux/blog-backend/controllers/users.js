const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");
const validate = require("../utils/validate");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  res.json(user);
});

userRouter.post("/", async (req, res) => {
  const { username, name, password, userId } = req.body;

  if (!validate.username(username)) {
    return res
      .status(400)
      .json({ error: "Username must contain at least 3 characters" })
      .end();
  }
  if (!validate.password(password)) {
    return res
      .status(400)
      .json({ error: "Password must contain at least 3 characters" })
      .end();
  }

  if (!password) {
    return res.status(400).json({
      error: "Password is required",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
    user: userId ? userId : "TO BE IMPLEMENTED",
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = userRouter;
