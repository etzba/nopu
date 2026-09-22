const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");

usersRouter.get("/", async (request, response, next) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    if (!username || !password || username.length < 3 || password.length < 8) {
      response.status(400).end();
    } else {
      const savedUser = await user.save();
      response.status(201).json(savedUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;