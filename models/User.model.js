const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			maxlength: 15,
			trim: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profile: {
			type: Schema.Types.ObjectId,
			ref: "Profile",
		},
		profilePics: {
			type: String,
			default: "/images/default.jpg",
		},
		cloudinaryId: {
			type: String,
		},
		role: {
			type: String,
			default: "user",
		},
		order: {
			type: Schema.Types.ObjectId,
			ref: "Checkout",
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);

module.exports = User;
