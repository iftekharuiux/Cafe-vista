const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validatorErrorFormatter");
const Flash = require("../utils/Flash");

exports.signupGetController = (req, res, next) => {
	res.render("pages/auth/signup", {
		title: "Coffee Shop | Signup",
		flashMessage: {},
		errors: {},
		values: {},
		orders: {},
	});
};

exports.signupPostController = async (req, res, next) => {
	const { username, email, password } = req.body;
	let errors = validationResult(req).formatWith(errorFormatter);

	if (!errors.isEmpty()) {
		req.flash("fail", "Please Check the fields");
		return res.render("pages/auth/signup", {
			title: "Coffee Shop | Signup",
			errors: errors.mapped(),
			values: req.body,
			flashMessage: Flash.getMessage(req),
			orders: {},
		});
	}

	try {
		let hashedPassword = await bcrypt.hash(password, 10);

		let user = new User({
			username,
			email,
			password: hashedPassword,
		});

		await user.save();
		req.flash("success", "User created successfully");
		res.redirect("/auth/login");
	} catch (err) {
		next(err);
	}
};

exports.loginGetController = (req, res, next) => {
	res.render("pages/auth/login", {
		title: "Coffee Shop | Login",
		flashMessage: Flash.getMessage(req),
		errors: {},
		values: {},
		orders: {},
	});
};

exports.loginPostController = async (req, res, next) => {
	const { email } = req.body;

	let errors = validationResult(req).formatWith(errorFormatter);

	if (!errors.isEmpty()) {
		req.flash("fail", "Please check your fields.");
		return res.render("pages/auth/login", {
			title: "Coffee Shop | Login",
			flashMessage: Flash.getMessage(req),
			errors: errors.mapped(),
			values: req.body,
			orders: {},
		});
	}

	let user;
	try {
		user = await User.findOne({ email });
	} catch (err) {
		next(err);
	}

	req.session.isLoggedIn = true;
	req.session.user = user;

	req.session.save((err) => {
		if (err) {
			next(err);
		} else {
			req.flash("success", "Successfully logged in.");
			return res.redirect("/");
		}
	});
};

exports.logoutController = (req, res, next) => {
	req.flash("success", "Successfully sign out");
	req.session.destroy((err) => {
		if (err) {
			next(err);
		} else {
			res.redirect("/");
		}
	});
};
