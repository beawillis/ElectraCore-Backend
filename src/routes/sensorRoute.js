const router =
require("express")
.Router(); // Create a new router instance for sensor routes

// Import the authentication middleware to protect routes that require authentication
const auth =
require(
"../middleware/authMiddleware"
);

// Import the role middleware to restrict access to certain routes based on user roles
const roles =
require(
"../middleware/roleMiddleware"
);

// Import the sensor controller to handle the logic for sensor-related routes
const controller =
require(
"../controllers/sensorController"
);

// Route to ingest new sensor data, calculate health score, and save to the database (public endpoint for devices to send data)
router.post(
"/ingest",
controller.ingest
);

router.get(
"/",
auth,
controller.getReadings
);

router.get(
"/transformer/:id",
auth,
controller.getTransformerData
);

module.exports =
router;