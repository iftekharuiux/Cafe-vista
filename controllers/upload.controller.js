const User = require("../models/User.model");
const Profile = require("../models/Profile.model");
const cloudinary = require("../utils/cloudinary");

exports.uploadProfilePics = async (req, res, next) => {
	try {
		const result = await cloudinary.uploader.upload(req.file.path, { folder: "coffeeShop" });
		if (result) {
			let oldProfilePics = req.user.profilePics;
			let profile = await User.findOne({ user: req.user._id });
			let profilePics = result.secure_url;
			if (profile) {
				await Profile.findOneAndUpdate(
					{ user: req.user._id },
					{ $set: { profilePics, cloudinaryId: result.public_id } }
				);
			}
			await User.findOneAndUpdate(
				{
					_id: req.user._id,
				},
				{ $set: { profilePics, cloudinaryId: result.public_id } }
			);

			if (oldProfilePics != "/images/default.jpg") {
				await cloudinary.uploader.destroy(req.user.cloudinaryId);
			}
			res.status(200).json({
				profilePics,
			});
		} else {
			res.status(500).json({
				profilePics: req.user.profilePics,
			});
		}
	} catch (err) {
		res.status(500).json({
			profilePics: req.user.profilePics,
		});
	}
};

exports.removeProfilePics = async (req, res, next) => {
	try {
		let defaultProfile = "/images/default.jpg";

		await cloudinary.uploader.destroy(req.user.cloudinaryId);

		let profile = await User.findOne({ user: req.user._id });

		if (profile) {
			await Profile.findOneAndUpdate(
				{ user: req.user._id },
				{
					$set: {
						profilePics: defaultProfile,
					},
				}
			);
		}
		await User.findOneAndUpdate(
			{
				_id: req.user._id,
			},
			{ $set: { profilePics: defaultProfile } }
		);

		res.status(200).json({
			profilePics: defaultProfile,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "can't remove profile picture",
		});
	}
};

// uploading image for tinymce body
exports.postImageUploadController = async (req, res, next) => {
	try {
		const result = await cloudinary.uploader.upload(req.file.path, { folder: "coffeeShop" });
		if (result) {
			return res.status(200).json({
				imgUrl: result.secure_url,
			});
		}
		return res.status(500).json({
			message: "Server Error",
		});
	} catch (err) {
		next(err);
	}
};
