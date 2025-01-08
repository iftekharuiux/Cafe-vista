const Checkout = require("../models/Checkout.model");

exports.gettingAllOrder = async (req, next) => {
	let orders;
	try {
		if(req.user) {
			orders = await Checkout.find({ user: req.user._id });
			return orders;
		} else {
			return "";
		}
	} catch (err) {
		return next(err);
	}
};
