const router = require("express").Router();
const {
	checkoutPostController,
	checkoutGetController,
} = require("../controllers/checkout.controller");
const {isAuthenticated} = require("../middlewares/auth.middleware")

router.get("/", isAuthenticated, checkoutGetController);
router.post("/", isAuthenticated, checkoutPostController);

module.exports = router;
