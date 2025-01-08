const { body } = require("express-validator");

module.exports = [
	body("title").not().isEmpty().withMessage("Title can't be empty!"),
	body("body").not().isEmpty().withMessage("Blog body can't be empty!"),
];
