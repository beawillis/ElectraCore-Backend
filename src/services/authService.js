const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hashPassword");

const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("User already exists");

  const hashed = await hashPassword(data.password);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashed,
    role: data.role
  });

  return user;
};

const loginUser = async (email, password) => {
  // Return the same message for missing users and bad passwords so login does
  // not reveal which emails are registered.
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

module.exports = { registerUser, loginUser };
