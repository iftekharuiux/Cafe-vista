const router = require("express").Router();
const {
	createBlogGetController,
	createBlogPostPostController,
	allBlogsGetController,
	showSingleBlogGetController,
	deleteSinglePostGetController,
	editBlogPostGetController,
	editBlogPostPostController,
} = require("../controllers/blog.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const blogValidator = require("../validator/blog.validator");
const upload = require("../middlewares/upload.middleware");

router.get("/", allBlogsGetController);
router.get("/create", isAuthenticated, createBlogGetController);
router.post(
	"/create",
	isAuthenticated,
	upload.single("upload-thumbnail"),
	blogValidator,
	createBlogPostPostController
);

router.get("/show/:id", showSingleBlogGetController);
router.get("/delete/:id", isAuthenticated, deleteSinglePostGetController);
router.get("/edit/:id", isAuthenticated, editBlogPostGetController);
router.post(
	"/edit-post/:id",
	isAuthenticated,
	upload.single("update-thumbnail"),
	blogValidator,
	editBlogPostPostController
);

module.exports = router;
