const router = require("express").Router();
const { subscribePostController } = require("../controllers/subscribe.controller");

router.post("/", subscribePostController);

module.exports = router;
