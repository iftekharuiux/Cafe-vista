const router = require("express").Router();
const {
	createProfileGetController,
	createProfilePostController,
	profileGetController,
	updateProfileGetController,
	updateProfilePostController,
} = require("../controllers/profile.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const profileValidator = require("../validator/profile.validator");

router.get("/create-profile", isAuthenticated, createProfileGetController);
router.post("/create-profile", isAuthenticated, profileValidator, createProfilePostController);

router.get("/edit-profile", isAuthenticated, updateProfileGetController);
router.post("/edit-profile", isAuthenticated, profileValidator, updateProfilePostController);

router.get("/show-profile", isAuthenticated, profileGetController);

module.exports = router;
