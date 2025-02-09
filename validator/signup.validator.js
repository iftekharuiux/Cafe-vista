const { body } = require("express-validator");
const User = require("../models/User.model");
const emailValidator = require("deep-email-validator");

module.exports = [
	body("username")
		.isLength({ min: 2, max: 15 })
		.withMessage("Username must be between 2 to 15 characters")
		.custom(async (username) => {
			let user = await User.findOne({ username });
			if (user) {
				return Promise.reject("Username already used");
			}
		})
		.trim(),
	body("email")
		.isEmail()
		.withMessage("Please provide a valid email")
		.custom(async (email) => {
			let user = await User.findOne({ email });
			if (user) {
				return Promise.reject("Email already used");
			}
			const { valid, reason, validators } = await isEmailValid(email);
			if (!valid) {
				return Promise.reject("Invalid email address");
			}

		})
		.normalizeEmail(),
	body("password")
		.isLength({ min: 5 })
		.withMessage("Password must be greater than 4 characters long"),
	body("confirmPassword")
		.isLength({ min: 5 })
		.withMessage("Password must be greater than 4 characters long")
		.custom((confirmPassword, { req }) => {
			if (confirmPassword !== req.body.password) {
				throw new Error("Password doesn't matched");
				// return Promise.reject("Password doesn't matched");
			}
			return true;
		}),
];

// calling email validator.
async function isEmailValid(email) {
	return emailValidator.validate(email);
}