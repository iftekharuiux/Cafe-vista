const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			maxlength: 30,
			trim: true,
			required: true,
		},
		title: {
			type: String,
			maxlength: 100,
			trim: true,
			default: "Coffee Addicted 😋",
		},
		bio: {
			type: String,
			maxlength: 500,
			trim: true,
		},
		profilePics: String,
		cloudinaryId: {
			type: String,
		},
		website: String,
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Post",
			},
		],
		bookmarks: [
			{
				type: Schema.Types.ObjectId,
				ref: "Post",
			},
		],
		bookmarks_product: [
			{
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		reservation: [
			{
				type: Schema.Types.ObjectId,
				ref: "Reservation",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Profile = model("Profile", profileSchema);
module.exports = Profile;
