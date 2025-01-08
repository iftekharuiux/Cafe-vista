const { body } = require("express-validator");
const validator = require("validator");

const linkValidator = (value) => {
	if (value) {
		if (!validator.isURL(value)) {
			throw new Error("Please provide a valid url");
		}
	}
	return true;
};

module.exports = [
	body("name")
		.not()
		.isEmpty()
		.withMessage("name can not be empty")
		.isLength({ max: 30 })
		.withMessage("Name can not be longer than 30 characters")
		.trim(),
	body("title")
		.not()
		.isEmpty()
		.withMessage("Designation can not be empty")
		.isLength({ max: 100 })
		.withMessage("Designation can not be longer than 100 characters")
		.trim(),
	body("bio")
		.isLength({ max: 500 })
		.withMessage("Bio can not be longer than 100 characters")
		.trim(),
	body("website").custom(linkValidator),
];
