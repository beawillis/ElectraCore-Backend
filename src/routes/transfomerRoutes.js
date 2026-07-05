const router =
require("express")
.Router(); // Create a new router instance for transformer routes

const auth =
require(
"../middleware/authMiddleware"
);

// Import the role middleware to restrict access to certain routes based on user roles
const roles =
require(
"../middleware/roleMiddleware"
);

// Import the transformer controller to handle the logic for transformer-related routes
const controller =
require(
"../controllers/transformerController"
);

// Create a new transformer (admin only)
router.post(
"/",
auth,
roles("admin"),
controller.createTransformer
);

// Get all transformers (admin, engineer, and viewer)
router.get(
"/",
auth,
controller.getTransformers
);

// Get a single transformer by ID (admin and engineer)
router.get(
"/:id",
auth,
controller.getTransformer
);

// Update a transformer by ID (admin and engineer)
router.put(
"/:id",
auth,
roles(
"admin",
"engineer"
),
controller.updateTransformer
);

// Delete a transformer by ID (admin only)
router.delete(
"/:id",
auth,
roles(
"admin"
),
controller.deleteTransformer
);

module.exports =
router;