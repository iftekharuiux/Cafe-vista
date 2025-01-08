const User = require("../models/User.model");

exports.bindUserWithRequest = () => {
	return async (req, res, next) => {
		if (!req.session?.isLoggedIn) {
			return next();
		}
		try {
			if (!req.session?.user._id) return;
			let user = await User.findById(req.session.user._id);
			req.user = user;
			next();
		} catch (err) {
			console.error(err);
			next(err);
		}
	};
};

exports.isAuthenticated = (req, res, next) => {
	if (!req.session.isLoggedIn) {
		req.flash("fail", "login is required for this action");
		return res.redirect("/auth/login");
	}
	next();
};

exports.isUnAuthenticated = (req, res, next) => {
	if (req.session.isLoggedIn) {
		return res.redirect("/");
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.session.user.role != "admin") {
		req.flash("fail", "You are not an admin");
		res.redirect("/");
	}
	next();
};
