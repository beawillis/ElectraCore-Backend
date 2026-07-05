const router =
require("express")
.Router(); // Create a new router instance for dashboard routes

const auth =
require(
"../middleware/authMiddleware" // Import the authentication middleware to protect dashboard routes and ensure only authenticated users can access them
);

// Import the role middleware to restrict access to certain routes based on user roles (e.g., admin, engineer, viewer)
const roles =
require(
"../middleware/roleMiddleware"
);

// Import the dashboard controller to handle the logic for dashboard-related routes
const controller =
require(
"../controllers/dashboardController"
);

router.use(auth);

router.get(
"/stats",
controller.getStats
);

router.get(
"/health",
controller.getHealth
);

router.get(
"/system-status",
controller.getSystemStatus
);

router.get(
"/activity",
controller.getActivity
);

router.get(
"/trends",
controller.getTrends
);

module.exports =
router;