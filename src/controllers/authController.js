const authService = require("../services/authService"); // Import the authentication service for business logic
const generateToken = require("../utils/generateToken"); // Import the utility to generate JWT tokens

// Controller function to handle user registration
exports.register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body); // Pass the request body to the service for user registration

    const token = generateToken(user); // Generate a JWT token for the newly registered user

    res.status(201).json({
      success: true,
      user,
      token
    });
  } catch (err) {
    next(err);
  }
};

// Controller function to handle user login
exports.login = async (req, res, next) => {
  try {
    const user = await authService.loginUser(
      req.body.email,
      req.body.password
    );

    const token = generateToken(user);

    res.json({
      success: true,
      user,
      token
    });
  } catch (err) {
    next(err);
  }
};