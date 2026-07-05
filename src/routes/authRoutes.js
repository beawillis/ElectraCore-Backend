const express = require("express"); // Import express to create a router for authentication routes
const router = express.Router(); // Create a new router instance for authentication routes

// Import the authentication controller to handle registration and login logic
const authController = require("../controllers/authController");

// Define the routes for user registration and login, linking them to the appropriate controller functions
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;