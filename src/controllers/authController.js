const authService = require("../services/authService"); // Import the authentication service for business logic
const generateToken = require("../utils/generateToken"); // Import the utility to generate JWT tokens
const { validateRegisterInput, validateLoginInput } = require("../validators/requestValidator");

// Controller function to handle user registration
exports.register = async (req, res, next) => {
  try {
    const validation = validateRegisterInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: validation.errors });
    }

    const user = await authService.registerUser(req.body); // Pass the request body to the service for user registration

    const token = generateToken(user); // Generate a JWT token for the newly registered user

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user, token }
    });
  } catch (err) {
    next(err);
  }
};

// Controller function to handle user login
exports.login = async (req, res, next) => {
  try {
    const validation = validateLoginInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: validation.errors });
    }

    const user = await authService.loginUser(
      req.body.email,
      req.body.password
    );

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful",
      data: { user, token }
    });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    res.json({
      success: true,
      message: "If that email exists, password reset instructions have been sent.",
      data: result
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req.body.token, req.body.password);
    res.json({
      success: true,
      message: "Password updated successfully.",
      data: result
    });
  } catch (err) {
    next(err);
  }
};

exports.googleAuth = async (req, res) => {
  const redirectUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/auth/callback`;
  res.json({
    success: true,
    message: "Google authentication endpoint ready",
    data: {
      authUrl: `${process.env.API_URL || "http://localhost:5000"}/api/auth/google?redirect=${encodeURIComponent(redirectUrl)}`
    }
  });
};