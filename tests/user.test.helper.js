const bcrypt = require("bcrypt");
const User = require("../models/users");

const beforeEach = async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("secret123", 10);
  const user = new User({ username: "root", name: "Superuser", passwordHash });

  await user.save();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  usersInDb,
  beforeEach,
};