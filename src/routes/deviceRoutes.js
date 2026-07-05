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
"../controllers/deviceController"
);

// Device registration changes the hardware inventory, so only admins can add
// ESP32 units and bind them to transformers.
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

// Engineers can update operational metadata such as firmware/status, while
// destructive device removal stays admin-only.
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

module.exports =
router;
