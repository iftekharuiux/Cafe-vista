const Reservation = require("../models/Reservation.model");
const Profile = require("../models/Profile.model");

exports.reservationPostController = async (req, res, next) => {
	const { person, date, time } = req.body;
	const profile = await Profile.findOne({ user: req.user._id });
	if (!profile) {
		req.flash("fail", "Create profile to book a table");
		res.redirect("/profile/create-profile");
	}
	let floor = Math.ceil(Math.random() * 4);
	switch (floor) {
		case 1:
			floor = floor + "ST"
			break;
		case 2:
			floor = floor + "ND"
			break;
		case 3:
			floor = floor + "RD"
			break;
		case 4:
			floor = floor + "TH"
			break;
	}
	try {
		let reserve = new Reservation({
			user: req.user._id,
			person,
			floor,
			date,
			time,
		});
		await reserve.save();
		req.flash("success", "Table reservation completed.");
		res.redirect("/profile/show-profile");
	} catch (err) {
		next(err);
	}
};
