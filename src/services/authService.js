const User = require("../models/User"); // Import the User model for database interactions
const { hashPassword, comparePassword } = require("../utils/hashPassword"); // Import password hashing and comparison utilities

// Function to register a new user
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

// Function to log in a user
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

module.exports = { registerUser, loginUser };