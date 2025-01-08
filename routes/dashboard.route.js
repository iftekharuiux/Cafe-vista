const router = require("express").Router();
const upload = require("../middlewares/upload.middleware");
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const {
	dashboardGetController,
	subscribeGetController,
	deleteMailGetController,
	editItemGetController,
	deleteItemGetController,
	editItemPostController,
	reservationGetController,
	reservationApproveGetController,
	reservationRejectGetController,
	showAllCheckoutGetController,
	deliverOrderGetController,
	cancelOrderGetController,
	deleteDeliveryGetController,
} = require("../controllers/dashboard.controller");

router.get("/", isAuthenticated, isAdmin, dashboardGetController);
router.get("/subscription", isAuthenticated, isAdmin, subscribeGetController);
router.get("/deleteMail/:id", isAuthenticated, isAdmin, deleteMailGetController);

router.get("/edit-item", isAuthenticated, isAdmin, editItemGetController);
router.get("/deleteItem/:id", isAuthenticated, isAdmin, deleteItemGetController);

router.get("/reservation", isAuthenticated, isAdmin, reservationGetController);
router.get("/approveReservation/:id", isAuthenticated, isAdmin, reservationApproveGetController);
router.get("/rejectReservation/:id", isAuthenticated, isAdmin, reservationRejectGetController);

router.get("/checkouts/all", isAuthenticated, isAdmin, showAllCheckoutGetController);

router.get("/deliver/:id", isAuthenticated, isAdmin, deliverOrderGetController);
router.get("/cancel/:id", isAuthenticated, isAdmin, cancelOrderGetController);
router.get("/deleteDelivery/:id", isAuthenticated, isAdmin, deleteDeliveryGetController);

router.post(
	"/edit-item",
	isAuthenticated,
	isAdmin,
	upload.single("changedImg"),
	editItemPostController
);

module.exports = router;
