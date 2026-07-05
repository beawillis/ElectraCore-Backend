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

router.get(

"/fault-prediction/:id",

controller
.predict

);

module.exports =
router;