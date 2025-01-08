const router = require("express").Router();
const { searchPostController } = require("../controllers/search.controller");

router.get("/", searchPostController);

module.exports = router;
