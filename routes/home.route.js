const router = require("express").Router();
const { homeGetController, homePostController } = require("../controllers/home.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/", homeGetController);
router.post("/", isAuthenticated, homePostController);

module.exports = router;
