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
"../controllers/alertController"
);

router.use(auth);

// All authenticated users can view alerts; only operational roles can change
// the alert lifecycle.
router.get(
"/",
controller.getAlerts
);

router.put(
"/:id/acknowledge",

roles(
"admin",
"engineer"
),

controller
.acknowledge
);

router.put(
"/:id/resolve",

roles(
"admin",
"engineer"
),

controller
.resolve
);

module.exports =
router;
