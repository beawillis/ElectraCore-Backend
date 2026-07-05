const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  // Keep the token payload small; controllers can load full user data when
  // they need profile fields.
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
