const { Schema, model } = require("mongoose");

const postSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			maxLength: 100,
		},
		body: {
			type: String,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		thumbnail: {
			type: String,
		},
		cloudinaryId: {
			type: String,
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		dislikes: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Post = model("Post", postSchema);

module.exports = Post;
