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
"../controllers/sensorController"
);

// Device-facing ingestion endpoint. Validation, health scoring, and alert
// generation happen inside the service layer.
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
