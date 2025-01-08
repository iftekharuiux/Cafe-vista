const User = require("../models/User.model");
const { body } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports = [
	body("email")
		.not()
		.isEmpty()
		.withMessage("Email can't be empty!")
		.custom(async (email) => {
			let user = await User.findOne({ email });
			if (!user) {
				throw new Error("Invalid username or password");
			}
			return true;
		}),
	body("password")
		.not()
		.isEmpty()
		.withMessage("Password can't be empty!")
		.custom(async (password, { req }) => {
			try {
				let user = await User.findOne({ email: req.body.email });

				if (user) {
					let match = await bcrypt.compare(req.body.password, user.password);
					if (!match) {
						return Promise.reject("Invalid username or password");
					}
					return true;
				} else {
					return Promise.reject("Invalid username or password");
				}
			} catch (err) {
				next(err);
			}
		}),
];
