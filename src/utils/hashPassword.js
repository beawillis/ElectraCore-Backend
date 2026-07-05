const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing and comparison

// Function to hash a plain text password

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Function to compare a plain text password with a hashed password
const comparePassword = async (entered, hashed) => {
  return await bcrypt.compare(entered, hashed);
};

module.exports = { hashPassword, comparePassword };