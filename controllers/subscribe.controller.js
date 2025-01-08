const Subscribe = require("../models/Subscribe.model");
const emailValidator = require("deep-email-validator");

exports.subscribePostController = async (req, res, next) => {
	const { subEmail } = req.body;
	const { valid, reason, validators } = await isEmailValid(subEmail);

	if (!valid) {
        req.flash("fail", "Invalid email address");
		return res.redirect("/#footer");
	}
	try {
		let subscribed = new Subscribe({
			subEmail,
		});
		await subscribed.save();
		req.flash("success","Subscribed successfully")
		res.redirect("/blog");
	} catch (err) {
		next(err);
	}
};

async function isEmailValid(email) {
	return emailValidator.validate(email);
}