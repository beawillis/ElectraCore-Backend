// Import the necessary modules and middleware for device routes
const router =
require("express")
.Router(); // Create a new router instance for device routes

const auth =
require(
"../middleware/authMiddleware"
);

// Import the role middleware to restrict access to certain routes based on user roles
const roles =
require(
"../middleware/roleMiddleware"
);

// Import the device controller to handle the logic for device-related routes
const controller =
require(
"../controllers/deviceController"
);


router.post(
"/register",
auth,
roles("admin"),
controller.registerDevice
);

router.get(
"/",
auth,
controller.getDevices
);

router.get(
"/:id",
auth,
controller.getDevice
);

router.put(
"/:id",
auth,
roles(
"admin",
"engineer"
),
controller.updateDevice
);

router.delete(
"/:id",
auth,
roles("admin"),
controller.deleteDevice
);