const jwt = require("jsonwebtoken"); // Import jsonwebtoken for JWT operations

// Function to generate a JWT token for a given user
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = generateToken;