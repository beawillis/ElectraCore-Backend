const router =
require("express")
.Router();

const auth =
require(
"../middleware/authMiddleware"
);

const controller =
require(
"../controllers/mlController"
);

router.use(
auth
);

// Status lets the dashboard show whether trained ML is active or the baseline
// rules are still being used while data is collected.
router.get(

"/status",

controller
.status

);

router.get(

"/fault-prediction/:id",

controller
.predict

);

module.exports =
router;
