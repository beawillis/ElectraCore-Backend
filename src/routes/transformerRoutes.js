const router =
require("express")
.Router();

const auth =
require(
"../middleware/authMiddleware"
);

const roles =
require(
"../middleware/roleMiddleware"
);

const controller =
require(
"../controllers/transformerController"
);

// Transformer records are asset inventory. Admins create/delete them; engineers
// can update operational details after commissioning.
router.post(
"/register",
auth,
roles("admin"),
controller.createTransformer
);

router.post(
"/",
auth,
roles("admin"),
controller.createTransformer
);

router.get(
"/",
auth,
controller.getTransformers
);

router.get(
"/:id",
auth,
controller.getTransformer
);

router.put(
"/:id",
auth,
roles(
"admin",
"engineer"
),
controller.updateTransformer
);

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
