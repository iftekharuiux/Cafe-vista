const router = require("express").Router();
const {
	loginGetController,
	loginPostController,
	signupGetController,
	signupPostController,
	logoutController,
} = require("../controllers/auth.controller");
const { isAuthenticated, isUnAuthenticated } = require("../middlewares/auth.middleware");

const loginValidator = require("../validator/login.validator");
const signupValidator = require("../validator/signup.validator");

router.get("/login", isUnAuthenticated, loginGetController);
router.post("/login", isUnAuthenticated, loginValidator, loginPostController);

router.get("/signup", isUnAuthenticated, signupGetController);
router.post("/signup", isUnAuthenticated, signupValidator, signupPostController);

router.get("/logout", logoutController)

module.exports = router;
