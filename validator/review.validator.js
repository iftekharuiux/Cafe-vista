const { body } = require("express-validator");

module.exports = [body("reviewBody").not().isEmpty().withMessage("Review body can not be empty!")];
