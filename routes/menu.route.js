const router = require("express").Router();
const {
	menuGetController,
	menuAddPostController,
	singleMenuGetController,
	reviewPostController,
	reviewDeleteGetController,
} = require("../controllers/menu.controller");
const reviewValidator = require("../validator/review.validator");
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

router.get("/all", menuGetController);
router.post("/add-menu", isAdmin, upload.single("item"), menuAddPostController);
router.get("/view/:id", singleMenuGetController);

router.post("/view/review", isAuthenticated, reviewValidator, reviewPostController);
router.get("/delete/review/", isAuthenticated, reviewDeleteGetController);

module.exports = router;
