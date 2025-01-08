const router = require("express").Router();

const { reservationPostController } = require("../controllers/reservation.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/table", isAuthenticated, reservationPostController);

module.exports = router;
